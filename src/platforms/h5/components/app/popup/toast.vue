<template>
  <transition name="c-fade">
    <c-toast
      v-show="visible"
      :class="{'c-toast-fixed':mask}"
      :data-duration="duration">
      <div
        v-if="mask"
        class="c-mask"
        style="background: transparent;"
        @touchmove.prevent />
      <div
        v-if="!image&&!iconClass"
        class="c-sample-toast"
        style="pointer-events: none;">
        <p class="c-simple-toast__text">{{ title }}</p>
      </div>
      <div
        v-else
        class="c-toast"
        style="pointer-events: none;">
        <img
          v-if="image"
          :src="image"
          class="c-toast__icon">
        <i
          v-else
          :class="iconClass"
          class="c-icon_toast" />
        <p class="c-toast__content">{{ title }}</p>
      </div>
    </c-toast>
  </transition>
</template>
<script>
import transition from './mixins/transition'
export default {
  name: 'Toast',
  mixins: [transition],
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      default: 'success',
      validator (value) {
        return ['success', 'loading', 'none'].indexOf(value) !== -1
      }
    },
    image: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 1500
    },
    mask: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconClass () {
      if (this.icon === 'success') {
        return 'c-icon-success-no-circle'
      }
      if (this.icon === 'loading') {
        return 'c-loading'
      }
    }
  },
  beforeUpdate () {
    if (this.visible) {
      this.timeoutId && clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        UniServiceJSBridge.emit('onHideToast')
      }, this.duration)
    }
  }
}
</script>
<style>
	c-toast {
		display: block;
		box-sizing: border-box;
	}

	c-toast .c-toast-fixed {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 999;
	}

	c-toast .c-sample-toast {
		position: fixed;
		z-index: 999;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		max-width: 80%;
	}

	c-toast .c-simple-toast__text {
		display: inline-block;
		vertical-align: middle;
		color: #ffffff;
		background-color: rgba(17, 17, 17, 0.7);
		padding: 10px 20px;
		border-radius: 5px;
		font-size: 13px;
		text-align: center;
		max-width: 100%;
		word-break: break-all;
		white-space: normal;
	}

	c-toast .c-toast {
		position: fixed;
		z-index: 999;
		width: 8em;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: rgba(17, 17, 17, 0.7);
		text-align: center;
		border-radius: 5px;
		color: #ffffff;
	}

	c-toast .c-toast * {
		box-sizing: border-box;
	}

	c-toast .c-toast__icon {
		margin: 20px 0 0;
		width: 38px;
		height: 38px;
		vertical-align: baseline;
	}

	c-toast .c-icon_toast {
		margin: 15px 0 0
	}

	c-toast .c-icon_toast.c-icon-success-no-circle:before {
		color: #ffffff;
		font-size: 55px;
	}

	c-toast .c-icon_toast.c-loading {
		margin: 20px 0 0;
		width: 38px;
		height: 38px;
		vertical-align: baseline;
	}

	c-toast .c-toast__content {
		margin: 0 0 15px;
	}
</style>
