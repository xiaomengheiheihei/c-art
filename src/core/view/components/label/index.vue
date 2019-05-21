<template>
  <c-label
    v-on="$listeners"
    @click="_onClick">
    <slot />
  </c-label>
</template>
<script>
import {
  emitter
} from 'uni-mixins'
export default {
  name: 'Label',
  mixins: [emitter],
  props: {
    for: {
      type: String,
      default: ''
    }
  },
  methods: {
    _onClick ($event) {
      let stopPropagation = /^c-(checkbox|radio|switch)-/.test($event.target.className)
      if (!stopPropagation) {
        stopPropagation = /^c-(checkbox|radio|switch|button)$/i.test($event.target.tagName)
      }
      if (stopPropagation) {
        return
      }

      if (this.for) {
        UniViewJSBridge.emit('c-label-click-' + this.$page.id + '-' + this.for, $event, true)
      } else {
        this.$broadcast(['Checkbox', 'Radio', 'Switch', 'Button'], 'c-label-click', $event, true)
      }
    }
  }
}
</script>
<style>

</style>
