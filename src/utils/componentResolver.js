// 组件优先级解析器
// 实现 Article-level > Page-level > Global 的优先级

import fs from 'fs';
import path from 'path';

/**
 * 组件解析优先级：
 * 1. Article-level: posts/{slug}/components/
 * 2. Page-level: components/local/blog/
 * 3. Global: components/global/ui/, components/global/common/, components/global/layout/
 */

export class ComponentResolver {
  constructor(articleSlug) {
    this.articleSlug = articleSlug;
    this.basePath = process.cwd();
  }

  /**
   * 解析组件路径，按优先级查找
   */
  resolveComponent(componentName) {
    const possiblePaths = this.getComponentPaths(componentName);
    
    for (const componentPath of possiblePaths) {
      if (fs.existsSync(componentPath.fullPath)) {
        return {
          path: componentPath.importPath,
          level: componentPath.level,
          fullPath: componentPath.fullPath
        };
      }
    }
    
    return null;
  }

  /**
   * 获取所有可能的组件路径（按优先级排序）
   */
  getComponentPaths(componentName) {
    const extensions = ['.astro', '.vue', '.jsx', '.tsx'];
    const paths = [];

    // 1. Article-level 组件 (最高优先级)
    if (this.articleSlug) {
      const articleComponentsDir = path.join(
        this.basePath, 
        'src/pages/blog/posts', 
        this.articleSlug, 
        'components'
      );
      
      for (const ext of extensions) {
        const fileName = `${componentName}${ext}`;
        const fullPath = path.join(articleComponentsDir, fileName);
        const importPath = `./components/${fileName}`;
        
        paths.push({
          fullPath,
          importPath,
          level: 'article',
          priority: 1
        });
      }
    }

    // 2. Page-level 组件 (中等优先级)
    const pageComponentDirs = [
      'src/components/local/blog',
      'src/components/local/home',
      'src/components/local/components-page'
    ];

    for (const dir of pageComponentDirs) {
      for (const ext of extensions) {
        const fileName = `${componentName}${ext}`;
        const fullPath = path.join(this.basePath, dir, fileName);
        const importPath = this.getRelativeImportPath(dir, fileName);
        
        paths.push({
          fullPath,
          importPath,
          level: 'page',
          priority: 2
        });
      }
    }

    // 3. Global 组件 (最低优先级)
    const globalComponentDirs = [
      'src/components/global/ui',
      'src/components/global/common',
      'src/components/global/layout'
    ];

    for (const dir of globalComponentDirs) {
      for (const ext of extensions) {
        const fileName = `${componentName}${ext}`;
        const fullPath = path.join(this.basePath, dir, fileName);
        const importPath = this.getRelativeImportPath(dir, fileName);
        
        paths.push({
          fullPath,
          importPath,
          level: 'global',
          priority: 3
        });
      }
    }

    return paths.sort((a, b) => a.priority - b.priority);
  }

  /**
   * 获取相对导入路径
   */
  getRelativeImportPath(dir, fileName) {
    // 从文章位置计算相对路径
    const articlePath = `src/pages/blog/posts/${this.articleSlug}`;
    const targetPath = path.join(dir, fileName);
    
    // 计算相对路径深度
    const articleDepth = articlePath.split('/').length;
    const upLevels = '../'.repeat(articleDepth);
    
    return `${upLevels}${targetPath}`;
  }

  /**
   * 获取所有可用组件的列表
   */
  getAvailableComponents() {
    const components = new Map();

    // 扫描所有可能的组件目录
    const scanDirs = [
      // Article-level
      ...(this.articleSlug ? [
        path.join(this.basePath, 'src/pages/blog/posts', this.articleSlug, 'components')
      ] : []),
      // Page-level
      path.join(this.basePath, 'src/components/local/blog'),
      // Global
      path.join(this.basePath, 'src/components/global/ui'),
      path.join(this.basePath, 'src/components/global/common'),
      path.join(this.basePath, 'src/components/global/layout')
    ];

    for (const dir of scanDirs) {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const match = file.match(/^(.+)\.(astro|vue|jsx|tsx)$/);
          if (match) {
            const componentName = match[1];
            const level = this.getComponentLevel(dir);
            
            if (!components.has(componentName) || 
                this.getPriorityByLevel(level) < this.getPriorityByLevel(components.get(componentName).level)) {
              components.set(componentName, {
                name: componentName,
                level,
                path: path.join(dir, file)
              });
            }
          }
        }
      }
    }

    return Array.from(components.values());
  }

  /**
   * 根据目录路径确定组件级别
   */
  getComponentLevel(dirPath) {
    if (dirPath.includes('/posts/') && dirPath.includes('/components')) {
      return 'article';
    } else if (dirPath.includes('/local/')) {
      return 'page';
    } else {
      return 'global';
    }
  }

  /**
   * 获取级别对应的优先级数字
   */
  getPriorityByLevel(level) {
    const priorities = {
      'article': 1,
      'page': 2,
      'global': 3
    };
    return priorities[level] || 999;
  }
}

/**
 * 生成自动导入语句
 */
export function generateAutoImports(articleSlug) {
  const resolver = new ComponentResolver(articleSlug);
  const components = resolver.getAvailableComponents();
  
  const imports = components.map(component => {
    const resolved = resolver.resolveComponent(component.name);
    return {
      name: component.name,
      path: resolved.path,
      level: resolved.level,
      statement: `import ${component.name} from '${resolved.path}';`
    };
  });

  return imports;
}

export default ComponentResolver;
