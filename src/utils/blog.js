// 博客工具函数

/**
 * 格式化日期
 */
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * 格式化相对时间
 */
export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return '今天';
  if (diffInDays === 1) return '昨天';
  if (diffInDays < 7) return `${diffInDays} 天前`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} 周前`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} 个月前`;
  return `${Math.floor(diffInDays / 365)} 年前`;
}

/**
 * 获取所有博客文章
 */
export async function getAllPosts() {
  const posts = await import.meta.glob('/src/pages/blog/posts/*.{md,mdx}');
  const postList = [];
  
  for (const path in posts) {
    const mod = await posts[path]();
    const slug = path.split('/').pop().replace(/\.(md|mdx)$/, '');
    postList.push({
      ...mod.frontmatter,
      slug,
      url: `/blog/${slug}`,
      content: mod.default
    });
  }
  
  return postList.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * 根据标签获取文章
 */
export async function getPostsByTag(tag) {
  const posts = await getAllPosts();
  return posts.filter(post => 
    post.tags && post.tags.includes(tag)
  );
}

/**
 * 获取所有标签
 */
export async function getAllTags() {
  const posts = await getAllPosts();
  const tagSet = new Set();
  
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tagSet.add(tag));
    }
  });
  
  return Array.from(tagSet).sort();
}

/**
 * 生成文章摘要
 */
export function generateExcerpt(content, maxLength = 150) {
  // 移除 Markdown 语法
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // 标题
    .replace(/\*\*(.*?)\*\*/g, '$1') // 粗体
    .replace(/\*(.*?)\*/g, '$1') // 斜体
    .replace(/`(.*?)`/g, '$1') // 行内代码
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 链接
    .replace(/```[\s\S]*?```/g, '') // 代码块
    .replace(/\n+/g, ' ') // 换行
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.substring(0, maxLength).trim() + '...';
}

/**
 * 计算阅读时间（基于中文）
 */
export function calculateReadingTime(content) {
  // 中文阅读速度大约每分钟 300-500 字，这里取 400
  const wordsPerMinute = 400;
  const wordCount = content.length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return readingTime;
}
