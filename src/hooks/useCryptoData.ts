
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCryptocurrencies, getHistoricalData, getMarketData } from '../services/cryptoService';
import { Cryptocurrency, CryptoHistoricalData, CoinGeckoMarketData, ChartPeriod } from '../types/crypto';

// Hook for fetching cryptocurrency list
export const useCryptocurrencies = (page: number = 1, perPage: number = 50) => {
  return useQuery({
    queryKey: ['cryptocurrencies', page, perPage],
    queryFn: () => getCryptocurrencies(page, perPage),
    staleTime: 60000, // 1 minute
    refetchInterval: 60000, // Refetch every minute
  });
};

// Hook for fetching historical data for a specific cryptocurrency
export const useHistoricalData = (id: string, period: ChartPeriod = '7d') => {
  // Convert period to days for API
  const getDays = (period: ChartPeriod): string => {
    switch (period) {
      case '1h': return '0.04'; // ~1 hour in days
      case '24h': return '1';
      case '7d': return '7';
      case '30d': return '30';
      case '90d': return '90';
      case '1y': return '365';
      case 'max': return 'max';
      default: return '7';
    }
  };

  return useQuery({
    queryKey: ['historicalData', id, period],
    queryFn: () => getHistoricalData(id, getDays(period)),
    staleTime: 300000, // 5 minutes
    refetchInterval: 300000, // Refetch every 5 minutes
    enabled: !!id, // Only run if id is provided
  });
};

// Hook for fetching global market data
export const useMarketData = () => {
  return useQuery({
    queryKey: ['marketData'],
    queryFn: getMarketData,
    staleTime: 60000, // 1 minute
    refetchInterval: 60000, // Refetch every minute
  });
};

// Hook for polling cryptocurrency prices
export const usePollingPrices = (initialCoins: Cryptocurrency[] = []) => {
  const [coins, setCoins] = useState<Cryptocurrency[]>(initialCoins);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialCoins.length > 0) {
      setCoins(initialCoins);
      setLoading(false);
    }
  }, [initialCoins]);

  useEffect(() => {
    // Only start polling if we have initial data
    if (initialCoins.length === 0) return;

    const fetchPrices = async () => {
      try {
        const data = await getCryptocurrencies(1, initialCoins.length);
        setCoins(data);
        setError(null);
      } catch (err) {
        setError('Failed to update prices');
        console.error(err);
      }
    };

    // Poll every 30 seconds
    const intervalId = setInterval(fetchPrices, 30000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [initialCoins]);

  return { coins, loading, error };
};
