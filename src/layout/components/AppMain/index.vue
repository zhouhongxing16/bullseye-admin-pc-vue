<template>
  <section class="app-main">
    <!--<transition name="fade-transform" mode="out-in">
      <keep-alive :include="state.cachedViews">
        <router-view :key="state.key" />
      </keep-alive>
    </transition>-->
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
        console.log('cachedViews:' + store.state.tagsView.cachedViews)
        return store.state.tagsView.cachedViews
      }),
      key: computed(() => {
        console.log('key:' + router.currentRoute.value.path)
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
