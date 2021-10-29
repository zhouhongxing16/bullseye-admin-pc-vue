<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in state.visitedViews"
        :ref="setRef"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle="!isAffix(tag)?closeSelectedTag(tag):''"
        @contextmenu.prevent="openMenu(tag,$event)"
      >
        {{ tag.title }}
        <CloseOutlined v-if="!isAffix(tag)" class="icon-close" @click.prevent.stop="closeSelectedTag(tag)"/>
      </router-link>
    </scroll-pane>
    <ul v-show="state.visible" :style="{left:state.left+'px',top:state.top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(state.selectedTag)">刷新</li>
      <li v-if="!isAffix(state.selectedTag)" @click="closeSelectedTag(state.selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(state.selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch, onMounted, ref, nextTick, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import path from 'path'
import ScrollPane from './ScrollPane.vue'
import { CloseOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: { ScrollPane, CloseOutlined },
  setup() {
    const route = useRoute()
    const store = useStore()
    const router = useRouter()

    const state = reactive({
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      visitedViews: computed(() => {
        return store.state.tagsView.visitedViews
      })
    })

    const { proxy } = getCurrentInstance()

    // 获取路由（应改获取权限内的路由）
    const routeArray = computed(() => {
      // return store.state.permission.routes
      return router.options.routes
    })

    // 监听路由地址，增加tag
    watch(() => route.path,() => {
      addTags()
      moveToCurrentTag()
    })

    // 监听右键菜单的变化，进行开关
    watch(() => state.visible,(value) => {
      if (value) {
        document.body.addEventListener('click', closeMenu)
      } else {
        document.body.removeEventListener('click', closeMenu)
      }
    })

    // 初始化tags
    onMounted(() => {
      initTags()
      addTags()
    })

    // 是否活动中的菜单
    const isActive = (routeValue:any) => {
      return routeValue.path === route.path
    }

    // 是否Affix，如果是，则不显示关闭按钮
    const isAffix = (tag:any) => {
      return tag.meta && tag.meta.affix
    }

    // 返回所有Affix的路由
    const filterAffixTags = (routes, basePath = '/') => {
      let tags = []
      if (routeArray.value) {
        routes.forEach(route => {
          if (route.meta && route.meta.affix) {
            const tagPath = path.resolve(basePath, route.path)
            tags.push({
              fullPath: tagPath,
              path: tagPath,
              name: route.name,
              meta: { ...route.meta }
            })
          }
          if (route.children) {
            const tempTags = filterAffixTags(route.children, route.path)
            if (tempTags.length >= 1) {
              tags = [...tags, ...tempTags]
            }
          }
        })
      }
      return tags
    }

    // tags的初始化
    const initTags = () => {
      const affixTags = state.affixTags = filterAffixTags(routeArray.value)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    }

    // 添加tags
    const addTags = () => {
      const { name } = route
      if (name) {
        store.dispatch('tagsView/addView', route)
      }
      return false
    }

    const myTag = ref([])
    const setRef = (el) => {
      myTag.value.push(el)
    }
    nextTick(() => {
      console.dir(myTag.value);
    })

    // query不同时，变更记录
    const moveToCurrentTag = () => {
      const tags = myTag.value
      nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === route.path) {
            //scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== route.fullPath) {
              store.dispatch('tagsView/updateVisitedView', route)
            }
            break
          }
        }
      })
    }

    // 刷新页面，先移除，再跳转
    const refreshSelectedTag = (view:any) => {
      store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        nextTick(() => {
          router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    }

    // 关闭选中的tag
    const closeSelectedTag = (view:any) => {
      store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (isActive(view)) {
          toLastView(visitedViews, view)
        }
      })
    }

    // 关闭其他的tag
    const closeOthersTags = () => {
      router.push(state.selectedTag)
      store.dispatch('tagsView/delOthersViews', state.selectedTag).then(() => {
        moveToCurrentTag()
      })
    }

    // 关闭全部tag
    const closeAllTags = (view:any) => {
      store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (state.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        toLastView(visitedViews, view)
      })
    }

    const toLastView = (visitedViews, view) => {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          router.replace({ path: '/redirect' + view.fullPath })
        } else {
          router.push('/')
        }
      }
    }

    const openMenu = (tag, e) => {
      const menuMinWidth = 105
      const offsetLeft = proxy.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = proxy.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        state.left = maxLeft
      } else {
        state.left = left
      }

      state.top = e.clientY
      state.visible = true
      state.selectedTag = tag
    }

    // 关闭弹窗
    const closeMenu = () => {
      state.visible = false
    }

    const handleScroll = () => {
      closeMenu()
    }

    return {
      state,
      routeArray,
      setRef,
      isActive,
      isAffix,
      filterAffixTags,
      initTags,
      addTags,
      moveToCurrentTag,
      refreshSelectedTag,
      closeSelectedTag,
      closeOthersTags,
      closeAllTags,
      toLastView,
      openMenu,
      closeMenu,
      handleScroll
    }
  }
})
</script>

<style lang="scss" scoped>
  .tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .tags-view-wrapper {
      .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;
        &:first-of-type {
          margin-left: 15px;
        }
        &:last-of-type {
          margin-right: 15px;
        }
        &.active {
          background-color: #42b983;
          color: #fff;
          border-color: #42b983;
          &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
      }
    }
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 3000;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>

<style lang="scss">
  //reset element css of el-icon-close
  .tags-view-wrapper {
    .tags-view-item {
      .icon-close {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        svg {
          margin-top: 2px;
        }
        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
</style>
