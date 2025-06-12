'use client';

import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockOHLCData = [
  { date: '2024-01-01', open: 150, high: 155, low: 148, close: 153, volume: 2400000 },
  { date: '2024-01-02', open: 153, high: 158, low: 151, close: 156, volume: 1800000 },
  { date: '2024-01-03', open: 156, high: 159, low: 154, close: 157, volume: 2100000 },
  { date: '2024-01-04', open: 157, high: 162, low: 155, close: 160, volume: 2800000 },
  { date: '2024-01-05', open: 160, high: 164, low: 158, close: 161, volume: 2200000 },
  { date: '2024-01-08', open: 161, high: 165, low: 159, close: 163, volume: 1900000 },
  { date: '2024-01-09', open: 163, high: 167, low: 161, close: 165, volume: 2500000 },
  { date: '2024-01-10', open: 165, high: 168, low: 162, close: 164, volume: 2000000 },
];

const CandlestickTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <h4 className="font-semibold mb-2">{label}</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Open:</span>
            <span className="font-medium">${data.open.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>High:</span>
            <span className="font-medium text-green-600">${data.high.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Low:</span>
            <span className="font-medium text-red-600">${data.low.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Close:</span>
            <span className="font-medium">${data.close.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Volume:</span>
            <span className="font-medium">{(data.volume / 1000000).toFixed(1)}M</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function CandlestickChart() {
  return (
    <div className="space-y-4">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={mockOHLCData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip content={<CandlestickTooltip />} />
            <Bar 
              dataKey="volume" 
              fill="#e5e7eb" 
              yAxisId="volume"
              opacity={0.3}
            />
            <Line 
              type="monotone" 
              dataKey="close" 
              stroke="#2563eb" 
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-gray-600 mb-1">Current Price</div>
          <div className="font-semibold text-lg">$164.00</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-gray-600 mb-1">Day High</div>
          <div className="font-semibold text-lg text-green-600">$168.00</div>
        </div>
        <div className="bg-red-50 p-3 rounded-lg">
          <div className="text-gray-600 mb-1">Day Low</div>
          <div className="font-semibold text-lg text-red-600">$162.00</div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-gray-600 mb-1">Volume</div>
          <div className="font-semibold text-lg text-blue-600">2.5M</div>
        </div>
      </div>
    </div>
  );
}