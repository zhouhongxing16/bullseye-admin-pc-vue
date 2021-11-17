<template>
  <div class="navbar">
    <hamburger :is-active="state.opened" class="hamburger-container" @toggleClick="toggleSideBar()" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <a-dropdown class="avatar-container" trigger="hover" placement="bottomRight">
        <div class="ant-dropdown-link">
          <div class="avatar-wrapper">
            <a-avatar v-if="state.avatar && state.avatar.length > 0" :src="state.avatar" class="user-avatar"/>
            <a-avatar v-else class="user-avatar">{{ state.name }}</a-avatar>
            <CaretDownFilled class="icon-caret-bottom"/>
          </div>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="logout">
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router";
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import { CaretDownFilled } from '@ant-design/icons-vue';
export default defineComponent({
  name: 'Navbar',
  components: {
    Hamburger,
    Breadcrumb,
    CaretDownFilled
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    let state = reactive({
      opened: computed(() => {
        return store.getters.sidebar.opened
      }),
      avatar: store.getters.avatar,
      name: store.getters.name
    })

    const toggleSideBar = () => {
      store.dispatch('app/toggleSideBar')
    }

    const logout = () => {
      store.dispatch('user/logout')
      router.push(`/login?redirect=${route.fullPath}`)
    }

    return {
      state,
      toggleSideBar,
      logout
    }
  }
})
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          position: relative;

          .user-avatar {
            transition: all .5s;
            cursor: pointer;
            width: 39px;
            height: 39px;
            border: 2px solid rgba(0, 0, 0, 0);
            padding: 0;
            &:hover {
              border: 2px solid #C5C7C9;
            }
          }

          .icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            bottom: 5px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
