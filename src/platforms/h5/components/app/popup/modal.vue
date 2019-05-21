<template>
  <transition name="c-fade">
    <c-modal
      v-show="visible"
      @touchmove.prevent>
      <div class="c-mask"/>
      <div class="c-modal">
        <div
          v-if="title"
          class="c-modal__hd">
          <strong class="c-modal__title">{{ title }}</strong>
        </div>
        <div
          class="c-modal__bd"
          @touchmove.stop>{{ content }}</div>
        <div class="c-modal__ft">
          <div
            v-if="showCancel"
            :style="{color:cancelColor}"
            class="c-modal__btn c-modal__btn_default"
            @click="_close('cancel')">{{ cancelText }}</div>
          <div
            :style="{color:confirmColor}"
            class="c-modal__btn c-modal__btn_primary"
            @click="_close('confirm')">{{ confirmText }}</div>
        </div>
      </div>
    </c-modal>
  </transition>
</template>
<script>
import transition from './mixins/transition'
export default {
  name: 'Modal',
  mixins: [transition],
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    cancelColor: {
      type: String,
      default: '#000000'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    confirmColor: {
      type: String,
      default: '#007aff'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    _close (type) {
      this.$emit('close', type)
    }
  }
}
</script>
<style>
	c-modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 999;
		display: block;
		box-sizing: border-box;
	}

	c-modal .c-modal {
		position: fixed;
		z-index: 999;
		width: 80%;
		max-width: 300px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #ffffff;
		text-align: center;
		border-radius: 3px;
		overflow: hidden;
	}

	c-modal .c-modal * {
		box-sizing: border-box;
	}

	c-modal .c-modal__hd {
		padding: 1em 1.6em 0.3em;
	}

	c-modal .c-modal__title {
		font-weight: 400;
		font-size: 18px;
		word-wrap:break-word;
		word-break:break-all;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	c-modal .c-modal__bd {
		padding: 1.3em 1.6em 1.3em;
		min-height: 40px;
		font-size: 15px;
		line-height: 1.4;
		word-wrap: break-word;
		word-break: break-all;
		color: #999999;
		max-height: 400px;
		overflow-y: auto;
	}

	c-modal .c-modal__ft {
		position: relative;
		line-height: 48px;
		font-size: 18px;
		display: flex;
	}

	c-modal .c-modal__ft:after {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-top: 1px solid #d5d5d6;
		color: #d5d5d6;
		transform-origin: 0 0;
		transform: scaleY(0.5);
	}

	c-modal .c-modal__btn {
		display: block;
		flex: 1;
		color: #3cc51f;
		text-decoration: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		position: relative;
	}

	c-modal .c-modal__btn:active {
		background-color: #eeeeee;
	}

	c-modal .c-modal__btn:after {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		width: 1px;
		bottom: 0;
		border-left: 1px solid #d5d5d6;
		color: #d5d5d6;
		transform-origin: 0 0;
		transform: scaleX(0.5);
	}

	c-modal .c-modal__btn:first-child:after {
		display: none;
	}

	c-modal .c-modal__btn_default {
		color: #353535;
	}

	c-modal .c-modal__btn_primary {
		color: #007aff;
	}
</style>
