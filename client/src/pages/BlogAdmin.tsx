import { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Lock, Plus, AlertCircle, Edit, Trash2, X, Save, Mail, Key, Download } from 'lucide-react';
import { generateSlug, DEFAULT_COVER_IMAGE, getAllBlogsFromSource, saveBlogsToStorage, type BlogPost } from '@/lib/blogData';
import blogsData from '@/data/blogs.json';

// Secret key - can be changed via environment variable
const ADMIN_SECRET_KEY = import.meta.env.VITE_BLOG_ADMIN_SECRET || 'acesynergi-admin-2024';

// Hardcoded login credentials
const ADMIN_EMAIL = 'sairambingi@acesynergi.com';
const ADMIN_PASSWORD = 'AcesynergiSairam1@3$';

const CATEGORIES = ['PMP', 'CBAP', 'CAPM', 'PMI-ACP', 'PMI PBA', 'ECBA', 'CCBA', 'General'] as const;

const exportBlogsAsJSON = (blogs: BlogPost[]): void => {
  try {
    const jsonString = JSON.stringify(blogs, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blogs_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log('[BlogAdmin] Exported blogs as JSON');
  } catch (error) {
    console.error('[BlogAdmin] Error exporting blogs:', error);
  }
};

export default function BlogAdmin() {
  const [, params] = useRoute('/blogs/admin/:secretKey');
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ title?: string; category?: string; content?: string }>({});
  const [formData, setFormData] = useState({
    title: '',
    category: 'General' as typeof CATEGORIES[number],
    content: '',
  });

  useEffect(() => {
    // Check if secret key matches
    if (params?.secretKey === ADMIN_SECRET_KEY) {
      setIsAuthorized(true);
      // Check if user is already logged in (from sessionStorage)
      const savedLogin = sessionStorage.getItem('blog_admin_logged_in');
      if (savedLogin === 'true') {
        setIsLoggedIn(true);
        setShowLoginDialog(false);
        fetchBlogs(); // Load blogs from JSON file
      } else {
        // Show login dialog
        setShowLoginDialog(true);
        setIsLoggedIn(false);
      }
    } else {
      setIsAuthorized(false);
      // Redirect to 404 after a moment
      setTimeout(() => {
        setLocation('/');
      }, 2000);
    }
  }, [params?.secretKey, setLocation]);
  
  // Load blogs when component mounts (if logged in)
  useEffect(() => {
    if (isLoggedIn && isAuthorized) {
      fetchBlogs();
    }
  }, [isLoggedIn, isAuthorized]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Validate credentials
    if (loginForm.email.trim() === ADMIN_EMAIL && loginForm.password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setShowLoginDialog(false);
      sessionStorage.setItem('blog_admin_logged_in', 'true');
      fetchBlogs();
      toast({
        title: 'Login Successful',
        description: 'Welcome to the Blog Admin Panel',
      });
    } else {
      setLoginError('Invalid email or password. Please try again.');
      toast({
        title: 'Login Failed',
        description: 'Invalid credentials. Please check your email and password.',
        variant: 'destructive',
      });
    }
  };

  const fetchBlogs = () => {
    // Load blogs using shared function (checks localStorage first, then JSON)
    // This ensures consistency with public blog pages
    try {
      const jsonBlogs = Array.isArray(blogsData) ? (blogsData as BlogPost[]) : [];
      const loadedBlogs = getAllBlogsFromSource(jsonBlogs);
      
      console.log('[BlogAdmin] Loaded blogs:', loadedBlogs.length);
      setBlogs(loadedBlogs);
    } catch (error: any) {
      console.error('[BlogAdmin] Error loading blogs:', error);
      setBlogs([]);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { title?: string; category?: string; content?: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setErrors({});

    // Create the new blog object
    const slug = generateSlug(formData.title);
    const newBlog: BlogPost = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      category: formData.category,
      content: formData.content.trim(),
      author: 'Acesynergi',
      publishDate: new Date().toISOString(),
      coverImage: DEFAULT_COVER_IMAGE,
      slug: slug,
    };

    // Add blog to local state
    const updatedBlogs = [newBlog, ...blogs].sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
    setBlogs(updatedBlogs);

    // Save to localStorage
    saveBlogsToStorage(updatedBlogs);

    // Reset form
    setFormData({
      title: '',
      category: 'General',
      content: '',
    });

    // Show success message
    toast({
      title: 'Success!',
      description: 'Blog post has been created and saved locally.',
    });

    setIsLoading(false);
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlogId(blog.id);
    setFormData({
      title: blog.title,
      category: blog.category as typeof CATEGORIES[number],
      content: blog.content,
    });
    setErrors({});
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingBlogId(null);
    setFormData({
      title: '',
      category: 'General',
      content: '',
    });
    setErrors({});
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    if (!editingBlogId) return;

    setIsLoading(true);
    setErrors({});

    const slug = generateSlug(formData.title);
    const updatedBlogData = {
      title: formData.title.trim(),
      category: formData.category,
      content: formData.content.trim(),
      slug: slug,
    };

    // Find the blog to update
    const blogToUpdate = blogs.find(b => b.id === editingBlogId);
    if (!blogToUpdate) {
      toast({
        title: 'Error',
        description: 'Blog not found. Please refresh the page.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    // Update blog in local state
    const updatedBlog: BlogPost = {
      ...blogToUpdate,
      ...updatedBlogData,
    };
    
    const updatedBlogs = blogs.map(blog => 
      blog.id === editingBlogId ? updatedBlog : blog
    ).sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
    
    setBlogs(updatedBlogs);

    // Save to localStorage
    saveBlogsToStorage(updatedBlogs);

    // Reset form
    handleCancelEdit();

    // Show success message
    toast({
      title: 'Success!',
      description: 'Blog post has been updated and saved locally.',
    });

    setIsLoading(false);
  };

  const handleDelete = (blogId: string, blogTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`)) {
      return;
    }

    // Remove blog from local state
    const updatedBlogs = blogs.filter(blog => blog.id !== blogId);
    setBlogs(updatedBlogs);

    // Save to localStorage
    saveBlogsToStorage(updatedBlogs);

    // Show success message
    toast({
      title: 'Success!',
      description: 'Blog post has been deleted and saved locally.',
    });
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <section className="flex-1 py-16 md:py-20 bg-gray-50 flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardContent className="p-8 text-center">
              <Lock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Unauthorized Access</h2>
              <p className="text-gray-600">Invalid admin key. Redirecting...</p>
            </CardContent>
          </Card>
        </section>
        <Footer />
      </div>
    );
  }

  // Show login dialog if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <Dialog open={showLoginDialog} onOpenChange={(open) => {
          // Prevent closing the dialog until user is logged in
          if (!isLoggedIn) {
            return;
          }
          setShowLoginDialog(open);
        }}>
          <DialogContent 
            className="sm:max-w-md [&>button]:hidden" 
            onInteractOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
              </div>
              <DialogTitle className="text-2xl text-center">Admin Login</DialogTitle>
              <DialogDescription className="text-center">
                Please enter your credentials to access the Blog Admin Panel
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginForm.email}
                    onChange={(e) => {
                      setLoginForm({ ...loginForm, email: e.target.value });
                      setLoginError('');
                    }}
                    className="pl-10"
                    required
                    autoFocus
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) => {
                      setLoginForm({ ...loginForm, password: e.target.value });
                      setLoginError('');
                    }}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              {loginError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <p className="text-sm text-red-600">{loginError}</p>
                </div>
              )}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Sign In
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary to-accent text-white py-12 mt-20">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Lock className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Blog Admin Panel
            </h1>
          </div>
          <p className="text-sm text-white/80">Create and manage blog posts</p>
        </div>
      </section>

      {/* Admin Form */}
      <section className="flex-1 py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={editingBlogId ? handleUpdate : handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <Label htmlFor="title" className="text-base font-semibold">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      if (errors.title) setErrors({ ...errors, title: undefined });
                    }}
                    placeholder="Enter blog post title"
                    className={`mt-2 ${errors.title ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.title}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Slug will be auto-generated: {formData.title ? generateSlug(formData.title) : '...'}
                  </p>
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category" className="text-base font-semibold">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => {
                      setFormData({ ...formData, category: value as typeof CATEGORIES[number] });
                      if (errors.category) setErrors({ ...errors, category: undefined });
                    }}
                  >
                    <SelectTrigger className={`mt-2 ${errors.category ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Content */}
                <div>
                  <Label htmlFor="content" className="text-base font-semibold">
                    Content <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => {
                      setFormData({ ...formData, content: e.target.value });
                      if (errors.content) setErrors({ ...errors, content: undefined });
                    }}
                    placeholder="Enter blog post content (Markdown supported)"
                    className={`mt-2 min-h-[400px] font-mono text-sm ${errors.content ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.content && (
                    <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.content}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Supports Markdown formatting (headers, lists, bold, etc.)
                  </p>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Author will be set to "Acesynergi", publish date will be set to now, 
                    and a default cover image will be assigned automatically.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  {editingBlogId && (
                    <Button
                      type="button"
                      onClick={handleCancelEdit}
                      variant="outline"
                      className="flex-1"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        {editingBlogId ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        {editingBlogId ? (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Update Blog Post
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-2" />
                            Create Blog Post
                          </>
                        )}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Existing Blogs List */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Existing Blog Posts</h2>
              <Button
                type="button"
                variant="outline"
                onClick={() => exportBlogsAsJSON(blogs)}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export Blogs JSON
              </Button>
            </div>
            {blogs.length === 0 ? (
              <Card className="shadow-lg border-0">
                <CardContent className="p-8 text-center text-gray-500">
                  <p>No blog posts yet. Create your first blog post above.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <Card key={blog.id} className="shadow-lg border-0">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{blog.title}</h3>
                            <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                              {blog.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {new Date(blog.publishDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {blog.content.substring(0, 150)}...
                          </p>
                          <a
                            href={`/blogs/${blog.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline mt-2 inline-block"
                          >
                            View Blog →
                          </a>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(blog)}
                            disabled={isLoading}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(blog.id, blog.title)}
                            disabled={isLoading}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
