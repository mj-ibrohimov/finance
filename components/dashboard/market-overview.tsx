import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

const marketData = [
  {
    index: 'S&P 500',
    value: '4,387.16',
    change: '+0.75%',
    trend: 'up',
  },
  {
    index: 'NASDAQ',
    value: '13,431.34',
    change: '+1.24%',
    trend: 'up',
  },
  {
    index: 'DOW JONES',
    value: '34,302.61',
    change: '-0.21%',
    trend: 'down',
  },
  {
    index: 'RUSSELL 2000',
    value: '1,942.83',
    change: '+0.89%',
    trend: 'up',
  },
];

const topMovers = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', change: '+5.67%', trend: 'up' },
  { symbol: 'AMZN', name: 'Amazon.com Inc', change: '+3.24%', trend: 'up' },
  { symbol: 'TSLA', name: 'Tesla Inc', change: '-2.45%', trend: 'down' },
  { symbol: 'META', name: 'Meta Platforms', change: '+4.12%', trend: 'up' },
];

export function MarketOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Market Indices</CardTitle>
          <CardDescription>Major market index performance today</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {marketData.map((market) => (
            <div key={market.index} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{market.index}</p>
                <p className="text-lg font-semibold">{market.value}</p>
              </div>
              <Badge
                variant={market.trend === 'up' ? 'default' : 'destructive'}
                className="flex items-center space-x-1"
              >
                {market.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{market.change}</span>
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Movers</CardTitle>
          <CardDescription>Stocks with significant price movements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {topMovers.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{stock.symbol}</p>
                <p className="text-sm text-gray-600">{stock.name}</p>
              </div>
              <Badge
                variant={stock.trend === 'up' ? 'default' : 'destructive'}
                className="flex items-center space-x-1"
              >
                {stock.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{stock.change}</span>
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}