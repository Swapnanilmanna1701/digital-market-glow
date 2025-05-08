
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Cryptocurrency } from '@/types/crypto';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import PriceChange from '@/components/PriceChange';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface CryptoCardProps {
  crypto: Cryptocurrency;
  onClick: (crypto: Cryptocurrency) => void;
}

const CryptoCard = ({ crypto, onClick }: CryptoCardProps) => {
  // Generate some fake chart data for the mini-chart - in a real app we'd use actual data
  const chartData = Array.from({ length: 24 }, (_, i) => ({
    value: crypto.current_price * (1 + Math.sin(i / 3) * 0.05 * (crypto.price_change_percentage_24h > 0 ? 1 : -1))
  }));

  return (
    <Card 
      className="bg-crypto-bg-card border-crypto-accent-blue/10 hover:border-crypto-accent-blue/30 transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => onClick(crypto)}
    >
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <img 
            src={crypto.image} 
            alt={crypto.name} 
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1">
            <p className="font-medium">{crypto.name}</p>
            <p className="text-xs text-crypto-text-secondary">{crypto.symbol.toUpperCase()}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-medium">{formatCurrency(crypto.current_price)}</p>
            <PriceChange value={crypto.price_change_percentage_24h} className="text-xs" />
          </div>
        </div>
        
        <div className="h-12 w-full opacity-50">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={crypto.price_change_percentage_24h >= 0 ? "#4CAF50" : "#F44336"} 
                strokeWidth={1.5} 
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-between text-xs text-crypto-text-secondary mt-1">
          <span>Market Cap: {formatNumber(crypto.market_cap)}</span>
          <span>Rank #{crypto.market_cap_rank}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoCard;
