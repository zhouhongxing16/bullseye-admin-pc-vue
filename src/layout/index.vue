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
import { defineComponent, reactive, computed } from 'vue'
import { Navbar, AppMain, Sidebar, TagsView } from './components'
import { useStore } from "vuex"
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

    let state = reactive({
      sidebar: store => store.app.sidebar,
      device: store => store.app.device,
      needTagsView: store => store.settings.tagsView,
      fixedHeader: store => store.settings.fixedHeader
    })

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
      obj
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

  .sidebar-container {
    transition: width 0.28s;
    transition: background 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
    width: $sideBarWidth !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
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
