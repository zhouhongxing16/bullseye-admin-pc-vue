<template>
  <c-scrollbar :ref="setRef" direction="x" trigger="none" class="scroll-container" @wheel.prevent="handleScroll">
    <slot />
  </c-scrollbar>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, nextTick} from 'vue'
export default defineComponent({
  name: 'ScrollPane',
  setup(props, content) {
    const scrollContainer = ref()
    const setRef = (el) => {
      scrollContainer.value = el
    }

    // 鼠标滚轮滚动时触发
    const handleScroll = (e:any) => {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      scrollContainer.value.wrapRef.scrollLeft = scrollContainer.value.wrapRef.scrollLeft - eventDelta / 4
    }

    const emitScroll = () => {
      content.emit('scroll')
    }

    const tagAndTagSpacing = 4 // tag与tag之间的空间

    const moveToTarget = (currentTag:any, tagList: any) => {
      // 获取scrollContainer组件
      const container = scrollContainer.value.$el
      // 获取scrollContainer组件的宽度
      const containerWidth = container.offsetWidth
      // 获取scrollContainer组件的内部组件
      const scrollWrapper = scrollContainer.value.wrapRef

      let firstTag = null
      let lastTag = null

      // 获取第一个和最后一个tag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }

      // 如果移动到是第一个tag，则滚动条直接到最左边
      if (firstTag === currentTag) {
        scrollWrapper.scrollLeft = 0
      } else if (lastTag === currentTag) {
        scrollWrapper.scrollLeft = scrollWrapper.scrollWidth - containerWidth
      } else {
        // find preTag and nextTag
        // 找到当前tag的位置
        const currentIndex = tagList.findIndex(item => item === currentTag)
        // 找到前一个tag
        const prevTag = tagList[currentIndex - 1]
        // 找到后一个tag
        const nextTag = tagList[currentIndex + 1]

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

        if (afterNextTagOffsetLeft > scrollWrapper.scrollLeft + containerWidth) {
          scrollWrapper.scrollLeft = afterNextTagOffsetLeft - containerWidth
        } else if (beforePrevTagOffsetLeft < scrollWrapper.scrollLeft) {
          scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    }


    return {
      /*left,
      scrollWrapper,
      emitScroll,*/
      setRef,
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
