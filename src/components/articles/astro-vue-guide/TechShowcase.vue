<template>
  <div class="tech-showcase bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-6 text-white">
    <h3 class="text-xl font-bold mb-4">🚀 技术栈展示</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div 
        v-for="tech in techStack" 
        :key="tech.name"
        class="tech-card bg-white/10 backdrop-blur rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors"
        @click="selectTech(tech)"
      >
        <div class="text-2xl mb-2">{{ tech.icon }}</div>
        <div class="font-semibold">{{ tech.name }}</div>
        <div class="text-sm opacity-80">{{ tech.version }}</div>
      </div>
    </div>
    
    <div v-if="selectedTech" class="selected-tech bg-white/10 rounded-lg p-4">
      <h4 class="font-bold mb-2">{{ selectedTech.icon }} {{ selectedTech.name }}</h4>
      <p class="text-sm opacity-90 mb-3">{{ selectedTech.description }}</p>
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="feature in selectedTech.features" 
          :key="feature"
          class="bg-white/20 px-2 py-1 rounded text-xs"
        >
          {{ feature }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedTech = ref(null)

const techStack = ref([
  {
    name: 'Astro',
    version: 'v5.8.0',
    icon: '🚀',
    description: '现代静态站点生成器，专注于性能和开发体验。',
    features: ['零配置', '岛屿架构', '多框架支持', '静态优先']
  },
  {
    name: 'Vue.js',
    version: 'v3.5.14',
    icon: '💚',
    description: '渐进式 JavaScript 框架，易学易用，功能强大。',
    features: ['响应式', '组合式API', '单文件组件', '生态丰富']
  },
  {
    name: 'Tailwind',
    version: 'v4.1.7',
    icon: '🎨',
    description: '实用优先的 CSS 框架，快速构建现代界面。',
    features: ['原子化CSS', '响应式', '深色模式', '自定义性强']
  }
])

const selectTech = (tech) => {
  selectedTech.value = selectedTech.value?.name === tech.name ? null : tech
}

// 默认选择第一个
selectedTech.value = techStack.value[0]
</script>

<style scoped>
.tech-card {
  transition: all 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-2px);
}

.selected-tech {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
