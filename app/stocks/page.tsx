'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { StockChart } from '@/components/dashboard/stock-chart';
import { CandlestickChart } from '@/components/stocks/candlestick-chart';
import { StockWatchlist } from '@/components/stocks/stock-watchlist';
import { MarketHeatmap } from '@/components/stocks/market-heatmap';

const popularStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.85, change: 2.15, changePercent: 1.22, volume: '52.4M' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.56, change: -1.23, changePercent: -0.85, volume: '28.1M' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: 5.42, changePercent: 1.45, volume: '31.8M' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 238.45, change: -3.21, changePercent: -1.33, volume: '89.2M' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 145.67, change: 2.87, changePercent: 2.01, volume: '45.7M' },
  { symbol: 'META', name: 'Meta Platforms', price: 487.23, change: 8.45, changePercent: 1.77, volume: '23.9M' },
];

export default function StocksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState('AAPL');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Stock Analysis</h1>
        <p className="text-lg text-gray-600">
          Real-time stock prices, advanced charting, and comprehensive market analysis tools.
        </p>
      </div>
      
      {/* Search and Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Stock Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search stocks by symbol or company name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedStock} onValueChange={setSelectedStock}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select stock" />
              </SelectTrigger>
              <SelectContent>
                {popularStocks.map((stock) => (
                  <SelectItem key={stock.symbol} value={stock.symbol}>
                    {stock.symbol} - {stock.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="line" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="line">Line Chart</TabsTrigger>
              <TabsTrigger value="candlestick">Candlestick</TabsTrigger>
              <TabsTrigger value="heatmap">Market Heatmap</TabsTrigger>
            </TabsList>
            
            <TabsContent value="line" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Stock Price Chart</CardTitle>
                  <CardDescription>
                    Real-time price movements with technical analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StockChart />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="candlestick" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Candlestick Chart</CardTitle>
                  <CardDescription>
                    OHLC data with volume analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CandlestickChart />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="heatmap" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Market Heatmap</CardTitle>
                  <CardDescription>
                    Visual representation of market performance by sector
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MarketHeatmap />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <StockWatchlist />
          
          <Card>
            <CardHeader>
              <CardTitle>Popular Stocks</CardTitle>
              <CardDescription>Most traded stocks today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {popularStocks.map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{stock.symbol}</span>
                      <span className="text-sm text-gray-600 truncate">
                        {stock.name}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Vol: {stock.volume}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{stock.price.toFixed(2)}</div>
                    <div className={`text-sm flex items-center ${
                      stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.change >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}