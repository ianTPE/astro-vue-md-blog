# 组件架构说明

本项目采用了 **Global Components** 和 **Local Components** 分离的架构模式，便于组件的管理和复用。

## 📁 目录结构

```
src/components/
├── global/                    # 🌐 全局组件 (整个应用可复用)
│   ├── ui/                   # 基础 UI 组件
│   │   ├── Alert.astro       # 提示框组件
│   │   ├── CodeBlock.astro   # 代码块组件
│   │   ├── Tabs.vue          # 标签页组件
│   │   └── index.js          # 导出索引
│   ├── layout/               # 布局组件
│   │   ├── Navigation.astro  # 导航组件
│   │   ├── BlogLayout.astro  # 博客布局
│   │   └── index.js          # 导出索引
│   └── common/               # 通用功能组件
│       ├── VueCounter.vue    # 计数器示例
│       └── index.js          # 导出索引
└── local/                     # 📍 本地组件 (特定功能/页面)
    ├── blog/                 # 博客相关组件
    │   ├── BlogCard.astro    # 博客卡片
    │   └── index.js          # 导出索引
    ├── home/                 # 首页组件 (待扩展)
    └── components-page/      # 组件展示页组件 (待扩展)
```

## 🎯 设计原则

### Global Components (全局组件)
- **用途**: 整个应用中都可能使用的组件
- **特点**: 
  - 高度可复用
  - 功能独立
  - API 稳定
  - 样式一致
- **示例**: Button、Modal、Alert、Layout 等

### Local Components (本地组件)
- **用途**: 特定页面或功能模块的组件
- **特点**:
  - 业务相关
  - 特定场景使用
  - 可能依赖特定数据结构
  - 相对较少复用
- **示例**: BlogCard、UserProfile、ProductCard 等

## 📝 使用方法

### 方式一: 直接导入

```astro
---
// 全局组件
import Alert from '../components/global/ui/Alert.astro';
import Navigation from '../components/global/layout/Navigation.astro';

// 本地组件
import BlogCard from '../components/local/blog/BlogCard.astro';
---

<Alert type="info">这是一个提示</Alert>
<BlogCard title="文章标题" />
```

### 方式二: 通过索引文件导入 (推荐)

```astro
---
// 从索引文件导入多个组件
import { Alert, CodeBlock } from '../components/global/ui/index.js';
import { BlogCard } from '../components/local/blog/index.js';
---

<Alert type="success">成功提示</Alert>
<CodeBlock language="javascript">console.log('Hello');</CodeBlock>
<BlogCard title="我的文章" />
```

## 🧩 组件类型说明

### 1. 全局 UI 组件 (`global/ui/`)
这些是最基础的 UI 构建块，可以在任何地方使用：

- **Alert** - 各种类型的提示框
- **CodeBlock** - 带语法高亮的代码块
- **Tabs** - 标签页切换组件

### 2. 全局布局组件 (`global/layout/`)
这些组件定义了页面的整体结构：

- **Navigation** - 全站导航栏
- **BlogLayout** - 博客文章页面布局

### 3. 全局通用组件 (`global/common/`)
功能性的可复用组件：

- **VueCounter** - Vue.js 交互示例组件

### 4. 本地组件 (`local/`)
按功能模块组织的特定组件：

- **blog/** - 博客相关组件
  - **BlogCard** - 博客文章卡片

## 🔄 扩展指南

### 添加新的全局组件

1. 在 `global/ui/` 目录下创建组件
2. 在 `global/ui/index.js` 中添加导出
3. 在多个地方使用，确保可复用性

### 添加新的本地组件

1. 根据功能在 `local/` 下创建相应目录
2. 创建组件文件
3. 创建对应的 `index.js` 导出文件
4. 在特定页面或功能中使用

### 组件迁移

当本地组件变得足够通用时，可以考虑迁移到全局组件：

1. 重构组件，使其更加通用
2. 移动到 `global/` 相应目录
3. 更新导入路径
4. 添加到索引文件

## 💡 最佳实践

1. **明确组件职责**: 全局组件专注于通用性，本地组件专注于业务场景
2. **保持 API 一致性**: 同类型的全局组件应该有相似的 props 和用法
3. **使用索引文件**: 便于批量导入和管理
4. **文档化**: 为每个组件添加必要的 TypeScript 类型和注释
5. **测试覆盖**: 重要的全局组件应该有对应的测试

## 🚀 开发工作流

1. **设计阶段**: 确定组件是全局还是本地
2. **开发阶段**: 在对应目录下创建组件
3. **测试阶段**: 在页面中使用测试
4. **优化阶段**: 根据使用情况调整分类
5. **维护阶段**: 定期重构和优化组件

这种架构模式让项目结构更加清晰，组件管理更加高效，也便于团队协作和项目维护。
