
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowUp, ArrowDown, Bitcoin, DollarSign, ChartLine } from 'lucide-react';
import { useMarketData } from '@/hooks/useCryptoData';
import { formatCurrency, formatNumber, formatPercentage } from '@/utils/formatters';

const MarketOverview = () => {
  const { data: marketData, isLoading } = useMarketData();

  // Helper to render a metric card
  const MetricCard = ({ title, value, change, icon }: { title: string, value: string, change?: string, icon: React.ReactNode }) => (
    <Card className="bg-crypto-bg-card border-crypto-accent-blue/10">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="bg-crypto-accent-blue/10 p-2 rounded-md text-crypto-accent-blue">
            {icon}
          </div>
          <p className="text-crypto-text-secondary text-xs">{title}</p>
        </div>
        
        {isLoading ? (
          <Skeleton className="h-6 w-full mt-1 bg-crypto-accent-blue/10" />
        ) : (
          <>
            <p className="text-lg font-medium">{value}</p>
            {change && (
              <div className={`text-xs mt-1 flex items-center gap-1 ${parseFloat(change) >= 0 ? 'text-crypto-up' : 'text-crypto-down'}`}>
                {parseFloat(change) >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                <span>{change}</span>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Market Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard 
          title="Total Market Cap" 
          value={marketData ? formatCurrency(marketData.total_market_cap.usd, 'usd', 0) : 'Loading...'}
          change={marketData ? formatPercentage(marketData.market_cap_change_percentage_24h_usd) : undefined}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard 
          title="Total Volume (24h)" 
          value={marketData ? formatCurrency(marketData.total_volume.usd, 'usd', 0) : 'Loading...'}
          icon={<ChartLine className="h-4 w-4" />}
        />
        <MetricCard 
          title="Bitcoin Dominance" 
          value={marketData ? formatPercentage(marketData.market_cap_percentage.btc) : 'Loading...'}
          icon={<Bitcoin className="h-4 w-4" />}
        />
      </div>
    </div>
  );
};

export default MarketOverview;
