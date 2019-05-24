<template>
  <c-tabbar>
    <div
      :style="{backgroundColor:backgroundColor}"
      class="c-tabbar">
      <div
        :style="{backgroundColor:borderColor}"
        class="c-tabbar-border" />
      <div
        v-for="(item,index) in list"
        :key="item.pagePath"
        class="c-tabbar__item"
        @click="_switchTab(item,index)">
        <div class="c-tabbar__bd">
          <div
            v-if="item.iconPath"
            :class="{'c-tabbar__icon__diff':!item.text}"
            class="c-tabbar__icon">
            <img :src="_getRealPath($route.meta.pagePath===item.pagePath?item.selectedIconPath:item.iconPath)">
          </div>
          <div
            v-if="item.text"
            :style="{color:$route.meta.pagePath===item.pagePath?selectedColor:color,fontSize:item.iconPath?'10px':'14px'}"
            class="c-tabbar__label">
            {{ item.text }}
          </div>
          <div
            v-if="item.redDot"
            :class="{'c-tabbar__badge':!!item.badge}"
            class="c-tabbar__reddot">{{ item.badge }}</div>
        </div>
      </div>
    </div>
    <div class="c-placeholder" />
  </c-tabbar>
</template>

<style>
c-tabbar {
  display: block;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 998;
}

c-tabbar .c-tabbar {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 998;
  box-sizing: border-box;
  padding-bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

c-tabbar .c-tabbar ~ .c-placeholder {
  width: 100%;
  height: 50px;
  margin-bottom: 0;
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
}

c-tabbar .c-tabbar * {
  box-sizing: border-box;
}

c-tabbar .c-tabbar__item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  font-size: 0;
  text-align: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

c-tabbar .c-tabbar__bd {
  position: relative;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

c-tabbar .c-tabbar__icon {
  position: relative;
  display: inline-block;
  margin-top: 5px;
  width: 27px;
  height: 27px;
}

c-tabbar .c-tabbar__icon.c-tabbar__icon__diff{
  margin-top: 0px;
  width: 34px;
  height: 34px;
}

c-tabbar .c-tabbar__icon img {
  width: 100%;
  height: 100%;
}

c-tabbar .c-tabbar__label {
  position: relative;
  text-align: center;
  font-size: 10px;
  line-height: 1.8;
}

c-tabbar .c-tabbar-border {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  transform: scaleY(0.5);
}

c-tabbar .c-tabbar__reddot {
  position: absolute;
  top: 6px;
  left: 16px;
  width: 12px;
  height: 12px;
  display: inline-block;
  border-radius: 50%;
  background-color: #f43530;
  color: #ffffff;
}

c-tabbar .c-tabbar__badge {
  top: 4px;
  border-radius: 18px;
  min-width: 8px;
  width: auto;
  height: auto;
  padding: 0.15em 0.5em;
  font-size: 12px;
  line-height: 1.2;
  white-space: nowrap;
}
</style>

<script>
import getRealPath from 'uni-platform/helpers/get-real-path'

export default {
  name: 'TabBar',
  props: {
    position: {
      default: 'bottom',
      validator (value) {
        return ['bottom', 'top'].indexOf(value) !== -1
      }
    },
    color: {
      type: String,
      default: '#999'
    },
    selectedColor: {
      type: String,
      default: '#007aff'
    },
    backgroundColor: {
      type: String,
      default: '#f7f7fa'
    },
    borderStyle: {
      default: 'black',
      validator (value) {
        return ['black', 'white'].indexOf(value) !== -1
      }
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    borderColor () {
      return this.borderStyle === 'white'
        ? 'rgba(255, 255, 255, 0.33)'
        : 'rgba(0, 0, 0, 0.33)'
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.meta.isTabBar) {
        this.__path__ = to.path
      }
    }
  },
  beforeCreate () {
    this.__path__ = this.$route.path
  },
  methods: {
    _getRealPath (filePath) {
      if (filePath.indexOf('/') !== 0) {
        filePath = '/' + filePath
      }
      return getRealPath(filePath)
    },
    _switchTab ({
      text,
      pagePath
    }, index) {
      let url = '/' + pagePath
      if (url === __uniRoutes[0].alias) {
        url = '/'
      }
      if (this.$route.path !== url) {
        this.__path__ = this.$route.path
        c.switchTab({
          url
        })
      } else {
        UniServiceJSBridge.emit('onTabItemTap', {
          index,
          text,
          pagePath
        })
      }
    }
  }
}
</script>
