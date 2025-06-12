import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, Database, Newspaper, FileText, Shield } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: BarChart3,
    title: 'Advanced Stock Charts',
    description: 'Real-time candlestick and line charts with technical indicators',
    href: '/stocks',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Meet our certified financial analysts and market experts',
    href: '/team',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Database,
    title: 'Analyst Database',
    description: 'Comprehensive directory of financial professionals',
    href: '/analysts',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Newspaper,
    title: 'Market News',
    description: 'Stay updated with latest financial news and market trends',
    href: '/news',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: FileText,
    title: 'Research Articles',
    description: 'In-depth analysis and research reports from our experts',
    href: '/articles',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Enterprise-grade security for your financial data',
    href: '/security',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
  },
];

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything You Need for Financial Success
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our comprehensive platform provides all the tools and insights you need to make informed investment decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="group hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.bgColor} mb-4`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" asChild className="group-hover:bg-gray-50 w-full justify-start">
                    <Link href={feature.href}>
                      Learn More →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}