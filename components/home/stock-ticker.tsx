'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const mockStocks: StockData[] = [
  { symbol: 'AAPL', price: 178.85, change: 2.15, changePercent: 1.22 },
  { symbol: 'GOOGL', price: 142.56, change: -1.23, changePercent: -0.85 },
  { symbol: 'MSFT', price: 378.85, change: 5.42, changePercent: 1.45 },
  { symbol: 'TSLA', price: 238.45, change: -3.21, changePercent: -1.33 },
  { symbol: 'AMZN', price: 145.67, change: 2.87, changePercent: 2.01 },
  { symbol: 'META', price: 487.23, change: 8.45, changePercent: 1.77 },
  { symbol: 'NVDA', price: 875.28, change: 12.34, changePercent: 1.43 },
  { symbol: 'NFLX', price: 456.78, change: -2.56, changePercent: -0.56 },
];

export function StockTicker() {
  const [currentStocks, setCurrentStocks] = useState(mockStocks);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStocks(prevStocks => 
        prevStocks.map(stock => ({
          ...stock,
          price: stock.price + (Math.random() - 0.5) * 2,
          change: (Math.random() - 0.5) * 5,
          changePercent: (Math.random() - 0.5) * 3,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 text-white py-4 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex items-center space-x-8">
        {currentStocks.concat(currentStocks).map((stock, index) => (
          <div key={`${stock.symbol}-${index}`} className="flex items-center space-x-2 text-sm">
            <span className="font-semibold">{stock.symbol}</span>
            <span className="text-gray-300">${stock.price.toFixed(2)}</span>
            <div className={`flex items-center space-x-1 ${
              stock.change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {stock.change >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{stock.changePercent.toFixed(2)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}