<template>
  <div>
    <right-panel  placement="right">
      主题：<a-switch
        :checked="state.theme === 'dark'"
        checked-children="Dark"
        un-checked-children="Light"
        @change="changeTheme"
      />
    </right-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { useStore } from "vuex";
import RightPanel from '@/components/RightPanel/index.vue'

export default defineComponent({
  name: 'Settings',
  components: { RightPanel },
  setup() {
    const store = useStore()

    const state = reactive({
      theme: computed(() => {
        const theme = store.state.settings.theme
        window.document.documentElement.setAttribute('data-theme', theme);
        return theme
      })
    })

    const changeTheme = (checked: boolean) => {
      const theme = checked ? 'dark' : 'light';
      window.document.documentElement.setAttribute('theme', theme);
      store.dispatch('settings/changeTheme', theme)
    }

    return {
      state,
      changeTheme
    }
  }
})
</script>

<style scoped>

</style>
