<template>
  <div class="index">
    <div class="login">
      <div class="title">
        登录系统
      </div>
      <a-form ref="formRef" layout="horizontal">
        <a-form-item v-bind="validateInfos.username">
          <a-input class="input" size="large" v-model:value="modelRef.username" placeholder="用户名" >
            <template #prefix><UserOutlined style="color: #889aa4; margin: 0 5px" /></template>
          </a-input>
        </a-form-item>
        <a-form-item v-bind="validateInfos.password">
          <a-input-password class="input" size="large" v-model:value="modelRef.password" type="password" placeholder="密码">
            <template #prefix><LockOutlined style="color: #889aa4; margin: 0 5px" /></template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button class="button" type="primary" :loading="loading" htmlType="submit" style="width: 100%;margin-top: 20px" size="large" @click.prevent="onSubmit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">

import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive, ref, toRaw } from 'vue'
import { Form } from 'ant-design-vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router"

export default defineComponent({
  name: 'Login',
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    let loading = ref(false)

    const useForm = Form.useForm

    const modelRef = reactive({
      username: '',
      password: ''
    })

    const rulesRef = {
      username: [{ required: true, message: '请输入用户名', trigger: 'blur'}],
      password: [{ required: true, message: '请输入密码', trigger: 'blur'}]
    }

    const { validate, validateInfos } = useForm(modelRef, rulesRef)
    // 登陆方法
    const onSubmit = () => {
      validate()
        .then(() => {
          loading.value = true
          store.dispatch('login', modelRef).then(() => {
            console.log('成功')
            loading.value = false
            router.push({ path: '/' })
          }).catch(err => {
            loading.value = false
            console.log(err)
            loading.value = false
          })
          console.log(toRaw(modelRef))
        })
        .catch(err => {
          console.log('error', err)
        })
    }

    return {
      loading,
      onSubmit,
      modelRef,
      rulesRef,
      validateInfos
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  width: 400px;
  margin: 0 auto;

  @media screen and (max-width: 400px) {
    width: 95%;
  }
  @media screen and (max-width: 320px) {
    .captcha-button{
      font-size: 14px;
    }
  }
}

.index {
  background-color: #2d3a4b;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.title {
  color: white;
  margin-top: 10vh;
  text-align: center;
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 30px;
}

.input {
  border-radius: 4px;
  border: 1px solid hsla(0, 0%, 100% ,.1);
  background-color: rgba(0,0,0,.1);
}

.input:focus {
  border: 1px solid hsla(0, 0%, 100% ,.1);
  background-color: rgba(0,0,0,.1);
}

.input:hover {
  border: 1px solid hsla(0, 0%, 100% ,.1);
  background-color: rgba(0,0,0,.1);
}

::v-deep(.ant-input) {
  background-color: rgba(0, 0, 0, 0) !important;
  color: white !important;
  outline: none !important;
  height: 34px !important;
  font-size: 14px;
}

::v-deep .ant-input-password-icon {
  color: #889aa4;
}

.button {
  border-radius: 5px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  font-size: 14px;
}

</style>
