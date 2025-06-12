'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Clock, Eye, Heart, MessageCircle, Filter } from 'lucide-react';
import Link from 'next/link';

const articles = [
  {
    id: 1,
    title: 'Q4 Earnings Analysis: Tech Giants Outperform Expectations',
    excerpt: 'A comprehensive analysis of Q4 earnings from major technology companies including Apple, Microsoft, and Google, showing strong performance across all sectors.',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100',
      initials: 'SJ',
      role: 'Senior Financial Analyst'
    },
    category: 'Earnings Analysis',
    publishedAt: '2 hours ago',
    readTime: '8 min read',
    likes: 124,
    comments: 18,
    views: 2340,
    featured: true,
    image: 'https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    title: 'Federal Reserve Policy Impact on Market Volatility',
    excerpt: 'Examining how recent Federal Reserve decisions are affecting market stability and what investors should expect in the coming quarters.',
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=100',
      initials: 'MC',
      role: 'Portfolio Manager'
    },
    category: 'Monetary Policy',
    publishedAt: '5 hours ago',
    readTime: '12 min read',
    likes: 89,
    comments: 24,
    views: 1890,
    featured: false,
    image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    title: 'ESG Investing: Sustainable Finance Trends for 2024',
    excerpt: 'Exploring the growing importance of Environmental, Social, and Governance factors in investment decisions and portfolio construction.',
    author: {
      name: 'Lisa Wang',
      avatar: 'https://images.pexels.com/photos/3785078/pexels-photo-3785078.jpeg?auto=compress&cs=tinysrgb&w=100',
      initials: 'LW',
      role: 'ESG Research Director'
    },
    category: 'ESG',
    publishedAt: '1 day ago',
    readTime: '10 min read',
    likes: 156,
    comments: 31,
    views: 3120,
    featured: true,
    image: 'https://images.pexels.com/photos/6802045/pexels-photo-6802045.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    title: 'Cryptocurrency Market Analysis: Bitcoin and Ethereum Outlook',
    excerpt: 'Technical and fundamental analysis of major cryptocurrencies, including price predictions and market sentiment indicators.',
    author: {
      name: 'Emily Rodriguez',
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100',
      initials: 'ER',
      role: 'Market Strategist'
    },
    category: 'Cryptocurrency',
    publishedAt: '2 days ago',
    readTime: '15 min read',
    likes: 203,
    comments: 45,
    views: 4560,
    featured: false,
    image: 'https://images.pexels.com/photos/6802048/pexels-photo-6802048.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 5,
    title: 'Real Estate Investment Trusts: Market Opportunities',
    excerpt: 'Analyzing the current REIT market landscape and identifying potential investment opportunities in commercial and residential sectors.',
    author: {
      name: 'Robert Martinez',
      avatar: 'https://images.pexels.com/photos/3777932/pexels-photo-3777932.jpeg?auto=compress&cs=tinysrgb&w=100',
      initials: 'RM',
      role: 'Alternative Investments Specialist'
    },
    category: 'Real Estate',
    publishedAt: '3 days ago',
    readTime: '11 min read',
    likes: 78,
    comments: 12,
    views: 1670,
    featured: false,
    image: 'https://images.pexels.com/photos/6802047/pexels-photo-6802047.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 6,
    title: 'Fixed Income Strategies in Rising Rate Environment',
    excerpt: 'Strategic approaches to bond investing and fixed income portfolio management during periods of increasing interest rates.',
    author: {
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=100',
      initials: 'DK',
      role: 'Fixed Income Analyst'
    },
    category: 'Fixed Income',
    publishedAt: '4 days ago',
    readTime: '9 min read',
    likes: 92,
    comments: 16,
    views: 2100,
    featured: false,
    image: 'https://images.pexels.com/photos/6802046/pexels-photo-6802046.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const categories = ['All', 'Earnings Analysis', 'Monetary Policy', 'ESG', 'Cryptocurrency', 'Real Estate', 'Fixed Income'];

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'views':
        return b.views - a.views;
      case 'newest':
      default:
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
  });

  const featuredArticles = articles.filter(article => article.featured);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Financial Articles & Analysis</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          In-depth financial analysis, market insights, and expert commentary from our team of certified analysts and industry professionals.
        </p>
      </div>

      {/* Featured Articles */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredArticles.slice(0, 2).map((article) => (
            <Card key={article.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{article.category}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.readTime}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={article.author.avatar} alt={article.author.name} />
                      <AvatarFallback>{article.author.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{article.author.name}</p>
                      <p className="text-xs text-gray-500">{article.publishedAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{article.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{article.views}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Search & Filter Articles</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search articles by title or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Liked</SelectItem>
                <SelectItem value="views">Most Viewed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedArticles.map((article) => (
          <Card key={article.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
            <div className="aspect-video bg-gray-200 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary">{article.category}</Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {article.readTime}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={article.author.avatar} alt={article.author.name} />
                    <AvatarFallback className="text-xs">{article.author.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-medium">{article.author.name}</p>
                    <p className="text-xs text-gray-500">{article.publishedAt}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-3 w-3" />
                    <span>{article.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>{article.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{article.views}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/articles/${article.id}`}>
                    Read More →
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No articles found matching your criteria.</p>
          <Button variant="outline" onClick={() => {
            setSearchQuery('');
            setSelectedCategory('All');
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}