<template>
  <a v-if="linkProps(data.to)" :href="data.to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link v-else :to="data.to">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { isExternal } from '@/utils/validate'
export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const data = reactive({
      to: props.to
    })

    const linkProps = (to:string) => {
      return isExternal(to)
    }

    return {
      data,
      linkProps
    }
  }
})
</script>

<style scoped>

</style>
