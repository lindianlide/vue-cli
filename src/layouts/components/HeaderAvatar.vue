<script setup>
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import { logout } from '@/utils'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const signout = () => {
  logout()
}
const set = () => {
  router.push('/admin/setting')
}
</script>
<template>
  <a-dropdown placement="bottomLeft">
    <div>
      <a-avatar>
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </div>
    <template #overlay>
      <slot name="overlay">
        <a-menu>
          <a-menu-item @click="set">
            <a-space>
              <SettingOutlined />
              <span>{{ t('setting.setting') }}</span>
            </a-space>
          </a-menu-item>
          <a-menu-item @click="signout">
            <a-space>
              <LogoutOutlined />
              <span>{{ t('account.signout') }}</span>
            </a-space>
          </a-menu-item>
        </a-menu>
      </slot>
    </template>
  </a-dropdown>
</template>

<style lang="less" scoped>
.ant-dropdown-menu {
  padding: 4px 0;
  :deep(.ant-dropdown-menu-item) {
    min-width: 160px;
  }
}
</style>
