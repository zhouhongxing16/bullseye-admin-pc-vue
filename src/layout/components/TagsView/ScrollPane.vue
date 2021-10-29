<template>
  <div ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.prevent="handleScroll">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'ScrollPane',
  setup(props, content) {
    let left = 0

    const tagAndTagSpacing = 4

    const { proxy } = getCurrentInstance()

    const scrollWrapper  = computed(() =>{
      return proxy.$refs.scrollContainer as HTMLElement
    })

    onMounted(() => {
      scrollWrapper.value.addEventListener('scroll', emitScroll, true)
    })

    onBeforeUnmount(() => {
      scrollWrapper.value.removeEventListener('scroll', emitScroll)
    })

    const handleScroll = (e:any) => {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      scrollWrapper.value.scrollLeft = scrollWrapper.value.scrollLeft + eventDelta / 4
    }

    const emitScroll = () => {
      content.emit('scroll')
    }

    const moveToTarget = (currentTag:any) => {
      /*const $container = scrollWrapper.value.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = scrollWrapper.value
      const tagList = proxy.$parent.$refs.tag

      let firstTag = null
      let lastTag = null

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(item => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

        if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }*/
    }


    return {
      left,
      scrollWrapper,
      emitScroll,
      handleScroll,
      moveToTarget
    }
  }
})
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
