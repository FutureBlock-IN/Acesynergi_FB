import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { BlogPost, getAllBlogsFromSource } from '@/lib/blogData';
import blogsData from '@/data/blogs.json';

const BLOGS_PER_PAGE = 4;

export default function BlogList() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Load blogs using shared function (checks localStorage first, then JSON)
    // This ensures consistency with admin panel
    const jsonBlogs = Array.isArray(blogsData) ? (blogsData as BlogPost[]) : [];
    const loadedBlogs = getAllBlogsFromSource(jsonBlogs);
    setBlogs(loadedBlogs);
  }, []);

  const categories = ['All', 'PMP', 'CBAP', 'CAPM', 'PMI-ACP', 'PMI PBA', 'ECBA', 'CCBA', 'General'];
  
  const filteredBlogs = selectedCategory === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const endIndex = startIndex + BLOGS_PER_PAGE;
  const displayedBlogs = filteredBlogs.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary to-accent text-white py-20 mt-20">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 md:w-12 md:h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Blog
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Insights, tips, and updates on project management and business analysis
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="flex-1 py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter - Only show if blogs exist */}
          {blogs.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-white text-foreground hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Empty State */}
          {blogs.length === 0 ? (
            <div className="text-center py-16 md:py-24">
              <div className="max-w-md mx-auto">
                <BookOpen className="w-16 h-16 mx-auto mb-6 text-gray-400" />
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  No blog posts yet
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our team is preparing valuable content. Please check back soon.
                </p>
              </div>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No blog posts found in this category.</p>
            </div>
          ) : (
            <>
              {/* Blog Grid - Show 4 cards in a row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedBlogs.map((blog) => (
                <Link key={blog.id} href={`/blogs/${blog.slug}`}>
                  <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col overflow-hidden group">
                    {/* Cover Image */}
                    <div className="relative h-32 overflow-hidden bg-gray-100">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop&q=80';
                        }}
                      />
                      {/* Category Badge */}
                      <div className="absolute top-2 left-2">
                        <span className="bg-primary/90 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-[10px] font-semibold shadow-sm">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <CardContent className="p-3 flex-1 flex flex-col">
                      {/* Title */}
                      <h2 className="text-sm font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                        {blog.title}
                      </h2>
                      
                      {/* Meta Info */}
                      <div className="flex flex-col gap-1 text-[10px] text-gray-500 mb-2">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span className="truncate">{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span className="truncate">{formatDate(blog.publishDate)}</span>
                        </div>
                      </div>
                      
                      {/* Preview */}
                      <p className="text-xs text-gray-600 line-clamp-2 mb-3 flex-1 leading-relaxed">
                        {blog.content.replace(/[#*`]/g, '').substring(0, 80).trim()}...
                      </p>
                      
                      {/* Read More */}
                      <div className="mt-auto pt-2 border-t border-gray-100">
                        <span className="text-primary text-xs font-medium group-hover:underline inline-flex items-center gap-1">
                          Read More
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className="w-10 h-10 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Page Info */}
              {totalPages > 1 && (
                <div className="mt-4 text-center text-sm text-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredBlogs.length)} of {filteredBlogs.length} blog posts
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
