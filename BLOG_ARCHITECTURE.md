# 📝 博客文章模块化架构

我们已经成功调整了博客的目录结构，实现了 **文章与组件共存** 的模块化架构！

## 🎯 新的目录结构

```
src/pages/blog/posts/
├── {slug}/                    # 每篇文章一个文件夹
│   ├── content.mdx           # 📄 文章内容
│   └── components/           # 🧩 文章专用的本地组件
│       ├── Component1.astro
│       ├── Component2.vue
│       └── ...
├── welcome/                  # 示例文章 1
│   ├── content.mdx
│   └── components/
│       ├── WelcomeFeatureCard.astro
│       └── WelcomeStats.vue
└── astro-vue-guide/         # 示例文章 2
    ├── content.mdx
    └── components/
        ├── CodeComparison.astro
        └── TechShowcase.vue
```

## ✨ 架构优势

### 1. **高度模块化**
- 每篇文章都是一个独立的模块
- 文章内容和相关组件紧密结合
- 便于维护和管理

### 2. **组件封装**
- 全局组件：整个网站复用 (`src/components/global/`)
- 本地组件：文章特定使用 (`posts/{slug}/components/`)
- 清晰的职责分离

### 3. **便于迁移**
- 整个文章文件夹可以独立迁移
- 包含所有相关资源和组件
- 自包含的模块设计

### 4. **协作友好**
- 每个作者可以独立开发自己的文章模块
- 不会影响其他文章
- 便于版本控制和 code review

## 🚀 文章访问路径

### URL 映射规则
```
文件夹结构                      → 访问路径
posts/welcome/                 → /blog/welcome
posts/astro-vue-guide/         → /blog/astro-vue-guide
posts/my-new-article/          → /blog/my-new-article
```

### 路由处理
动态路由 `[slug].astro` 会：
1. 扫描 `posts/*/content.mdx` 文件
2. 提取文件夹名作为 slug
3. 生成对应的路由路径

## 📝 如何创建新文章

### 1. 创建文章文件夹
```bash
mkdir src/pages/blog/posts/my-awesome-article
mkdir src/pages/blog/posts/my-awesome-article/components
```

### 2. 创建文章内容
```mdx
---
title: "我的精彩文章"
description: "文章描述"
date: "2025-05-25"
tags: ["标签1", "标签2"]
author: "作者"
---

import Alert from '../../../../components/global/ui/Alert.astro';
// 导入本文章的本地组件
import MyCustomComponent from './components/MyCustomComponent.astro';

# 文章标题

文章内容...

<Alert type="info">使用全局组件</Alert>

<MyCustomComponent />
```

### 3. 创建本地组件 (可选)
```astro
---
// my-awesome-article/components/MyCustomComponent.astro
---

<div class="custom-component">
  <h3>这是文章专用组件</h3>
  <slot />
</div>
```

## 🧩 组件使用指南

### 全局组件导入
```mdx
// 从全局组件库导入（整个网站复用）
import Alert from '../../../../components/global/ui/Alert.astro';
import CodeBlock from '../../../../components/global/ui/CodeBlock.astro';
import VueCounter from '../../../../components/global/common/VueCounter.vue';
```

### 本地组件导入
```mdx
// 从本文章的 components 目录导入（文章专用）
import WelcomeCard from './components/WelcomeCard.astro';
import InteractiveDemo from './components/InteractiveDemo.vue';
```

## 🎨 组件开发建议

### 全局组件 (Global Components)
**何时使用：**
- 多篇文章都可能用到
- 通用的 UI 组件（Button、Modal、Alert）
- 布局相关组件

**位置：** `src/components/global/`

### 本地组件 (Local Components)
**何时使用：**
- 特定文章的特殊需求
- 文章主题相关的展示组件
- 一次性的演示组件

**位置：** `posts/{slug}/components/`

## 📋 实际案例

### Welcome 文章组件
- **WelcomeFeatureCard.astro** - 特色功能卡片
- **WelcomeStats.vue** - 博客统计展示

### Astro Vue 指南文章组件
- **CodeComparison.astro** - 代码对比展示
- **TechShowcase.vue** - 技术栈交互展示

## 🔄 迁移指南

### 从旧结构迁移
如果您有旧的文章文件，可以这样迁移：

1. **创建新文件夹**
   ```bash
   mkdir posts/article-name
   mkdir posts/article-name/components
   ```

2. **移动文章**
   ```bash
   mv old-article.mdx posts/article-name/content.mdx
   ```

3. **更新导入路径**
   ```diff
   - import Alert from '../components/ui/Alert.astro';
   + import Alert from '../../../../components/global/ui/Alert.astro';
   ```

## 🎯 最佳实践

1. **命名规范**
   - 文件夹名使用 kebab-case：`my-awesome-article`
   - 组件名使用 PascalCase：`MyComponent.astro`

2. **组件设计**
   - 本地组件专注于特定文章需求
   - 保持组件的单一职责
   - 添加必要的 props 和 slots

3. **性能考虑**
   - Vue 组件使用适当的客户端指令
   - 避免不必要的 JavaScript 加载

4. **文档化**
   - 为复杂的本地组件添加注释
   - 在文章中解释组件的用途

## 🚀 未来扩展

这种架构为未来的扩展提供了良好的基础：

- **多媒体资源**：可以在文章文件夹中放置图片、视频等资源
- **样式文件**：每篇文章可以有自己的样式文件
- **数据文件**：文章可以有自己的数据文件（JSON、YAML 等）
- **测试文件**：为组件添加测试文件

这种设计让博客系统既保持了全局一致性，又具备了高度的灵活性和可扩展性！ 🎉
