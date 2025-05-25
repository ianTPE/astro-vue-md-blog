#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 获取命令行参数
const articleName = process.argv[2];

if (!articleName) {
  console.error('❌ 请提供文章名称');
  console.log('💡 使用方法：npm run new-post "my-awesome-article"');
  process.exit(1);
}

// 将文章名转换为 slug 格式
const slug = articleName
  .toLowerCase()
  .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
  .replace(/^-+|-+$/g, '');

const templateDir = path.join(__dirname, '..', 'templates', 'blog-post');
const articleContentDir = path.join(__dirname, '..', 'src', 'pages', 'blog', 'posts', slug);
const articleComponentsDir = path.join(__dirname, '..', 'src', 'components', 'articles', slug);

// 检查目标目录是否已存在
if (fs.existsSync(articleContentDir) || fs.existsSync(articleComponentsDir)) {
  console.error(`❌ 文章 "${slug}" 已存在`);
  process.exit(1);
}

// 复制文章内容
function createArticleContent() {
  // 创建文章内容目录
  fs.mkdirSync(articleContentDir, { recursive: true });
  
  // 复制并修改 content.mdx
  const templateContentPath = path.join(templateDir, 'content.mdx');
  const targetContentPath = path.join(articleContentDir, 'content.mdx');
  
  let content = fs.readFileSync(templateContentPath, 'utf8');
  const today = new Date().toISOString().split('T')[0];
  
  content = content
    .replace('title: "文章标题"', `title: "${articleName}"`)
    .replace('date: "2025-05-25"', `date: "${today}"`)
    .replace('my-article', slug);
  
  fs.writeFileSync(targetContentPath, content);
}

// 复制文章组件
function createArticleComponents() {
  // 创建文章组件目录
  fs.mkdirSync(articleComponentsDir, { recursive: true });
  
  // 复制示例组件
  const astroComponentSource = path.join(templateDir, 'ExampleComponent.astro');
  const vueComponentSource = path.join(templateDir, 'ExampleVueComponent.vue');
  
  const astroComponentTarget = path.join(articleComponentsDir, 'ExampleComponent.astro');
  const vueComponentTarget = path.join(articleComponentsDir, 'ExampleVueComponent.vue');
  
  if (fs.existsSync(astroComponentSource)) {
    fs.copyFileSync(astroComponentSource, astroComponentTarget);
  }
  
  if (fs.existsSync(vueComponentSource)) {
    fs.copyFileSync(vueComponentSource, vueComponentTarget);
  }
  
  // 创建组件索引文件
  const indexContent = `// ${articleName} 文章专用组件
// 优先级: Article-level > Page-level > Global

export { default as ExampleComponent } from './ExampleComponent.astro';
export { default as ExampleVueComponent } from './ExampleVueComponent.vue';

// 在文章中使用示例：
// import ExampleComponent from '../../../../components/articles/${slug}/ExampleComponent.astro';
// import ExampleVueComponent from '../../../../components/articles/${slug}/ExampleVueComponent.vue';
`;
  
  fs.writeFileSync(path.join(articleComponentsDir, 'index.js'), indexContent);
}

try {
  createArticleContent();
  createArticleComponents();
  
  console.log('✅ 文章创建成功！');
  console.log('');
  console.log('📁 创建的文件：');
  console.log(`   📄 内容文件：${articleContentDir}/content.mdx`);
  console.log(`   🧩 组件目录：${articleComponentsDir}/`);
  console.log('');
  console.log(`🌐 访问路径：http://localhost:4321/blog/${slug}`);
  console.log('');
  console.log('📝 下一步：');
  console.log(`1. 编辑文章内容：${path.join(articleContentDir, 'content.mdx')}`);
  console.log(`2. 自定义组件：${articleComponentsDir}/`);
  console.log('3. 启动开发服务器：npm run dev');
  console.log('');
  console.log('🎯 组件优先级：');
  console.log(`   📍 文章级: src/components/articles/${slug}/`);
  console.log('   📝 页面级: src/components/local/blog/');
  console.log('   🌐 全局级: src/components/global/ui/');
  
} catch (error) {
  console.error('❌ 创建文章失败：', error.message);
  process.exit(1);
}
