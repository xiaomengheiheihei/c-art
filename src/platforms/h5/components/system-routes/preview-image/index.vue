<template>
  <div
    class="c-system-preview-image"
    @click="_click">
    <v-uni-swiper
      :current.sync="index"
      :indicator-dots="false"
      :autoplay="false"
      class="c-swiper">
      <v-uni-swiper-item
        v-for="(src,index) in urls"
        :key="index">
        <img
          :src="src"
          class="c-preview-image">
      </v-uni-swiper-item>
    </v-uni-swiper>
  </div>
</template>

<script>
export default {
  name: 'SystemPreviewImage',
  data () {
    const {
      urls,
      current
    } = this.$route.params
    return {
      urls: urls || [],
      current,
      index: 0
    }
  },
  created () {
    const index = typeof this.current === 'number' ? this.current : this.urls.indexOf(this.current)
    this.index = index < 0 ? 0 : index
  },
  methods: {
    _click () {
      getApp().$router.back()
    }
  }
}
</script>
<style>
.c-system-preview-image {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: black;
}
.c-swiper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.c-preview-image {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 100%;
  max-width: 100%;
}
</style>
