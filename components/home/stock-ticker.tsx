'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export function StockTicker() {
  const [stocks, setStocks] = useState<StockData[]>([
    { symbol: 'AAPL', price: 175.43, change: 2.15, changePercent: 1.24 },
    { symbol: 'GOOGL', price: 142.56, change: -1.23, changePercent: -0.85 },
    { symbol: 'MSFT', price: 378.85, change: 4.32, changePercent: 1.15 },
    { symbol: 'TSLA', price: 248.42, change: -3.67, changePercent: -1.45 },
    { symbol: 'AMZN', price: 151.94, change: 1.89, changePercent: 1.26 },
    { symbol: 'NVDA', price: 875.28, change: 12.45, changePercent: 1.44 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => ({
          ...stock,
          price: stock.price + (Math.random() - 0.5) * 2,
          change: (Math.random() - 0.5) * 5,
          changePercent: (Math.random() - 0.5) * 2,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 text-white py-4 overflow-hidden">
      <div className="animate-scroll flex space-x-8 whitespace-nowrap">
        {[...stocks, ...stocks].map((stock, index) => (
          <div key={`${stock.symbol}-${index}`} className="flex items-center space-x-2 min-w-max">
            <span className="font-semibold">{stock.symbol}</span>
            <span className="text-gray-300">${stock.price.toFixed(2)}</span>
            <div className={`flex items-center space-x-1 ${
              stock.change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {stock.change >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}</span>
              <span>({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}