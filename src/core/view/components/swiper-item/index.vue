<template>
  <c-swiper-item v-on="$listeners">
    <slot/>
  </c-swiper-item>
</template>
<script>
export default {
  name: 'SwiperItem',
  props: {
    itemId: {
      type: String,
      default: ''
    }
  },
  mounted: function () {
    var $el = this.$el
    $el.style.position = 'absolute'
    $el.style.width = '100%'
    $el.style.height = '100%'
    var callbacks = this.$vnode._callbacks
    if (callbacks) {
      callbacks.forEach(callback => {
        callback()
      })
    }
  }
}
</script>
<style>
c-swiper-item {
  display: block;
  overflow: hidden;
  will-change: transform;
  position: absolute;
  width: 100%;
  height: 100%;
}

c-swiper-item[hidden] {
  display: none;
}
</style>
