<template>
  <div>
    <a-breadcrumb class="app-breadcrumb" separator="/">
      <a-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect ==='noRedirect'||index == (levelList.length-1)" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { compile } from 'path-to-regexp'
export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const router = useRouter()
    const route = useRoute()

    let levelList = ref()

    watch(() => route.path,() => {
      getBreadcrumb()
    })

    const getBreadcrumb = () => {
      let matched:any = route.matched.filter(item => item.meta && item.meta.title)

      const first:any = matched[0]

      if (!isDashboard(first)) {
        matched = [
          {
            path: '/dashboard',
            meta: { title: '首页' }
          }].concat(matched)
      }
      levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }

    const isDashboard = (route: any) => {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }

    const pathCompile = (path: any) => {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = route
      var toPath = compile(path)
      return toPath(params)
    }

    const handleLink = (item) => {
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect)
        return
      }
      router.push(pathCompile(path))
    }

    getBreadcrumb()

    return {
      levelList,
      getBreadcrumb,
      isDashboard,
      pathCompile,
      handleLink
    }
  }
})
</script>

<style lang="scss" scoped>
  div {
    line-height: 50px;
  }

  .app-breadcrumb .ant-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
