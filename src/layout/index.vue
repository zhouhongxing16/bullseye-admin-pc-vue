<template>
  <div :class="obj.classObj" class="app-wrapper">
    <div v-if="state.device==='mobile'&&state.sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container" />
    <settings class="settings-container"/>

    <div :class="{hasTagsView: state.needTagsView}" class="main-container">
      <div :class="{'fixed-header':state.fixedHeader}">
        <navbar />
        <tags-view v-if="state.needTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch, onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import { Navbar, AppMain, Sidebar, TagsView, Settings } from './components'
import { useStore } from "vuex"
import { useRoute } from "vue-router";

export default defineComponent({
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    Sidebar,
    TagsView,
    Settings
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const { body } = document
    const WIDTH = 700

    let state = reactive({
      sidebar: computed(() => {
        return store.state.app.sidebar
      }),
      device: computed(() => {
        return store.state.app.device
      }),
      needTagsView: computed(() => {
        return store.state.settings.tagsView
      }),
      fixedHeader: computed(() => {
        return store.state.settings.fixedHeader
      }),
      sidebarOpened: computed(() => {
        return store.getters.sidebar.opened
      })
    })

    // 监听路由
    watch(() => route,() => {
      console.log(state.sidebar.opened)
      if (state.device.toString() == 'mobile' && state.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    })

    // 监听页面大小变化
    onBeforeMount(() => {
      window.addEventListener('resize', resizeHandler)
      const mobile = isMobile()
      if (mobile) {
        store.dispatch('app/toggleDevice', 'mobile')
        store.dispatch('app/closeSideBar', { withoutAnimation: true })
      }
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeHandler)
    })

    // 初始化模式
    /*onMounted(() => {

    })*/

    const isMobile = () => {
      // 返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    }

    const resizeHandler = () => {
      if (!document.hidden) {
        const mobile = isMobile()
        // 切换模式
        store.dispatch('app/toggleDevice', mobile ? 'mobile' : 'desktop')

        if (mobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }

    // 点击背景时，关闭sidebar
    const handleClickOutside = () => {
      store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }

    const obj = reactive({
      classObj: computed(() => {
        return {
          hideSidebar: !store.getters.sidebar.opened, // 隐藏sidebar
          openSidebar: store.getters.sidebar.opened, // 打开sidebar
          withoutAnimation: store.getters.sidebar.withoutAnimation, // 关闭动画
          mobile: store.getters.device === 'mobile' // 手机模式
        }
      })
    })

    return {
      state,
      handleClickOutside,
      obj,
      isMobile,
      resizeHandler
    }
  }
})
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 80px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

  .settings-container {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    z-index: 10;
  }
</style>
