'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Users, FileText, Eye } from 'lucide-react';
import { StockChart } from '@/components/dashboard/stock-chart';
import { MarketOverview } from '@/components/dashboard/market-overview';
import { RecentArticles } from '@/components/dashboard/recent-articles';
import { TopAnalysts } from '@/components/dashboard/top-analysts';

const stats = [
  {
    title: 'Portfolio Value',
    value: '$124,563',
    change: '+5.4%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Total Articles',
    value: '342',
    change: '+12',
    trend: 'up',
    icon: FileText,
  },
  {
    title: 'Active Analysts',
    value: '28',
    change: '+3',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Monthly Views',
    value: '15.2K',
    change: '+8.2%',
    trend: 'up',
    icon: Eye,
  },
];

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here&apos;s your financial overview.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-1 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>{stat.change}</span>
                  <span className="text-gray-500">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Stock Performance</CardTitle>
              <CardDescription>
                Real-time stock price movements and analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StockChart />
            </CardContent>
          </Card>
          
          <MarketOverview />
        </div>
        
        <div className="space-y-8">
          <TopAnalysts />
          <RecentArticles />
        </div>
      </div>
    </div>
  );
}