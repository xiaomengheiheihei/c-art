<template>
  <c-web-view>
    <iframe
      :src="$getRealPath(src)"
      frameborder="0"
      width="100%"
      height="100%" />
  </c-web-view>
</template>
<script>
export default {
  name: 'WebView',
  props: {
    src: {
      type: String,
      default: ''
    }
  }
}
</script>
<style>
	c-web-view iframe {
		position: absolute;
	}
</style>
