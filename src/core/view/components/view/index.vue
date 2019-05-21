<template>
  <c-view
    v-if="hoverClass && hoverClass !== 'none'"
    :class="[hovering?hoverClass:'']"
    @touchstart="_hoverTouchStart"
    @touchend="_hoverTouchEnd"
    @touchcancel="_hoverTouchCancel"
    v-on="$listeners"
  >
    <slot/>
  </c-view>
  <c-view
    v-else
    v-on="$listeners">
    <slot/>
  </c-view>
</template>

<style>
c-view {
  display: block;
}
c-view[hidden] {
  display: none;
}
</style>

<script>
import hover from 'uni-mixins/hover'
export default {
  name: 'View',
  mixins: [hover],
  listeners: {
    'label-click': 'clickHandler'
  }
}
</script>
