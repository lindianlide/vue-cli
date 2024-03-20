<template>
  <div>
    <van-tabbar fixed route v-model="active" @change="onChange">
      <van-tabbar-item
        v-for="(item, index) in props.data"
        :to="item.to"
        :name="item.name"
        :key="index"
        :icon="item.icon"
        >{{ item.title }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'TabBar'
}
</script>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

console.log(props.data, 'props.data')

const emit = defineEmits(['chang'])

const active = ref('home')

const onChange = (value) => {
  // console.log(value,'value');
  emit('chang', value)
}
</script>

<style lang="less" scoped></style>
