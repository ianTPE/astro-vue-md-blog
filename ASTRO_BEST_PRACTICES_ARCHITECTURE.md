# 🏗️ Astro 最佳实践架构指南

> **重要原则**: 根据 Astro 的最佳实践，`pages` 目录应该**只包含页面文件**，组件应该统一放在 `components` 目录中。

## 📁 目录结构概览

```
src/
├── components/                    # 🧩 所有组件的统一位置
│   ├── global/                    # 🌐 全局组件 (最低优先级)
│   │   ├── ui/                    # 通用 UI 组件
│   │   │   ├── Alert.astro
│   │   │   ├── CodeBlock.astro
│   │   │   ├── Tabs.vue
│   │   │   └── index.js
│   │   ├── layout/                # 布局组件
│   │   │   ├── BlogLayout.astro
│   │   │   ├── Navigation.astro
│   │   │   └── index.js
│   │   └── common/                # 通用功能组件
│   │       ├── VueCounter.vue
│   │       └── index.js
│   ├── local/                     # 📝 页面级组件 (中等优先级)
│   │   ├── blog/                  # 博客页面专用组件
│   │   │   ├── BlogCard.astro
│   │   │   └── index.js
│   │   ├── home/                  # 首页专用组件
│   │   └── components-page/       # 组件展示页专用组件
│   └── articles/                  # 📍 文章级组件 (最高优先级)
│       ├── welcome/               # welcome 文章的专用组件
│       │   ├── Alert.astro        # 覆盖全局 Alert 组件
│       │   ├── WelcomeFeatureCard.astro
│       │   └── WelcomeStats.vue
│       └── astro-vue-guide/       # astro-vue-guide 文章的专用组件
│           ├── CodeBlock.astro    # 增强版 CodeBlock 组件
│           ├── CodeComparison.astro
│           └── TechShowcase.vue
├── pages/                         # 📄 纯页面文件 (符合 Astro 规范)
│   ├── blog/
│   │   ├── index.astro            # 博客列表页
│   │   ├── [slug].astro           # 博客详情页 (动态路由)
│   │   └── posts/                 # 📝 文章内容
│   │       ├── welcome/
│   │       │   └── content.mdx    # 只包含文章内容，无组件
│   │       └── astro-vue-guide/
│   │           └── content.mdx    # 只包含文章内容，无组件
│   ├── components/
│   │   └── index.astro            # 组件展示页
│   ├── index.astro                # 首页
│   └── example.mdx                # 示例 MDX 页面
├── layouts/                       # 🎨 页面布局模板
│   └── Layout.astro               # 基础布局
├── styles/                        # 🎨 全局样式
│   └── global.css
├── utils/                         # 🔧 工具函数
│   ├── blog.js                    # 博客相关工具
│   ├── componentResolver.js       # 组件解析器
│   └── autoImports.js            # 自动导入配置
└── assets/                        # 📦 静态资源
    ├── astro.svg
    └── background.svg
```

## 🎯 核心设计原则

### 1. 页面 vs 组件分离
- **Pages**: 只包含路由页面，负责页面逻辑和布局
- **Components**: 包含所有可复用的组件，按功能和优先级分层

### 2. 组件优先级系统
```
📍 Article-level   (最高优先级) → components/articles/{article-name}/
📝 Page-level      (中等优先级) → components/local/{page-name}/
🌐 Global          (最低优先级) → components/global/{category}/
```

### 3. 导入路径规范
```javascript
// ✅ 正确: 从 components 目录导入
import Alert from '../../../components/articles/welcome/Alert.astro';
import CodeBlock from '../../../components/global/ui/CodeBlock.astro';

// ❌ 错误: 从 pages 目录导入组件 (违反 Astro 规范)
import Alert from './components/Alert.astro';
```

## 📝 文章组件开发流程

### 1. 创建文章专用组件

```bash
# 为新文章 "my-new-post" 创建组件目录
mkdir -p src/components/articles/my-new-post
```

### 2. 开发专用组件

```astro
<!-- src/components/articles/my-new-post/CustomComponent.astro -->
---
// 文章专用组件逻辑
export interface Props {
  title: string;
}

const { title } = Astro.props;
---

<div class="custom-article-component">
  <h3>{title}</h3>
  <slot />
</div>
```

### 3. 在文章中使用

```mdx
<!-- src/pages/blog/posts/my-new-post/content.mdx -->
---
title: "我的新文章"
---

import CustomComponent from '../../../../components/articles/my-new-post/CustomComponent.astro';

# 我的新文章

<CustomComponent title="自定义组件">
  这是文章专用的组件内容
</CustomComponent>
```

## 🔧 组件解析机制

### 自动解析逻辑
1. 检查 `components/articles/{slug}/` 目录 (文章级)
2. 回退到 `components/local/{page}/` 目录 (页面级)  
3. 最终回退到 `components/global/{category}/` 目录 (全局)

### 优先级演示
```javascript
// 在 welcome 文章中
import Alert from '../../../../components/articles/welcome/Alert.astro';     // ✅ 使用文章级 Alert

// 在其他文章中  
import Alert from '../../../../components/global/ui/Alert.astro';           // ✅ 使用全局 Alert
```

## 🚀 性能优化

### 1. 按需加载
```astro
<!-- 交互组件使用客户端指令 -->
<VueComponent client:load />      <!-- 立即加载 -->
<VueComponent client:idle />      <!-- 空闲时加载 -->
<VueComponent client:visible />   <!-- 可见时加载 -->
```

### 2. 静态优先
- 优先使用 Astro 组件 (编译时渲染)
- 只有需要交互时才使用 Vue 组件
- 合理使用客户端指令

## 📦 组件开发规范

### 1. Astro 组件
```astro
---
// 类型定义
export interface Props {
  title: string;
  type?: 'info' | 'warning' | 'error';
}

const { title, type = 'info' } = Astro.props;
---

<div class={`alert alert-${type}`}>
  <h3>{title}</h3>
  <slot />
</div>

<style>
.alert {
  @apply p-4 rounded-lg border;
}
.alert-info {
  @apply bg-blue-50 border-blue-200 text-blue-800;
}
</style>
```

### 2. Vue 组件
```vue
<template>
  <div class="vue-component">
    <h3>{{ title }}</h3>
    <button @click="increment">点击: {{ count }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: String
})

const count = ref(0)
const increment = () => count.value++
</script>

<style scoped>
.vue-component {
  @apply p-4 bg-green-50 rounded;
}
</style>
```

## 🎨 样式规范

### 1. 使用 Tailwind CSS
- 优先使用 Tailwind 实用类
- 复杂样式使用 `@apply` 指令
- 组件样式使用 scoped 或 CSS modules

### 2. 响应式设计
```css
/* 移动优先的响应式设计 */
.component {
  @apply text-sm md:text-base lg:text-lg;
  @apply p-2 md:p-4 lg:p-6;
}
```

## 🔍 调试和开发

### 1. 组件解析调试
- 检查导入路径是否正确
- 验证组件优先级是否符合预期
- 使用浏览器开发工具检查组件渲染

### 2. 性能监控
- 使用 Astro DevTools
- 监控包大小和加载时间
- 优化客户端 JavaScript

## 📋 最佳实践清单

### ✅ 应该做的
- [ ] 组件统一放在 `components` 目录
- [ ] 页面只包含路由逻辑，不包含组件定义
- [ ] 使用明确的组件优先级系统
- [ ] 合理使用客户端指令
- [ ] 保持导入路径的一致性

### ❌ 不应该做的
- [ ] 在 `pages` 目录中放置组件文件
- [ ] 过度使用客户端 JavaScript
- [ ] 忽略组件优先级规则
- [ ] 使用相对路径导入组件

## 🚀 扩展指南

### 添加新的文章类型
1. 在 `components/articles/` 下创建新目录
2. 开发专用组件
3. 在文章中导入和使用

### 添加新的页面类型  
1. 在 `pages/` 下创建新页面
2. 在 `components/local/` 下创建页面专用组件
3. 在页面中使用组件

这个架构确保了代码的可维护性、性能优化和符合 Astro 的最佳实践！
