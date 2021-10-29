<template>
  <div class="sidebar-logo-container" :class="{'collapse':data.collapse}">
    <transition :style="data.collapse?'transition:0.3s cubic-bezier(0.645, 0.045, 0.355, 1)':'transition: 0.1s linear'">
      <router-link key="collapse" class="sidebar-logo-link" to="/" :class="data.collapse?'margin-type-one':'margin-type-two'">
        <img src="@/assets/logo/logo-min.jpg" :class="data.collapse?'sidebar-logo2':'sidebar-logo'">
        <h1 class="sidebar-title" v-if="!data.collapse">{{ data.title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
export default defineComponent({
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    let data = reactive({
      collapse: computed(() => {
        return props.collapse
      }),
      title: 'logo下文字',
      logo: '@/assets/logo/logo-min.jpg'
    })

    return {
      data
    }
  }
})
</script>

<style lang="scss" scoped>
  .margin-type-one {
    text-align: left;
    padding: 0 22px 0 22px
  }

  .margin-type-two {
    text-align: left;
    padding: 0 15px 0 15px
  }

  .sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #2b2f3a;
    overflow: hidden;

    & .sidebar-logo-link {
      height: 100%;
      width: 100%;

      & .sidebar-logo {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right: 12px;
      }

      & .sidebar-logo2 {
        width: 36px;
        height: 36px;
        vertical-align: middle;
        margin-right: 12px;
      }

      & .sidebar-title {
        display: inline-block;
        margin: 0;
        color: #fff;
        font-weight: 600;
        line-height: 50px;
        font-size: 14px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        vertical-align: middle;
      }
    }

    &.collapse {
      .sidebar-logo {
        margin-right: 0px;
      }
    }
  }
</style>
