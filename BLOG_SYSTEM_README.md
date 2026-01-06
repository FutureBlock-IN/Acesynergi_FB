# Blog System Documentation

## Overview
A static blog system without database, where admin can create blogs via a secret admin route. Blogs are stored in a JSON file and displayed on public pages.

## File Structure

### Blog Storage
- **Location**: `client/src/data/blogs.json`
- **Format**: JSON array of blog objects
- **Updated by**: Admin panel via API endpoint

### Blog Data Types
- **Location**: `client/src/lib/blogData.ts`
- **Exports**: `BlogPost` interface, helper functions

### Pages
- **Blog List**: `client/src/pages/BlogList.tsx` - Displays all blogs with category filtering
- **Blog Detail**: `client/src/pages/BlogDetail.tsx` - Individual blog post page
- **Blog Admin**: `client/src/pages/BlogAdmin.tsx` - Admin form for creating blogs

### API Endpoint
- **Location**: `server/routes.ts`
- **Route**: `POST /api/blogs`
- **Function**: Saves new blog to `blogs.json` file

## Admin Access

### Admin URL
```
/blogs/admin/acesynergi-admin-2024
```

**Note**: The secret key can be changed via environment variable:
- Set `VITE_BLOG_ADMIN_SECRET` in your `.env` file
- Default: `acesynergi-admin-2024`

### Admin Features
- Create new blog posts
- Auto-generates slug from title
- Auto-sets author to "Acesynergi"
- Auto-sets publish date to current date/time
- Auto-assigns default cover image
- Supports Markdown formatting in content

## Public Routes

### Blog List
- **URL**: `/blogs` or `/blog`
- **Features**: 
  - Grid layout of blog cards
  - Category filtering
  - Shows title, category, author, date, preview

### Blog Detail
- **URL**: `/blogs/:slug`
- **Example**: `/blogs/project-management-training-pmp`
- **Features**:
  - Full blog content
  - Markdown rendering
  - Back to blog list link

## Blog Post Structure

Each blog post in `blogs.json` has:
```json
{
  "id": "unique-id",
  "title": "Blog Title",
  "category": "PMP | CBAP | CAPM | PMI-ACP | PMI PBA | ECBA | CCBA | General",
  "content": "Markdown or rich text content",
  "author": "Acesynergi",
  "publishDate": "2024-01-15T00:00:00Z",
  "coverImage": "https://...",
  "slug": "url-friendly-slug"
}
```

## How to Add a Blog (Admin)

1. Navigate to `/blogs/admin/acesynergi-admin-2024`
2. Fill in the form:
   - **Title**: Blog post title
   - **Category**: Select from dropdown
   - **Content**: Markdown supported
3. Click "Create Blog Post"
4. Blog is saved to `blogs.json` and you're redirected to the new blog

## Security Notes

- Admin route is protected by secret key in URL
- No authentication system (as per requirements)
- Secret key should be kept private
- Admin route is not linked anywhere publicly

## Markdown Support

The blog system supports basic Markdown:
- Headers (`#`, `##`, `###`)
- Bold (`**text**`)
- Lists (`- item`)
- Paragraphs

## Default Cover Image

All blogs use a default cover image unless specified:
```
https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop&q=80
```

## Build & Deployment

The blog system works with:
- ✅ Local development (`npm run dev`)
- ✅ Production build (`npm run build`)
- ✅ Static file serving (blogs.json is bundled)

No database or external services required!

