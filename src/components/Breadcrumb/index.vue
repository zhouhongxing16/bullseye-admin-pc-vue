<template>
  <div>
    <a-breadcrumb class="app-breadcrumb" separator="/">
      <a-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <!-- noRedirect的路由和最后一个面包屑不可点击 -->
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

    // 监听路由变化
    watch(() => route.path,() => {
      getBreadcrumb()
    })

    // 获取当前路由信息，以作面包屑展示
    const getBreadcrumb = () => {
      // 获取当前路由及其嵌套的信息
      let matched:any = route.matched.filter(item => item.meta && item.meta.title)

      const first:any = matched[0]

      // 如果路由信息第一个不是首页，则加上首页开头
      if (!isDashboard(first)) {
        matched = [
          {
            path: '/dashboard',
            meta: { title: '首页' }
          }].concat(matched)
      }
      // 面包屑列表
      levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }

    // 是否首页开头判断
    const isDashboard = (route: any) => {
      const name = route && route.name
      if (!name) {
        return false
      }
      // 字符转换为小写
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }

    // 处理地址
    const pathCompile = (path: any) => {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = route
      const toPath = compile(path)
      return toPath(params)
    }

    // 点击时跳转
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
