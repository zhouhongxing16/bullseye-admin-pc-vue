<template>
  <!-- 右侧主题设置栏 -->
  <div>
    <!-- 遮罩 -->
    <transition name="fade">
      <div v-if="state.visible" :class="['mask']" @click="close"></div>
    </transition>
    <div :class="['drawer', state.placement, state.visible ? 'open' : 'close']">
      <!-- 设置模块主体 -->
      <div ref="drawer" class="content">
        <slot></slot>
      </div>
      <!-- 左侧伸缩按钮 -->
      <div v-if="state.showHandler" :class="['handler-container', state.placement, state.visible ? 'open' : 'close']" ref="handler" @click="toggle">
        <slot v-if="$slots.handler" name="handler"></slot>
        <div v-else class="handler">
          <LeftOutlined v-if="!state.visible" class="icon"/>
          <RightOutlined v-else class="icon"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'RightPanel',
  components: {
    LeftOutlined,
    RightOutlined
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    placement: {
      type: String,
      required: false,
      default: 'left'
    },
    showHandler: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup(props, content) {

    const state = reactive({
      visible: props.visible,
      placement: props.placement,
      showHandler: props.showHandler
    })

    const open = () => {
      state.visible = true
    }

    const close = () => {
      state.visible = false
    }

    const toggle = () => {
      state.visible = !state.visible
    }

    return {
      state,
      open,
      close,
      toggle
    }
  }
})
</script>

<style lang="scss" scoped>
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.15);
    z-index: 100;
  }

  .drawer {
    position: fixed;
    transition: all 0.5s;
    height: 100vh;
    z-index: 100;
    &.left {
      left: 0px;
      &.open {
        .content {
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
          padding: 20px;
        }
      }
      &.close {
        transform: translateX(-100%);
        .content {
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
          padding: 20px;
        }
      }
    }
    &.right {
      right: 0px;
      .content {
        float: right;
      }
      &.open {
        .content {
          box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
          padding: 20px;
        }
      }
      &.close {
        transform: translateX(100%);
        .content {
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
          padding: 20px;
        }
      }
    }
  }

  .content {
    display: inline-block;
    height: 100vh;
    overflow-y: auto;
    background-color: white;
  }

  .handler-container {
    position: absolute;
    display: inline-block;
    text-align: center;
    transition: all 0.5s;
    cursor: pointer;
    top: 200px;
    z-index: 100;
    .handler {
      height: 40px;
      width: 40px;
      background-color: white;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      line-height: 40px;
    }
    &.left {
      right: -40px;
      .handler{
        border-radius: 0 5px 5px 0;
      }
    }
    &.right {
      left: -40px;
      .handler{
        border-radius: 5px 0 0 5px;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>
