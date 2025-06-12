import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Eye } from 'lucide-react';
import Link from 'next/link';

const articles = [
  {
    id: 1,
    title: 'Q4 Earnings Preview: Tech Giants',
    author: 'Sarah Johnson',
    publishedAt: '2 hours ago',
    views: 1240,
    category: 'Earnings',
  },
  {
    id: 2,
    title: 'Market Volatility Analysis',
    author: 'Michael Chen',
    publishedAt: '5 hours ago',
    views: 892,
    category: 'Analysis',
  },
  {
    id: 3,
    title: 'Cryptocurrency Market Update',
    author: 'Emily Rodriguez',
    publishedAt: '1 day ago',
    views: 2156,
    category: 'Crypto',
  },
];

export function RecentArticles() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Articles</CardTitle>
        <CardDescription>Latest financial analysis and insights</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-sm line-clamp-2 flex-1">
                {article.title}
              </h3>
              <Badge variant="secondary" className="ml-2 text-xs">
                {article.category}
              </Badge>
            </div>
            <p className="text-xs text-gray-600 mb-2">by {article.author}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{article.publishedAt}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{article.views}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" asChild className="w-full">
          <Link href="/articles">View All Articles</Link>
        </Button>
      </CardContent>
    </Card>
  );
}