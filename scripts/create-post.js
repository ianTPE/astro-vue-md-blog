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
const targetDir = path.join(__dirname, '..', 'src', 'pages', 'blog', 'posts', slug);

// 检查目标目录是否已存在
if (fs.existsSync(targetDir)) {
  console.error(`❌ 文章 "${slug}" 已存在`);
  process.exit(1);
}

// 复制模板文件
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      let content = fs.readFileSync(srcPath, 'utf8');
      
      // 如果是 content.mdx，更新模板内容
      if (item === 'content.mdx') {
        const today = new Date().toISOString().split('T')[0];
        content = content
          .replace('title: "文章标题"', `title: "${articleName}"`)
          .replace('date: "2025-05-25"', `date: "${today}"`);
      }
      
      fs.writeFileSync(destPath, content);
    }
  }
}

try {
  copyDirectory(templateDir, targetDir);
  
  console.log('✅ 文章创建成功！');
  console.log(`📁 文章目录：${targetDir}`);
  console.log(`🌐 访问路径：http://localhost:4321/blog/${slug}`);
  console.log('');
  console.log('📝 下一步：');
  console.log(`1. 编辑文章：${path.join(targetDir, 'content.mdx')}`);
  console.log(`2. 添加组件：${path.join(targetDir, 'components')}`);
  console.log('3. 启动开发服务器：npm run dev');
  
} catch (error) {
  console.error('❌ 创建文章失败：', error.message);
  process.exit(1);
}
