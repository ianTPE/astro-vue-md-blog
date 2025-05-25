<template>
  <div class="tabs">
    <!-- 标签头部 -->
    <div class="tab-header flex border-b border-gray-200">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
        :class="[
          'px-4 py-2 font-medium text-sm transition-colors',
          activeTab === index
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        ]"
      >
        {{ tab.title }}
      </button>
    </div>

    <!-- 标签内容 -->
    <div class="tab-content mt-4">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        v-show="activeTab === index"
        class="tab-panel"
      >
        <div v-html="tab.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const activeTab = ref(0)
const tabs = ref([])

onMounted(() => {
  // 从插槽中提取标签数据
  const tabElements = document.querySelectorAll('[slot^="tab-"]')
  const panelElements = document.querySelectorAll('[slot^="panel-"]')
  
  tabs.value = Array.from(tabElements).map((tab, index) => ({
    title: tab.textContent,
    content: panelElements[index]?.innerHTML || ''
  }))
})
</script>

<style scoped>
.tab-panel {
  animation: fadeIn 0.3s ease-in-out;
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
