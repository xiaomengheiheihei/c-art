<template>
  <c-page-head :c-page-head-type="type">
    <div
      :style="{transitionDuration:duration,transitionTimingFunction:timingFunc,backgroundColor:bgColor,color:textColor}"
      :class="{'c-page-head-transparent':type==='transparent'}"
      class="c-page-head"
    >
      <div class="c-page-head-hd">
        <div
          v-show="backButton"
          class="c-page-head-btn"
          @click="_back">
          <i
            :style="{color:color,fontSize:'27px'}"
            class="c-btn-icon">&#xe601;</i>
        </div>
        <template v-for="(btn,index) in btns">
          <div
            v-if="btn.float === 'left'"
            :key="index"
            :style="{backgroundColor: type==='transparent'?btn.background:'transparent',width:btn.width}"
            :badge-text="btn.badgeText"
            :class="{'c-page-head-btn-red-dot':btn.redDot||btn.badgeText,'c-page-head-btn-select':btn.select}"
            class="c-page-head-btn"
          >
            <i
              :style="_formatBtnStyle(btn)"
              class="c-btn-icon"
              @click="_onBtnClick(index)"
              v-html="_formatBtnFontText(btn)"
            />
          </div>
        </template>
      </div>
      <div
        v-if="!searchInput"
        class="c-page-head-bd">
        <div
          :style="{fontSize:titleSize,opacity:type==='transparent'?0:1}"
          class="c-page-head__title"
        >
          <i
            v-if="loading"
            class="c-loading"/>
          {{ titleText }}
        </div>
      </div>
      <div
        v-if="searchInput"
        :style="{'border-radius':searchInput.borderRadius,'background-color':searchInput.backgroundColor}"
        class="c-page-head-search"
      >
        <div
          :style="{color:searchInput.placeholderColor}"
          :class="[`c-page-head-search-placeholder-${focus || text ? 'left' : searchInput.align}`]"
          class="c-page-head-search-placeholder"
        >{{ text || composing ? '' : searchInput.placeholder }}</div>
        <v-c-input
          ref="input"
          v-model="text"
          :focus="searchInput.autoFocus"
          :disabled="searchInput.disabled"
          :style="{color:searchInput.color}"
          :placeholder-style="`color:${searchInput.placeholderColor}`"
          class="c-page-head-search-input"
          confirm-type="search"
          @focus="_focus"
          @blur="_blur"
          @update:value="_input"
        />
      </div>
      <div class="c-page-head-ft">
        <template v-for="(btn,index) in btns">
          <div
            v-if="btn.float !== 'left'"
            :key="index"
            :style="{backgroundColor: type==='transparent'?btn.background:'transparent',width:btn.width}"
            :badge-text="btn.badgeText"
            :class="{'c-page-head-btn-red-dot':btn.redDot||btn.badgeText,'c-page-head-btn-select':btn.select}"
            class="c-page-head-btn"
          >
            <i
              :style="_formatBtnStyle(btn)"
              class="c-btn-icon"
              @click="_onBtnClick(index)"
              v-html="_formatBtnFontText(btn)"
            />
          </div>
        </template>
      </div>
    </div>
    <div
      v-if="type!=='transparent'"
      class="c-placeholder"/>
  </c-page-head>
</template>
<style>
c-page-head {
  display: block;
  box-sizing: border-box;
}

c-page-head .c-page-head {
  position: fixed;
  left: 0;
  width: 100%;
  height: 44px;
  padding: 7px 3px;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 998;
  color: #fff;
  background-color: #000;
  transition-property: all;
}

c-page-head .c-page-head.c-page-head-transparent .c-page-head-ft > div {
  justify-content: center;
}

c-page-head .c-page-head ~ .c-placeholder {
  width: 100%;
  height: 44px;
}

c-page-head .c-page-head * {
  box-sizing: border-box;
}

c-page-head .c-page-head-hd {
  display: flex;
  align-items: center;
  font-size: 16px;
}

c-page-head .c-page-head-bd {
  position: absolute;
  left: 70px;
  right: 70px;
  min-width: 0;
  user-select: auto;
}

.c-page-head-btn {
  position: relative;
  width: auto;
  margin: 0 2px;
  word-break: keep-all;
  white-space: pre;
}

.c-page-head-transparent .c-page-head-btn {
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
}

c-page-head .c-btn-icon {
  overflow: hidden;
  min-width: 1em;
}

.c-page-head-btn-red-dot::after {
  content: attr(badge-text);
  position: absolute;
  right: 0;
  top: 0;
  background-color: red;
  color: white;
  width: 18px;
  height: 18px;
  line-height: 18px;
  border-radius: 18px;
  overflow: hidden;
  transform: scale(0.5) translate(40%, -40%);
  transform-origin: 100% 0;
}

.c-page-head-btn-red-dot[badge-text]::after {
  font-size: 12px;
  width: auto;
  min-width: 18px;
  max-width: 42px;
  text-align: center;
  padding: 0 3px;
  transform: scale(0.7) translate(40%, -40%);
}

.c-page-head-btn-select > .c-btn-icon::after {
  display: inline-block;
  font-family: "unibtn";
  content: "\e601";
  margin-left: 2px;
  transform: rotate(-90deg) scale(0.8);
}

.c-page-head-search {
  position: relative;
  display: flex;
  flex: 1;
  margin: 0 2px;
  line-height: 30px;
  font-size: 15px;
}

.c-page-head-search-input {
  width: 100%;
  height: 100%;
  padding-left: 34px;
  text-align: left;
}

.c-page-head-search-placeholder {
  position: absolute;
  max-width: 100%;
  height: 100%;
  padding-left: 34px;
  overflow: hidden;
  word-break: keep-all;
  white-space: pre;
}

.c-page-head-search-placeholder-right {
  right: 0;
}

.c-page-head-search-placeholder-center {
  left: 50%;
  transform: translateX(-50%);
}

.c-page-head-search-placeholder::before {
  position: absolute;
  top: 0;
  left: 2px;
  width: 30px;
  content: "\ea0e";
  display: block;
  font-size: 20px;
  font-family: "uni";
  text-align: center;
}

c-page-head .c-page-head-ft {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  font-size: 13px;
}

c-page-head .c-page-head__title {
  font-weight: bold;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

c-page-head .c-page-head__title .c-loading {
  width: 16px;
  height: 16px;
  margin-top: -3px;
}
</style>
<script>
import appendCss from 'uni-platform/helpers/append-css'
import getRealPath from 'uni-platform/helpers/get-real-path'

import transparent from './transparent'

const FONTS = {
  forward: '&#xe600;',
  back: '&#xe601;',
  share: '&#xe602;',
  favorite: '&#xe604;',
  home: '&#xe605;',
  menu: '&#xe606;',
  close: '&#xe650;'
}
export default {
  name: 'PageHead',
  mixins: [transparent],
  props: {
    backButton: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: '#000'
    },
    textColor: {
      type: String,
      default: '#fff'
    },
    titleText: {
      type: String,
      default: ''
    },
    duration: {
      type: String,
      default: '0'
    },
    timingFunc: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    titleSize: {
      type: String,
      default: '16px'
    },
    type: {
      default: 'default',
      validator (value) {
        return ['default', 'transparent'].indexOf(value) !== -1
      }
    },
    coverage: {
      type: String,
      default: '132px'
    },
    buttons: {
      type: Array,
      default () {
        return []
      }
    },
    searchInput: {
      type: [Object, Boolean],
      default () {
        return false
      }
    }
  },
  data () {
    return {
      focus: false,
      text: '',
      composing: false
    }
  },
  computed: {
    btns () {
      const btns = []
      const fonts = {}
      if (this.buttons.length) {
        this.buttons.forEach(button => {
          let btn = Object.assign({}, button)
          if (btn.fontSrc && !btn.fontFamily) {
            let fontSrc = btn.fontSrc = getRealPath(btn.fontSrc)
            let fontFamily
            if (fontSrc in fonts) {
              fontFamily = fonts[fontSrc]
            } else {
              fontFamily = `font${Date.now()}`
              fonts[fontSrc] = fontFamily
              const cssText = `@font-face{font-family: "${fontFamily}";src: url("${fontSrc}") format("truetype")}`
              appendCss(cssText, 'c-btn-font-' + fontFamily)
            }
            btn.fontFamily = fontFamily
          }
          btn.color = this.type === 'transparent' ? '#fff' : (btn.color || this.textColor)
          let fontSize = btn.fontSize || (this.type === 'transparent' || /\\u/.test(btn.text) ? '22px' : '27px')
          if (/\d$/.test(fontSize)) {
            fontSize += 'px'
          }
          btn.fontSize = fontSize
          btn.fontWeight = btn.fontWeight || 'normal'
          btns.push(btn)
        })
      }
      return btns
    }
  },
  mounted () {
    if (this.searchInput) {
      const input = this.$refs.input
      input.$watch('composing', val => {
        this.composing = val
      })
      if (this.searchInput.disabled) {
        input.$el.addEventListener('click', () => {
          UniServiceJSBridge.emit('onNavigationBarSearchInputClicked', '')
        })
      } else {
        input.$refs.input.addEventListener('keyup', event => {
          if (event.key.toUpperCase() === 'ENTER') {
            UniServiceJSBridge.emit('onNavigationBarSearchInputConfirmed', {
              text: this.text
            })
          }
        })
      }
    }
  },
  methods: {
    _back () {
      if (getCurrentPages().length === 1) {
        c.reLaunch({
          url: '/'
        })
      } else {
        c.navigateBack({
          from: 'backButton'
        })
      }
    },
    _onBtnClick (index) {
      UniServiceJSBridge.emit('onNavigationBarButtonTap', Object.assign({}, this.btns[index], {
        index
      }))
    },
    _formatBtnFontText (btn) {
      if (btn.fontSrc && btn.fontFamily) {
        return btn.text.replace('\\u', '&#x')
      } else if (FONTS[btn.type]) {
        return FONTS[btn.type]
      }
      return btn.text || ''
    },
    _formatBtnStyle (btn) {
      const style = {
        color: btn.color,
        fontSize: btn.fontSize,
        fontWeight: btn.fontWeight
      }
      if (btn.fontFamily) {
        style.fontFamily = btn.fontFamily
      }
      return style
    },
    _focus () {
      this.focus = true
    },
    _blur () {
      this.focus = false
    },
    _input (text) {
      UniServiceJSBridge.emit('onNavigationBarSearchInputChanged', {
        text
      })
    }
  }
}
</script>
