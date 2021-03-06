import {
  isFn,
  isPlainObject,
  supportsPassive
} from 'uni-shared'

import {
  NAVBAR_HEIGHT,
  TABBAR_HEIGHT
} from 'uni-helpers/constants'

import {
  pageScrollTo,
  disableScroll,
  createScrollListener
} from './scroll'

import requestComponentInfo from './request-component-info'

const passiveOptions = supportsPassive ? {
  passive: false
} : false

function updateCssVar (vm) {
  if (c.canIUse('css.var')) {
    const pageVm = vm.$parent.$parent
    const windowTop = pageVm.showNavigationBar && pageVm.navigationBar.type !== 'transparent' ? (NAVBAR_HEIGHT + 'px')
      : '0px'
    const windowBottom = getApp().$children[0].showTabBar ? (TABBAR_HEIGHT + 'px') : '0px'
    const style = document.documentElement.style
    style.setProperty('--window-top', windowTop)
    style.setProperty('--window-bottom', windowBottom)
    console.debug(`${vm.$page.route}[${vm.$page.id}]：--window-top=${windowTop}`)
    console.debug(`${vm.$page.route}[${vm.$page.id}]：--window-bottom=${windowBottom}`)
  }
}

export default function initSubscribe (subscribe) {
  subscribe('requestComponentInfo', requestComponentInfo)

  subscribe('pageScrollTo', pageScrollTo)

  if (__PLATFORM__ === 'h5') {
    let scrollListener = false
    let disableScrollListener = false

    subscribe('onPageLoad', vm => { // 用户 onLoad 之前 update
      updateCssVar(vm)
    })

    subscribe('onPageShow', vm => {
      const pageVm = vm.$parent.$parent

      if (vm._isMounted) { // 非首次 show 才 update（首次 show 的时候在 onPageLoad 中触发了）
        updateCssVar(vm)
      }

      if (disableScrollListener) {
        document.removeEventListener('touchmove', disableScrollListener, passiveOptions)
      }

      if (pageVm.disableScroll) {
        disableScrollListener = disableScroll
        document.addEventListener('touchmove', disableScrollListener, passiveOptions)
      }

      const enablePageScroll = isFn(vm.$options.onPageScroll)
      const enablePageReachBottom = isFn(vm.$options.onReachBottom)
      const onReachBottomDistance = pageVm.onReachBottomDistance

      const enableTransparentTitleNView = isPlainObject(pageVm.titleNView) && pageVm.titleNView.type === 'transparent'

      if (scrollListener) {
        document.removeEventListener('scroll', scrollListener)
      }

      if (enableTransparentTitleNView || enablePageScroll || enablePageReachBottom) { // 初始化 scroll 监听
        scrollListener = createScrollListener(vm.$page.id, {
          enablePageScroll,
          enablePageReachBottom,
          onReachBottomDistance,
          enableTransparentTitleNView
        })
        setTimeout(function () { // 避免监听太早，直接触发了 scroll
          document.addEventListener('scroll', scrollListener)
        }, 10)
      }
    })
  }
}
