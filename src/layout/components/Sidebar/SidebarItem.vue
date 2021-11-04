<template >
  <template v-if="!data.item.meta || !data.item.meta.hidden">
    <template v-if="!alwaysShowRootMenu() && theOnlyOneChild() && !theOnlyOneChild().children">
      <a-menu-item :key="resolvePath(theOnlyOneChild().path)" :class="{'submenu-title-noDropdown': data.isFirstLevel}"  @click="goToPath(resolvePath(theOnlyOneChild().path))">
        <template v-if="theOnlyOneChild().meta.icon" #icon>
          <icon class="svg-icon" :icon="theOnlyOneChild().meta.icon"></icon>
        </template>
        {{theOnlyOneChild().meta.title}}
      </a-menu-item>
    </template>

    <a-sub-menu v-else :key="resolvePath(data.item.path)" >
      <template v-if="data.item.meta && data.item.meta.icon" #icon>
        <icon :icon="data.item.meta.icon"></icon>
      </template>
      <template v-if="data.item.meta && data.item.meta.title" #title>
         {{data.item.meta.title}}
      </template>
      <template v-if="data.item.children">
        <sidebar-item
          v-for="child in data.item.children"
          :key="child.path"
          :item="child"
          :is-collapse="data.isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </a-sub-menu>
  </template>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import path from 'path'
import { isExternal } from '@/utils/validate'
import { Icon } from '@/utils/icon'
import router from "@/router";

export default defineComponent({
  name: 'SidebarItem',
  components: { Icon },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
    isCollapse: {
      type: Boolean,
      default: false
    },
    isFirstLevel: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {

    let data = reactive({
      item: props.item,
      isNest: props.isNest,
      basePath: props.basePath,
      isCollapse: props.isCollapse,
      isFirstLevel: props.isFirstLevel
    })

    // 如果设置为true，将始终显示根菜单
    // 如果未设置alwaysShow，则当项目有多个子路线时
    // 它将变为嵌套模式，否则不显示根菜单
    const alwaysShowRootMenu = () => {
      if (data.item.meta && data.item.meta.alwaysShow) {
        return true
      }
      return false
    }

    // 计算需要展示的下级菜单数量
    const showingChildNumber = () => {
      if (data.item.children) {
        const showingChildren = data.item.children.filter(item => {
          if (item.meta && item.meta.hidden) {
            return false // 不加入数组
          } else {
            return true
          }
        })
        return showingChildren.length
      }
      return 0
    }

    const theOnlyOneChild = () => {
      // 如果需要展示的下级菜单数量大于一，则应使用submenu
      if (showingChildNumber() > 1) {
        return null
      }

      if (data.item.children) {
        for (const child of data.item.children) {
          if (!child.meta || !child.meta.hidden) {
            // 返回有效的下级菜单
            return child
          }
        }
      }
      // If there is no children, return itself with path removed,
      // because this.basePath already conatins item's path information
      return { ...data.item, path: '' }
    }

    const resolvePath = (routePath: string) => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(data.basePath)) {
        return data.basePath.toString()
      }

      return path.resolve(data.basePath.toString(), routePath)
    }

    const goToPath = (path:string) => {
      if (isExternal(path)) {
        let el = document.createElement('a')
        el.href = path
        el.target = '_blank'
        el.rel = 'noopener'
        el.click()
        el.remove()
      } else {
        router.push(path)
      }
    }

    return {
      data,
      alwaysShowRootMenu,
      theOnlyOneChild,
      resolvePath,
      goToPath
    }
  }
})
</script>

<style lang="scss">

  /*.full-mode {
    .nest-menu .a-submenu>.a-submenu__title,
    .a-submenu .a-menu-item {
      min-width: $sideBarWidth !important;
      background-color: $subMenuBg !important;

      &:hover {
        background-color: $subMenuHover !important;
      }
    }
  }*/

  .simple-mode {
    &.first-level {
      .submenu-title-noDropdown {
        padding: 0 !important;
        position: relative;

        .a-tooltip {
          padding: 0 !important;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .svg-icon {
    margin-right: 16px;
  }

  .simple-mode {
    .svg-icon {
      margin-left: 20px;
    }
  }
</style>
