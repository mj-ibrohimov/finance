import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const newsItems = [
  {
    id: 1,
    title: 'Federal Reserve Signals Potential Rate Cuts in Q2 2024',
    excerpt: 'Market analysts react to the latest FOMC meeting minutes indicating a shift in monetary policy stance.',
    category: 'Monetary Policy',
    publishedAt: '2 hours ago',
    image: 'https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 2,
    title: 'Tech Stocks Rally as AI Investment Surge Continues',
    excerpt: 'Major technology companies see significant gains amid increased AI infrastructure spending.',
    category: 'Technology',
    publishedAt: '4 hours ago',
    image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 3,
    title: 'Energy Sector Outlook: Renewable vs Traditional',
    excerpt: 'Comprehensive analysis of the ongoing energy transition and its impact on investment strategies.',
    category: 'Energy',
    publishedAt: '6 hours ago',
    image: 'https://images.pexels.com/photos/6802045/pexels-photo-6802045.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export function LatestNews() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Latest Market News
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Stay informed with the latest financial news and market analysis.
            </p>
          </div>
          <Button variant="outline" asChild className="hidden sm:inline-flex">
            <Link href="/news">
              View All News
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-200 overflow-hidden">
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{item.category}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.publishedAt}
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {item.excerpt}
                </p>
                <Button variant="ghost" size="sm" asChild className="p-0 h-auto">
                  <Link href={`/news/${item.id}`}>
                    Read More →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8 sm:hidden">
          <Button asChild>
            <Link href="/news">View All News</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}