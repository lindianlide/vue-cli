<template>
  <div class="container">
    <div class="global">
      <HeaderGlobal />
    </div>
    <div class="content">
      <a-form :model="formState" @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item
          name="username"
          :rules="[{ required: true, message: t('account.validatedUsername') }]"
        >
          <a-input
            v-model:value="formState.username"
            allow-clear
            :placeholder="t('account.username')"
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: t('account.validatedPassword') }]"
        >
          <a-input-password
            v-model:value="formState.password"
            allow-clear
            :placeholder="t('account.password')"
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-button block type="primary" html-type="submit">
          {{ t('account.signin') }}
        </a-button>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import HeaderGlobal from '@/layouts/components/HeaderGlobal.vue'

import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

import { signin } from '@/api/user/login'

const { t } = useI18n()

const formState = reactive({
  username: '',
  password: ''
})

const router = useRouter()

const onFinish = (values) => {
  signin({
    username: values.username,
    password: btoa(values.password)
  })
    .then((response) => {
      if (!response.data.token) {
        message.error(t('account.invalidPassword'))
        return
      }
      window.localStorage.setItem('token', response.data.token)
      router.replace('/')
    })
    .catch((error) => {
      console.error(error)
      message.error(t('account.invalidPassword'))
    })
}

const onFinishFailed = (error) => {
  console.error(error)
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: auto;
  background-color: white;
}

.content {
  width: 400px;
  padding: 50px;
  box-shadow: 5px 5px 10px 5px #ccc;
}

.content a:hover {
  background-color: white;
}

.global {
  position: fixed;
  top: 20px;
  right: 120px;
}
</style>
