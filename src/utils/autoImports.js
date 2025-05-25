// 自动组件映射和导入生成器

import { ComponentResolver } from './componentResolver.js';
import fs from 'fs';
import path from 'path';

/**
 * 为指定文章生成组件映射
 */
export function generateComponentMap(articleSlug) {
  const resolver = new ComponentResolver(articleSlug);
  const components = resolver.getAvailableComponents();
  
  const componentMap = {
    article: [],
    page: [],
    global: []
  };

  // 按级别分组组件
  components.forEach(component => {
    componentMap[component.level].push({
      name: component.name,
      path: resolver.resolveComponent(component.name).path,
      priority: resolver.getPriorityByLevel(component.level)
    });
  });

  return componentMap;
}

/**
 * 生成自动导入代码
 */
export function generateAutoImportCode(articleSlug) {
  const resolver = new ComponentResolver(articleSlug);
  const components = resolver.getAvailableComponents();
  
  const imports = [];
  const exports = [];

  components.forEach(component => {
    const resolved = resolver.resolveComponent(component.name);
    if (resolved) {
      imports.push(`import ${component.name} from '${resolved.path}';`);
      exports.push(component.name);
    }
  });

  return {
    imports: imports.join('\n'),
    exports: `export { ${exports.join(', ')} };`,
    components: components.map(c => ({
      name: c.name,
      level: c.level,
      path: resolver.resolveComponent(c.name).path
    }))
  };
}

/**
 * 为文章创建组件索引文件
 */
export function createComponentIndex(articleSlug) {
  const articleDir = path.join(
    process.cwd(),
    'src/pages/blog/posts',
    articleSlug
  );

  if (!fs.existsSync(articleDir)) {
    throw new Error(`Article directory not found: ${articleDir}`);
  }

  const autoImport = generateAutoImportCode(articleSlug);
  
  const indexContent = `// 自动生成的组件索引文件
// 优先级: Article-level > Page-level > Global

${autoImport.imports}

// 组件列表 (按优先级排序)
const components = {
${autoImport.components.map(c => 
  `  ${c.name}: { component: ${c.name}, level: '${c.level}' }`
).join(',\n')}
};

// 导出所有组件
${autoImport.exports}

export default components;

/* 组件优先级说明:
${autoImport.components.map(c => 
  `- ${c.name}: ${c.level} (${c.path})`
).join('\n')}
*/
`;

  const indexPath = path.join(articleDir, 'componentIndex.js');
  fs.writeFileSync(indexPath, indexContent);
  
  return {
    path: indexPath,
    content: indexContent,
    components: autoImport.components
  };
}

/**
 * 检查组件冲突
 */
export function checkComponentConflicts(articleSlug) {
  const resolver = new ComponentResolver(articleSlug);
  const allPaths = resolver.getComponentPaths('*'); // 获取所有可能路径
  const conflicts = new Map();

  // 扫描所有组件目录
  const dirs = [
    path.join(process.cwd(), 'src/pages/blog/posts', articleSlug, 'components'),
    path.join(process.cwd(), 'src/components/local/blog'),
    path.join(process.cwd(), 'src/components/global/ui'),
    path.join(process.cwd(), 'src/components/global/common'),
    path.join(process.cwd(), 'src/components/global/layout')
  ];

  dirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const match = file.match(/^(.+)\.(astro|vue|jsx|tsx)$/);
        if (match) {
          const componentName = match[1];
          const level = resolver.getComponentLevel(dir);
          
          if (!conflicts.has(componentName)) {
            conflicts.set(componentName, []);
          }
          
          conflicts.get(componentName).push({
            level,
            path: path.join(dir, file),
            priority: resolver.getPriorityByLevel(level)
          });
        }
      });
    }
  });

  // 找出有冲突的组件（存在于多个级别）
  const conflictedComponents = Array.from(conflicts.entries())
    .filter(([name, locations]) => locations.length > 1)
    .map(([name, locations]) => ({
      name,
      locations: locations.sort((a, b) => a.priority - b.priority),
      winner: locations.sort((a, b) => a.priority - b.priority)[0]
    }));

  return conflictedComponents;
}

export default {
  generateComponentMap,
  generateAutoImportCode,
  createComponentIndex,
  checkComponentConflicts
};
