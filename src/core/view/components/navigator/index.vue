<template>
  <c-navigator
    v-if="hoverClass && hoverClass !== 'none'"
    :class="[hovering ? hoverClass : '']"
    @touchstart="_hoverTouchStart"
    @touchend="_hoverTouchEnd"
    @touchcancel="_hoverTouchCancel"
    @click="_onClick"
    v-on="$listeners">
    <slot />
  </c-navigator>
  <c-navigator
    v-else
    @click="_onClick"
    v-on="$listeners">
    <slot />
  </c-navigator>
</template>
<script>
import {
  hover
} from 'uni-mixins'

const OPEN_TYPES = ['navigate', 'redirect', 'switchTab', 'reLaunch', 'navigateBack']

export default {
  name: 'Navigator',
  mixins: [hover],
  props: {
    hoverClass: {
      type: String,
      default: 'navigator-hover'
    },
    url: {
      type: String,
      default: ''
    },
    openType: {
      type: String,
      default: 'navigate',
      validator (value) {
        return ~OPEN_TYPES.indexOf(value)
      }
    },
    delta: {
      type: Number,
      default: 1
    },
    hoverStartTime: {
      type: Number,
      default: 20
    },
    hoverStayTime: {
      type: Number,
      default: 600
    }
  },

  methods: {
    _onClick ($event) {
      if (this.openType !== 'navigateBack' && !this.url) {
        console.error(`<navigator/> should have url attribute when using navigateTo, redirectTo, reLaunch or switchTab`)
        return
      }

      switch (this.openType) {
        case 'navigate':
          c.navigateTo({
            url: this.url
          })
          break
        case 'redirect':
          c.redirectTo({
            url: this.url
          })
          break
        case 'switchTab':
          c.switchTab({
            url: this.url
          })
          break
        case 'reLaunch':
          c.reLaunch({
            url: this.url
          })
          break
        case 'navigateBack':
          c.navigateBack({
            url: this.delta
          })
          break
        default:
          break
      }
    }
  }
}
</script>
<style>
  .navigator-hover {
    background-color: rgba(0, 0, 0, 0.1);
    opacity: 0.7;
  }

  c-navigator {
    height: auto;
    width: auto;
    display: block;
  }

  c-navigator[hidden] {
    display: none;
  }
</style>
