import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { BlogPost, getAllBlogsFromSource } from '@/lib/blogData';
import blogsData from '@/data/blogs.json';

export default function BlogDetail() {
  const [, params] = useRoute('/blogs/:slug');
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (params?.slug) {
      // Load blogs using shared function (checks localStorage first, then JSON)
      // This ensures consistency with admin panel
      const jsonBlogs = Array.isArray(blogsData) ? (blogsData as BlogPost[]) : [];
      const allBlogs = getAllBlogsFromSource(jsonBlogs);
      const foundBlog = allBlogs.find(b => b.slug === params.slug);
      if (foundBlog) {
        setBlog(foundBlog);
      } else {
        setNotFound(true);
      }
    }
  }, [params?.slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Simple markdown to HTML converter (basic support)
  const renderContent = (content: string) => {
    // Convert markdown headers
    let html = content
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-foreground mb-4 mt-6">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold text-foreground mb-4 mt-8">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-foreground mb-6 mt-8">$1</h1>')
      // Convert bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold">$1</strong>')
      // Convert lists
      .replace(/^- (.*$)/gim, '<li class="ml-6 mb-2">$1</li>')
      // Convert paragraphs
      .split('\n\n')
      .map(para => {
        if (para.trim().startsWith('<')) return para; // Already HTML
        if (para.trim().startsWith('-')) return `<ul class="list-disc space-y-2 mb-4">${para}</ul>`;
        return `<p class="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-4">${para}</p>`;
      })
      .join('');

    return { __html: html };
  };

  if (notFound || !blog) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <section className="flex-1 py-16 md:py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Blog Post Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link href="/blogs">
              <span className="text-primary hover:underline font-semibold">
                ← Back to Blog
              </span>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Banner with Cover Image */}
      <section className="relative mt-20">
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
              <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {blog.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {blog.title}
              </h1>
              <div className="flex items-center gap-6 text-white/90 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(blog.publishDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="flex-1 py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blogs">
            <span className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-6 font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </span>
          </Link>

          <Card className="shadow-lg border-0">
            <CardContent className="p-8 md:p-12">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={renderContent(blog.content)}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

