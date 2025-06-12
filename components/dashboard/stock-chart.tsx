'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { time: '9:30', price: 150.2 },
  { time: '10:00', price: 152.4 },
  { time: '10:30', price: 151.8 },
  { time: '11:00', price: 154.1 },
  { time: '11:30', price: 153.9 },
  { time: '12:00', price: 155.7 },
  { time: '12:30', price: 157.2 },
  { time: '13:00', price: 156.8 },
  { time: '13:30', price: 158.4 },
  { time: '14:00', price: 159.1 },
  { time: '14:30', price: 158.7 },
  { time: '15:00', price: 160.3 },
  { time: '15:30', price: 161.8 },
  { time: '16:00', price: 162.5 },
];

const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corp.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
];

const timeframes = ['1D', '1W', '1M', '3M', '1Y'];

export function StockChart() {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Select value={selectedStock} onValueChange={setSelectedStock}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select stock" />
          </SelectTrigger>
          <SelectContent>
            {stocks.map((stock) => (
              <SelectItem key={stock.symbol} value={stock.symbol}>
                {stock.symbol} - {stock.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex space-x-2">
          {timeframes.map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTimeframe(timeframe)}
            >
              {timeframe}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
            <Tooltip
              labelFormatter={(label) => `Time: ${label}`}
              formatter={(value) => [`$${value}`, 'Price']}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Current Price:</span>
          <span className="font-semibold text-lg">$162.50</span>
          <span className="text-green-600 font-medium">+12.30 (+8.19%)</span>
        </div>
        <div className="text-gray-500">
          Last updated: 16:00 EST
        </div>
      </div>
    </div>
  );
}