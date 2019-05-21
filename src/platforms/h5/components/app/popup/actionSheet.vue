<template>
  <c-actionsheet @touchmove.prevent>
    <transition name="c-fade">
      <div
        v-show="visible"
        class="c-mask"
        @click="_close(-1)" />
    </transition>
    <div
      :class="{'c-actionsheet_toggle':visible}"
      class="c-actionsheet">

      <div class="c-actionsheet__menu">
        <div
          v-if="title"
          class="c-actionsheet__title"
        >{{ title }}</div>
        <div
          v-for="(title,index) in itemList"
          :key="index"
          :style="{color:itemColor}"
          class="c-actionsheet__cell"
          @click="_close(index)">{{ title }}</div>
      </div>
      <div class="c-actionsheet__action">
        <div
          :style="{color:itemColor}"
          class="c-actionsheet__cell"
          @click="_close(-1)">取消</div>
      </div>
    </div>
  </c-actionsheet>
</template>
<script>
export default {
  name: 'ActionSheet',
  props: {
    title: {
      type: String,
      default: ''
    },
    itemList: {
      type: Array,
      default () {
        return []
      }
    },
    itemColor: {
      type: String,
      default: '#000000'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    _close (tapIndex) {
      this.$emit('close', tapIndex)
    }
  }
}
</script>
<style>
	c-actionsheet {
		display: block;
		box-sizing: border-box;
	}

	c-actionsheet .c-actionsheet {
		position: fixed;
		left: 0;
		bottom: 0;
		transform: translate(0, 100%);
		backface-visibility: hidden;
		z-index: 999;
		width: 100%;
		background-color: #efeff4;
    visibility: hidden;
    transition-property: transform, visibility;
		transition-duration: 0.3s, 0.3s;
	}

	c-actionsheet .c-actionsheet.c-actionsheet_toggle {
    visibility: visible;
		transform: translate(0, 0);
	}

	c-actionsheet .c-actionsheet * {
		box-sizing: border-box;
	}

	c-actionsheet .c-actionsheet__menu {
		background-color: #fcfcfd;
	}

	c-actionsheet .c-actionsheet__action {
		margin-top: 6px;
		background-color: #fcfcfd;
	}

	c-actionsheet .c-actionsheet__cell ,
	c-actionsheet .c-actionsheet__title {
		position: relative;
		padding: 10px 0;
		text-align: center;
		font-size: 18px;
	}
	c-actionsheet .c-actionsheet__cell:before {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-top: 1px solid #e5e5e5;
		color: #e5e5e5;
		transform-origin: 0 0;
		transform: scaleY(0.5);
	}

	c-actionsheet .c-actionsheet__cell:active {
		background-color: #ececec;
	}

	c-actionsheet .c-actionsheet__cell:first-child:before {
		display: none;
	}
</style>
