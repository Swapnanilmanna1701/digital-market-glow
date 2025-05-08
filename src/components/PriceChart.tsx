
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CryptoHistoricalData, ChartPeriod } from '@/types/crypto';
import { formatCurrency, formatDate, formatTime, formatDateTime } from '@/utils/formatters';
import { useHistoricalData } from '@/hooks/useCryptoData';

interface PriceChartProps {
  coinId: string;
  name: string;
  currentPrice: number;
}

const PriceChart = ({ coinId, name, currentPrice }: PriceChartProps) => {
  const [period, setPeriod] = useState<ChartPeriod>('7d');
  const { data: historicalData, isLoading, error } = useHistoricalData(coinId, period);

  const chartData = useMemo(() => {
    if (!historicalData?.prices) return [];
    
    return historicalData.prices.map(([timestamp, price]) => ({
      timestamp,
      price
    }));
  }, [historicalData]);

  // Calculate price change
  const priceChange = useMemo(() => {
    if (!chartData || chartData.length < 2) return null;
    const firstPrice = chartData[0].price;
    const lastPrice = chartData[chartData.length - 1].price;
    return (lastPrice - firstPrice) / firstPrice * 100;
  }, [chartData]);

  const isPositive = priceChange !== null && priceChange >= 0;
  const lineColor = isPositive ? '#4CAF50' : '#F44336';

  // Customize the tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const date = new Date(data.timestamp);
      
      // Format based on time period
      let formattedTime;
      if (period === '1h' || period === '24h') {
        formattedTime = formatTime(data.timestamp);
      } else if (period === '7d' || period === '30d') {
        formattedTime = formatDate(data.timestamp);
      } else {
        formattedTime = formatDate(data.timestamp);
      }
      
      return (
        <div className="bg-crypto-bg-dark p-3 border border-crypto-accent-blue/30 rounded-md shadow-lg">
          <p className="font-medium">{formatCurrency(data.price)}</p>
          <p className="text-xs text-crypto-text-secondary">{formattedTime}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-crypto-bg-card border-crypto-accent-blue/10">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">{name} Price Chart</CardTitle>
            <p className="text-sm text-crypto-text-secondary">
              Current Price: {formatCurrency(currentPrice)}
            </p>
          </div>
          {priceChange !== null && (
            <div className={`text-sm ${isPositive ? 'text-crypto-up' : 'text-crypto-down'}`}>
              {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
            </div>
          )}
        </div>
        <Tabs defaultValue="7d" className="mt-2" onValueChange={(value) => setPeriod(value as ChartPeriod)}>
          <TabsList className="bg-crypto-bg-dark">
            <TabsTrigger value="1h">1H</TabsTrigger>
            <TabsTrigger value="24h">24H</TabsTrigger>
            <TabsTrigger value="7d">7D</TabsTrigger>
            <TabsTrigger value="30d">30D</TabsTrigger>
            <TabsTrigger value="90d">90D</TabsTrigger>
            <TabsTrigger value="1y">1Y</TabsTrigger>
            <TabsTrigger value="max">Max</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-0 pt-2">
        <div className="h-[400px] w-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-pulse-blue h-10 w-10 rounded-full"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-crypto-text-secondary">
              Failed to load chart data
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(timestamp) => {
                    if (period === '1h' || period === '24h') {
                      return formatTime(timestamp);
                    }
                    return formatDate(timestamp);
                  }}
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                />
                <YAxis 
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={(value) => formatCurrency(value, 'usd', 0)}
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke={lineColor}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <ReferenceLine 
                  y={currentPrice} 
                  stroke="rgba(255,255,255,0.5)" 
                  strokeDasharray="3 3" 
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
