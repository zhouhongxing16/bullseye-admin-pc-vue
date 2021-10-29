<template>
  <div :class="{'has-logo':init.showLogo}">
    <logo v-if="init.showLogo" :collapse="init.isCollapse" />
    <div class="scrollbar">
      <a-menu
        v-model:openKeys="init.openKeys"
        v-model:selectedKeys="init.activeMenu"
        :inline-collapsed="init.isCollapse"
        mode="inline"
        theme="dark">
        <sidebar-item v-for="route in init.routes" :key="route.path" :item="route" :base-path="route.path" :is-collapse="init.isCollapse"/>
      </a-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import variables from '@/styles/variables.scss'

export default defineComponent({
  components: { SidebarItem, Logo },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    let init = reactive({
      routes: computed(() => {
        return router.options.routes
      }),
      activeMenu: computed(() => {
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        const paths = []
        paths.push(path)
        return paths
      }),
      showLogo: computed(() => {
        return store.state.settings.sidebarLogo
      }),
      variables: computed(() => {
        return variables
      }),
      isCollapse: computed(() => {
        return !store.state.app.sidebar.opened
      }),
      openKeys: computed(() => {
        if (!store.state.app.sidebar.opened) {
          return []
        }
        let paths = []
        let matched = route.matched

        paths.push(matched[0].path)
        for (let i = 1; i < matched.length - 1; i++) {
          const match = matched[i]
          if (match.children && match.children.length > 0) {
            const values = match.path.split('/')
            paths.push(match.path + '/' + values[values.length-1])
          } else {
            paths.push(match.path)
          }
        }
        console.log('触发')
        return paths
      })
    })


    return {
      init
    }
  }
})
</script>

<style scoped>

</style>
