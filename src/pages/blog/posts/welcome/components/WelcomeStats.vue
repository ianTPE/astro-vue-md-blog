<template>
  <div class="welcome-stats bg-white rounded-lg shadow-sm border p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">🎯 博客统计</h3>
    
    <div class="grid grid-cols-2 gap-4">
      <div class="text-center p-4 bg-blue-50 rounded-lg">
        <div class="text-2xl font-bold text-blue-600">{{ articlesCount }}</div>
        <div class="text-sm text-blue-500">文章数量</div>
      </div>
      
      <div class="text-center p-4 bg-green-50 rounded-lg">
        <div class="text-2xl font-bold text-green-600">{{ componentsCount }}</div>
        <div class="text-sm text-green-500">组件数量</div>
      </div>
      
      <div class="text-center p-4 bg-purple-50 rounded-lg">
        <div class="text-2xl font-bold text-purple-600">{{ visitCount }}</div>
        <div class="text-sm text-purple-500">访问次数</div>
      </div>
      
      <div class="text-center p-4 bg-yellow-50 rounded-lg">
        <div class="text-2xl font-bold text-yellow-600">{{ daysOnline }}</div>
        <div class="text-sm text-yellow-500">在线天数</div>
      </div>
    </div>
    
    <div class="mt-4 text-center">
      <button 
        @click="refreshStats" 
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        🔄 刷新统计
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const articlesCount = ref(2)
const componentsCount = ref(15)
const visitCount = ref(128)
const daysOnline = ref(5)

const refreshStats = () => {
  // 模拟数据刷新
  visitCount.value += Math.floor(Math.random() * 10) + 1
  
  // 添加一个小动画效果
  const element = document.querySelector('.welcome-stats')
  element.style.transform = 'scale(0.98)'
  setTimeout(() => {
    element.style.transform = 'scale(1)'
  }, 150)
}

onMounted(() => {
  // 模拟页面访问计数
  visitCount.value++
})
</script>

<style scoped>
.welcome-stats {
  transition: transform 0.15s ease;
}
</style>
