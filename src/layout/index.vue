<template>
  <div :class="obj.classObj" class="app-wrapper">
    <div v-if="state.device==='mobile'&&state.sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container" />
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
import { Navbar, AppMain, Sidebar, TagsView } from './components'
import { useStore } from "vuex"
import { useRoute } from "vue-router";

export default defineComponent({
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    Sidebar,
    TagsView
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const { body } = document
    const WIDTH = 992

    let state = reactive({
      sidebar: computed(() => {
        return store.getters.sidebar
      }),
      device: computed(() => {
        return store.state.app.device
      }),
      needTagsView: computed(() => {
        return store.state.settings.tagsView
      }),
      fixedHeader: computed(() => {
        return  store.state.settings.fixedHeader
      }),
      sidebarOpened: computed(() => {
        return store.getters.sidebar.opened
      })
    })

    watch(() => route,() => {
      if (state.device.toString() == 'mobile' && state.sidebarOpened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    })

    onBeforeMount(() => {
      window.addEventListener('resize', resizeHandler)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeHandler)
    })

    onMounted(() => {
      const mobile = isMobile()
      if (mobile) {
        store.dispatch('app/toggleDevice', 'mobile')
        store.dispatch('app/closeSideBar', { withoutAnimation: true })
      }
    })

    const isMobile = () => {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    }

    const resizeHandler = () => {
      if (!document.hidden) {
        const mobile = isMobile()
        store.dispatch('app/toggleDevice', mobile ? 'mobile' : 'desktop')

        if (mobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }

    const handleClickOutside = () => {
      store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }

    const obj = reactive({
      classObj: computed(() => {
        return {
          hideSidebar: !store.getters.sidebar.opened,
          openSidebar: store.getters.sidebar.opened,
          withoutAnimation: store.getters.sidebar.withoutAnimation,
          mobile: store.getters.device === 'mobile'
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

  .main-container {
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: $sideBarWidth;
    position: relative;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 80px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
