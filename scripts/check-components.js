#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { ComponentResolver } from '../src/utils/componentResolver.js';
import { checkComponentConflicts, generateComponentMap } from '../src/utils/autoImports.js';

const command = process.argv[2];
const articleSlug = process.argv[3];

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

function colorLog(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 显示帮助信息
function showHelp() {
  colorLog('cyan', '🧩 组件优先级管理工具');
  console.log('');
  colorLog('yellow', '使用方法:');
  console.log('  npm run check-components <command> [article-slug]');
  console.log('');
  colorLog('yellow', '可用命令:');
  console.log('  list [article-slug]    - 列出指定文章的所有可用组件');
  console.log('  conflicts [article-slug] - 检查组件名称冲突');
  console.log('  priority [article-slug]  - 显示组件优先级映射');
  console.log('  scan                     - 扫描所有文章的组件');
  console.log('  help                     - 显示此帮助信息');
  console.log('');
  colorLog('yellow', '示例:');
  console.log('  npm run check-components list welcome');
  console.log('  npm run check-components conflicts astro-vue-guide');
  console.log('  npm run check-components scan');
}

// 列出组件
function listComponents(slug) {
  if (!slug) {
    colorLog('red', '❌ 请提供文章 slug');
    return;
  }

  const resolver = new ComponentResolver(slug);
  const components = resolver.getAvailableComponents();

  colorLog('cyan', `📋 文章 "${slug}" 的可用组件:`);
  console.log('');

  if (components.length === 0) {
    colorLog('yellow', '🔍 未找到任何组件');
    return;
  }

  // 按优先级分组
  const grouped = {
    article: components.filter(c => c.level === 'article'),
    page: components.filter(c => c.level === 'page'),
    global: components.filter(c => c.level === 'global')
  };

  Object.entries(grouped).forEach(([level, comps]) => {
    if (comps.length > 0) {
      const icons = { article: '📍', page: '📝', global: '🌐' };
      const levelColors = { article: 'green', page: 'yellow', global: 'blue' };
      
      colorLog(levelColors[level], `${icons[level]} ${level.toUpperCase()} 组件:`);
      comps.forEach(comp => {
        console.log(`  • ${comp.name}`);
        console.log(`    ${colors.cyan}${comp.path}${colors.reset}`);
      });
      console.log('');
    }
  });
}

// 检查冲突
function checkConflicts(slug) {
  if (!slug) {
    colorLog('red', '❌ 请提供文章 slug');
    return;
  }

  const conflicts = checkComponentConflicts(slug);

  colorLog('cyan', `🔍 检查文章 "${slug}" 的组件冲突:`);
  console.log('');

  if (conflicts.length === 0) {
    colorLog('green', '✅ 未发现组件名称冲突');
    return;
  }

  colorLog('yellow', `⚠️  发现 ${conflicts.length} 个组件名称冲突:`);
  console.log('');

  conflicts.forEach(conflict => {
    colorLog('red', `❗ 组件名称: ${conflict.name}`);
    console.log('   优先级解析结果:');
    
    conflict.locations.forEach((location, index) => {
      const isWinner = index === 0;
      const prefix = isWinner ? '   👑' : '   💤';
      const color = isWinner ? 'green' : 'cyan';
      
      colorLog(color, `${prefix} ${location.level}: ${location.path}`);
    });
    console.log('');
  });
}

// 显示优先级映射
function showPriority(slug) {
  if (!slug) {
    colorLog('red', '❌ 请提供文章 slug');
    return;
  }

  const componentMap = generateComponentMap(slug);

  colorLog('cyan', `🎯 文章 "${slug}" 的组件优先级映射:`);
  console.log('');

  const levels = [
    { key: 'article', name: '📍 Article-level', color: 'green', priority: 1 },
    { key: 'page', name: '📝 Page-level', color: 'yellow', priority: 2 },
    { key: 'global', name: '🌐 Global', color: 'blue', priority: 3 }
  ];

  levels.forEach(level => {
    const components = componentMap[level.key];
    if (components.length > 0) {
      colorLog(level.color, `${level.name} (优先级: ${level.priority}):`);
      components.forEach(comp => {
        console.log(`  • ${comp.name}`);
        console.log(`    ${colors.cyan}${comp.path}${colors.reset}`);
      });
      console.log('');
    }
  });

  // 显示优先级规则
  colorLog('magenta', '📖 优先级规则:');
  console.log('  1. 如果同名组件存在于多个级别，优先级高的会覆盖优先级低的');
  console.log('  2. Article-level 组件仅在对应文章中生效');
  console.log('  3. Page-level 组件在相关页面中生效');
  console.log('  4. Global 组件在整个网站中生效');
}

// 扫描所有文章
function scanAllArticles() {
  const postsDir = path.join(process.cwd(), 'src/pages/blog/posts');
  
  if (!fs.existsSync(postsDir)) {
    colorLog('red', '❌ 博客文章目录不存在');
    return;
  }

  const articles = fs.readdirSync(postsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  colorLog('cyan', '🔍 扫描所有文章的组件:');
  console.log('');

  const allConflicts = [];

  articles.forEach(slug => {
    const resolver = new ComponentResolver(slug);
    const components = resolver.getAvailableComponents();
    const conflicts = checkComponentConflicts(slug);

    colorLog('blue', `📄 ${slug}:`);
    console.log(`   组件数量: ${components.length}`);
    console.log(`   冲突数量: ${conflicts.length}`);
    
    if (conflicts.length > 0) {
      allConflicts.push({ slug, conflicts });
      console.log(`   ${colors.red}⚠️  有冲突组件: ${conflicts.map(c => c.name).join(', ')}${colors.reset}`);
    }
    console.log('');
  });

  if (allConflicts.length > 0) {
    colorLog('yellow', `\n📊 冲突汇总: ${allConflicts.length} 篇文章存在组件冲突`);
    allConflicts.forEach(({ slug, conflicts }) => {
      console.log(`  ${slug}: ${conflicts.map(c => c.name).join(', ')}`);
    });
  } else {
    colorLog('green', '✅ 所有文章都没有组件冲突');
  }
}

// 主函数
function main() {
  switch (command) {
    case 'list':
      listComponents(articleSlug);
      break;
    case 'conflicts':
      checkConflicts(articleSlug);
      break;
    case 'priority':
      showPriority(articleSlug);
      break;
    case 'scan':
      scanAllArticles();
      break;
    case 'help':
    case undefined:
      showHelp();
      break;
    default:
      colorLog('red', `❌ 未知命令: ${command}`);
      showHelp();
  }
}

main();
