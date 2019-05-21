import 'uni-platform/runtime/index'

import Vue from 'vue'

import {
  mocks,
  initRefs
} from 'uni-platform/runtime/wrapper/index'

import {
  initHooks,
  initMocks
} from './util'

const hooks = [
  'onHide',
  'onError',
  'onPageNotFound',
  'onUniNViewMessage'
]

function initVm (vm) {
  if (this.$vm) { // 百度竟然 onShow 在 onLaunch 之前？
    return
  }
  if (__PLATFORM__ === 'mp-weixin') {
    if (!wx.canIUse('nextTick')) { // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
      console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上')
    }
  }

  this.$vm = vm

  this.$vm.$mp = {
    app: this
  }
}

export function createApp (vm) {
  // 外部初始化时 Vue 还未初始化，放到 createApp 内部初始化 mixin
  if (__PLATFORM__ === 'mp-alipay') {
    Object.defineProperty(Vue.prototype, '$slots', {
      get () {
        return this.$scope && this.$scope.props.$slots
      },
      set () {

      }
    })
    Object.defineProperty(Vue.prototype, '$scopedSlots', {
      get () {
        return this.$scope && this.$scope.props.$scopedSlots
      },
      set () {

      }
    })
  }

  Vue.mixin({
    beforeCreate () {
      if (!this.$options.mpType) {
        return
      }

      this.mpType = this.$options.mpType

      this.$mp = {
        data: {},
        [this.mpType]: this.$options.mpInstance
      }

      this.$scope = this.$options.mpInstance

      delete this.$options.mpType
      delete this.$options.mpInstance

      if (this.mpType !== 'app') {
        initRefs(this)
        initMocks(this, mocks)
      }
    },
    created () { // 处理 injections
      this.__init_injections(this)
      this.__init_provide(this)
    }
  })

  const appOptions = {
    onLaunch (args) {
      initVm.call(this, vm)

      this.$vm._isMounted = true
      this.$vm.__call_hook('mounted')

      this.$vm.__call_hook('onLaunch', args)
    },
    onShow (args) {
      initVm.call(this, vm)

      this.$vm.__call_hook('onShow', args)
    }
  }

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {}

  initHooks(appOptions, hooks) // 延迟执行，因为 App 的注册在 main.js 之前，可能导致生命周期内 Vue 原型上开发者注册的属性无法访问

  App(appOptions)

  return vm
}
