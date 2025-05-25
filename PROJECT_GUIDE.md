# Astro Vue 博客项目

🚀 使用 Astro + Vue.js + Tailwind CSS 构建的现代博客系统

## ✨ 特性

- 🎯 **Astro 静态生成** - 优异的性能和 SEO
- 💚 **Vue.js 组件** - 响应式交互组件
- 🎨 **Tailwind CSS** - 实用优先的样式框架
- 📝 **MDX 支持** - 在 Markdown 中使用组件
- 🧩 **组件库** - 丰富的可复用 UI 组件
- 📱 **响应式设计** - 适配所有设备
- ⚡ **快速加载** - 零 JavaScript 起步
- 🎯 **组件优先级系统** - 文章级组件优先于全局组件
- 📦 **模块化架构** - 每篇文章都是独立模块

## 📁 项目结构

```
src/
├── pages/                     # 页面路由
│   ├── index.astro           # 首页
│   ├── blog/                 # 博客相关页面
│   │   ├── index.astro       # 博客列表页
│   │   ├── [slug].astro      # 博客详情页（动态路由）
│   │   └── posts/            # 博客文章 (MDX)
│   │       ├── welcome.mdx
│   │       └── astro-vue-guide.mdx
│   └── components/           # 组件展示页面
│       └── index.astro       # 组件库展示
├── components/               # 组件库
│   ├── blog/                 # 博客相关组件
│   │   └── BlogCard.astro
│   ├── ui/                   # UI 组件
│   │   ├── Alert.astro
│   │   ├── CodeBlock.astro
│   │   └── Tabs.vue
│   ├── layout/               # 布局组件
│   │   ├── Navigation.astro
│   │   └── BlogLayout.astro
│   ├── common/               # 通用组件
│   └── VueCounter.vue        # Vue 示例组件
├── layouts/                  # 页面布局
│   └── Layout.astro
├── styles/                   # 样式文件
│   └── global.css           # 全局样式（Tailwind）
└── utils/                    # 工具函数
    └── blog.js              # 博客相关工具
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:4321](http://localhost:4321)

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 创建新文章

```bash
npm run new-post "我的新文章"
```

### 组件优先级检查

```bash
# 列出文章的所有组件
npm run check-components list welcome

# 检查组件名称冲突
npm run check-components conflicts astro-vue-guide

# 显示组件优先级映射
npm run check-components priority welcome

# 扫描所有文章的组件状态
npm run check-components scan
```

## 📝 写作指南

### 创建新文章

1. 在 `src/pages/blog/posts/` 目录下创建新的 `.mdx` 文件
2. 添加必要的 frontmatter：

```mdx
---
title: "文章标题"
description: "文章描述"
date: "2025-05-25"
tags: ["标签1", "标签2"]
author: "作者"
image: "/images/cover.jpg"  # 可选
---

# 文章内容

这里是文章的正文内容...
```

### 在文章中使用组件

```mdx
import Alert from '../../components/ui/Alert.astro';
import VueCounter from '../../components/VueCounter.vue';

<Alert type="info" title="提示">
  这是一个信息提示框
</Alert>

<VueCounter client:load title="计数器" />
```

## 🧩 组件使用

### UI 组件

#### Alert 提示框

```astro
<Alert type="info|success|warning|error" title="标题" dismissible>
  提示内容
</Alert>
```

#### CodeBlock 代码块

```astro
<CodeBlock language="javascript" title="示例代码">
  console.log('Hello World');
</CodeBlock>
```

### Vue 组件

在 Vue 组件中需要使用客户端指令：

```astro
<VueCounter client:load title="标题" message="描述" />
```

可用的客户端指令：
- `client:load` - 立即加载
- `client:idle` - 浏览器空闲时加载
- `client:visible` - 进入视口时加载

## 🎨 自定义样式

### Tailwind CSS

项目使用 Tailwind CSS，您可以直接在组件中使用 Tailwind 类名：

```astro
<div class="bg-blue-500 text-white p-4 rounded-lg">
  蓝色背景的卡片
</div>
```

### 自定义 CSS

在 `src/styles/global.css` 中添加全局样式：

```css
/* 自定义样式 */
.custom-class {
  /* 您的样式 */
}
```

## 📋 可用页面

- `/` - 首页
- `/blog` - 博客列表页
- `/blog/[slug]` - 博客文章详情页
- `/components` - 组件库展示页

## 🔧 配置文件

### astro.config.mjs

```js
export default defineConfig({
  integrations: [mdx(), vue()],
  vite: {
    plugins: [tailwindcss()]
  }
});
```

### package.json 脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产版本

## 🛠️ 技术栈

- **[Astro](https://astro.build/)** - 静态站点生成器
- **[Vue.js](https://vuejs.org/)** - 响应式框架
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS 框架
- **[MDX](https://mdxjs.com/)** - Markdown + JSX

## 📚 学习资源

- [Astro 文档](https://docs.astro.build/)
- [Vue.js 文档](https://cn.vuejs.org/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [MDX 文档](https://mdxjs.com/docs/)

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

## 📄 许可证

MIT License
