// Blog data storage - static JSON file
// This file is updated by the admin panel when new blogs are added

export interface BlogPost {
  id: string;
  title: string;
  category: 'PMP' | 'CBAP' | 'CAPM' | 'PMI-ACP' | 'PMI PBA' | 'ECBA' | 'CCBA' | 'General';
  content: string; // Rich text or markdown
  author: string;
  publishDate: string; // ISO date string
  coverImage: string; // URL or path to image
  slug: string; // URL-friendly version of title
}

// localStorage key for storing blogs
const BLOGS_STORAGE_KEY = 'acesynergi_blog_admin_blogs';

// Helper function to load blogs from localStorage
function loadBlogsFromStorage(): BlogPost[] {
  try {
    const stored = localStorage.getItem(BLOGS_STORAGE_KEY);
    if (stored) {
      const blogs = JSON.parse(stored);
      if (Array.isArray(blogs)) {
        return blogs;
      }
    }
  } catch (error) {
    console.error('[BlogData] Error loading from localStorage:', error);
  }
  return [];
}

// Helper function to save blogs to localStorage (exported for admin use)
export function saveBlogsToStorage(blogs: BlogPost[]): void {
  try {
    localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(blogs));
    console.log('[BlogData] Saved blogs to localStorage:', blogs.length);
  } catch (error) {
    console.error('[BlogData] Error saving to localStorage:', error);
  }
}

// Shared function to get all blogs (checks localStorage first, then JSON file)
// This ensures both admin panel and public blog pages show the same data
export function getAllBlogsFromSource(jsonBlogs: BlogPost[]): BlogPost[] {
  try {
    // Load from localStorage (admin edits take precedence)
    const storedBlogs = loadBlogsFromStorage();
    
    // Merge: use stored blogs if they exist, otherwise use JSON blogs
    const allBlogs = storedBlogs.length > 0 ? storedBlogs : jsonBlogs;
    
    // Sort by publish date (newest first)
    return allBlogs.sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  } catch (error) {
    console.error('[BlogData] Error loading blogs:', error);
    return jsonBlogs;
  }
}

// Default cover image for all blogs
export const DEFAULT_COVER_IMAGE = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop&q=80';

// Import blogs from JSON file (this will be bundled at build time)
import blogsData from '@/data/blogs.json';

// Type assertion for imported JSON
const blogPosts: BlogPost[] = blogsData as BlogPost[];

// Helper function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Get blog by slug
export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(blog => blog.slug === slug);
}

// Get all blogs
export function getAllBlogs(): BlogPost[] {
  return blogPosts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

// Get blogs by category
export function getBlogsByCategory(category: BlogPost['category']): BlogPost[] {
  return blogPosts.filter(blog => blog.category === category);
}
