<template>
  <div class="vue-example bg-white border rounded-lg shadow-sm p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ title }}</h3>
    
    <div class="interactive-content">
      <p class="text-gray-600 mb-4">{{ description }}</p>
      
      <div class="demo-section bg-gray-50 rounded p-4 mb-4">
        <h4 class="font-medium mb-2">交互演示：</h4>
        <div class="flex items-center space-x-4">
          <button 
            @click="increment" 
            class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
          >
            增加
          </button>
          <span class="font-mono text-lg">{{ count }}</span>
          <button 
            @click="decrement" 
            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
          >
            减少
          </button>
        </div>
      </div>
      
      <div class="slot-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props 定义
defineProps({
  title: {
    type: String,
    default: 'Vue 组件示例'
  },
  description: {
    type: String,
    default: '这是一个示例 Vue 组件，展示了基本的响应式功能。'
  }
})

// 响应式数据
const count = ref(0)

// 方法
const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}
</script>

<style scoped>
.vue-example {
  transition: all 0.3s ease;
}

.vue-example:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

button {
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.95);
}
</style>
