'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Plus, X } from 'lucide-react';

const initialWatchlist = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.85, change: 2.15, changePercent: 1.22 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.56, change: -1.23, changePercent: -0.85 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: 5.42, changePercent: 1.45 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 238.45, change: -3.21, changePercent: -1.33 },
];

export function StockWatchlist() {
  const [watchlist, setWatchlist] = useState(initialWatchlist);

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter(stock => stock.symbol !== symbol));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>My Watchlist</CardTitle>
          <CardDescription>Stocks you're monitoring</CardDescription>
        </div>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {watchlist.map((stock) => (
          <div key={stock.symbol} className="group flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm">{stock.symbol}</span>
                <span className="text-xs text-gray-600 truncate">
                  {stock.name}
                </span>
              </div>
              <div className="text-sm font-medium">${stock.price.toFixed(2)}</div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant={stock.change >= 0 ? 'default' : 'destructive'}
                className="text-xs"
              >
                {stock.change >= 0 ? (
                  <TrendingUp className="h-2 w-2 mr-1" />
                ) : (
                  <TrendingDown className="h-2 w-2 mr-1" />
                )}
                {stock.changePercent.toFixed(1)}%
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFromWatchlist(stock.symbol)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
        
        {watchlist.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm mb-4">Your watchlist is empty</p>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add your first stock
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}