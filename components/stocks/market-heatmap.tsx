'use client';

const sectors = [
  { name: 'Technology', performance: 2.4, size: 25, stocks: ['AAPL', 'MSFT', 'GOOGL', 'META'] },
  { name: 'Healthcare', performance: 1.2, size: 15, stocks: ['JNJ', 'PFE', 'UNH', 'ABBV'] },
  { name: 'Financial', performance: -0.8, size: 18, stocks: ['JPM', 'BAC', 'WFC', 'GS'] },
  { name: 'Energy', performance: 3.1, size: 8, stocks: ['XOM', 'CVX', 'COP', 'EOG'] },
  { name: 'Consumer Disc.', performance: 0.5, size: 12, stocks: ['AMZN', 'TSLA', 'HD', 'MCD'] },
  { name: 'Industrials', performance: 1.8, size: 10, stocks: ['BA', 'CAT', 'GE', 'MMM'] },
  { name: 'Communication', performance: -1.2, size: 7, stocks: ['GOOGL', 'META', 'NFLX', 'DIS'] },
  { name: 'Utilities', performance: -0.5, size: 5, stocks: ['NEE', 'DUK', 'SO', 'D'] },
];

export function MarketHeatmap() {
  const getColor = (performance: number) => {
    if (performance > 2) return 'bg-green-600';
    if (performance > 1) return 'bg-green-500';
    if (performance > 0) return 'bg-green-400';
    if (performance > -1) return 'bg-red-400';
    if (performance > -2) return 'bg-red-500';
    return 'bg-red-600';
  };

  const getTextColor = (performance: number) => {
    return Math.abs(performance) > 1 ? 'text-white' : 'text-gray-900';
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {sectors.map((sector) => (
          <div
            key={sector.name}
            className={`
              ${getColor(sector.performance)} 
              ${getTextColor(sector.performance)}
              p-4 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer
            `}
            style={{ minHeight: `${80 + sector.size * 2}px` }}
          >
            <h3 className="font-semibold text-sm mb-1">{sector.name}</h3>
            <p className="text-lg font-bold">
              {sector.performance > 0 ? '+' : ''}{sector.performance.toFixed(1)}%
            </p>
            <div className="mt-2 space-y-1">
              {sector.stocks.slice(0, 2).map((stock) => (
                <div key={stock} className="text-xs opacity-80">
                  {stock}
                </div>
              ))}
              {sector.stocks.length > 2 && (
                <div className="text-xs opacity-60">
                  +{sector.stocks.length - 2} more
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-600 rounded"></div>
          <span>Strong Gains (2%+)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-400 rounded"></div>
          <span>Gains (0-2%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-400 rounded"></div>
          <span>Losses (0-2%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-600 rounded"></div>
          <span>Strong Losses (2%+)</span>
        </div>
      </div>
    </div>
  );
}