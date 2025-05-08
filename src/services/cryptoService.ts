
import { Cryptocurrency, CryptoHistoricalData, CoinGeckoMarketData } from '../types/crypto';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

// Helper to handle API responses
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'API request failed');
  }
  return response.json() as Promise<T>;
};

// Fetch cryptocurrency list
export const getCryptocurrencies = async (
  page: number = 1,
  perPage: number = 20,
  currency: string = 'usd',
  orderBy: string = 'market_cap_desc'
): Promise<Cryptocurrency[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h,7d,30d`
    );
    return handleResponse<Cryptocurrency[]>(response);
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    throw error;
  }
};

// Search cryptocurrencies by query
export const searchCryptocurrencies = async (query: string): Promise<Cryptocurrency[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?query=${query}`);
    const data = await handleResponse<{ coins: any[] }>(response);
    
    if (data.coins.length === 0) return [];
    
    // Get top 10 results and fetch their market data
    const coinIds = data.coins.slice(0, 10).map(coin => coin.id).join(',');
    const marketResponse = await fetch(
      `${API_BASE_URL}/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h,7d,30d`
    );
    
    return handleResponse<Cryptocurrency[]>(marketResponse);
  } catch (error) {
    console.error('Error searching cryptocurrencies:', error);
    throw error;
  }
};

// Get historical data for a specific cryptocurrency
export const getHistoricalData = async (
  id: string,
  days: string = '7',
  currency: string = 'usd'
): Promise<CryptoHistoricalData> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
    );
    return handleResponse<CryptoHistoricalData>(response);
  } catch (error) {
    console.error(`Error fetching historical data for ${id}:`, error);
    throw error;
  }
};

// Get global crypto market data
export const getMarketData = async (): Promise<CoinGeckoMarketData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/global`);
    const data = await handleResponse<{ data: CoinGeckoMarketData }>(response);
    return data.data;
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
};

// Get detailed info for a specific coin
export const getCoinDetails = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`);
    return handleResponse<any>(response);
  } catch (error) {
    console.error(`Error fetching data for ${id}:`, error);
    throw error;
  }
};
