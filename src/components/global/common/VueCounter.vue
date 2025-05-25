<template>
  <div class="bg-gradient-to-r from-purple-400 to-pink-400 p-6 rounded-lg text-white">
    <h3 class="text-xl font-bold mb-2">{{ title }}</h3>
    <p class="mb-4">{{ message }}</p>
    <button 
      @click="count++" 
      class="bg-white text-purple-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition-colors"
    >
      点击次数: {{ count }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'Vue 组件示例'
  },
  message: {
    type: String,
    default: '这是一个在 MDX 中使用的 Vue 组件！'
  }
})

const count = ref(0)
</script>
