<template>
  <section class="app-main">
      <router-view :key="state.key" v-slot="{ Component }">
        <keep-alive :include="state.cachedViews">
          <component :is="Component" />
        </keep-alive>
      </router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'
import { useStore } from "vuex"
import { useRouter } from "vue-router"
export default defineComponent({
  name: 'AppMain',
  setup() {
    const store = useStore()
    const router = useRouter()

    const state = reactive({
      cachedViews: computed(() => {
        // 需要缓存的页面
        return store.state.tagsView.cachedViews
      }),
      key: computed(() => {
        return router.currentRoute.value.path
      })
    })

    return {
      state
    }
  }
})
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}


</style>
