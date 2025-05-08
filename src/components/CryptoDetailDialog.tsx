
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Cryptocurrency } from '@/types/crypto';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import PriceChange from '@/components/PriceChange';
import PriceChart from '@/components/PriceChart';

interface CryptoDetailDialogProps {
  crypto: Cryptocurrency | null;
  isOpen: boolean;
  onClose: () => void;
}

const CryptoDetailDialog = ({ crypto, isOpen, onClose }: CryptoDetailDialogProps) => {
  if (!crypto) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-crypto-bg-card text-crypto-text-primary border-crypto-accent-blue/20 max-w-4xl w-[90vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <img 
              src={crypto.image} 
              alt={crypto.name} 
              className="w-8 h-8 rounded-full"
            />
            <div>
              {crypto.name} <span className="text-crypto-text-secondary ml-1 text-sm">({crypto.symbol.toUpperCase()})</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-crypto-bg-dark p-4 rounded-md">
            <p className="text-xs text-crypto-text-secondary mb-1">Price</p>
            <p className="text-xl font-medium">{formatCurrency(crypto.current_price)}</p>
            <PriceChange value={crypto.price_change_percentage_24h} className="mt-1" />
          </div>
          
          <div className="bg-crypto-bg-dark p-4 rounded-md">
            <p className="text-xs text-crypto-text-secondary mb-1">Market Cap</p>
            <p className="text-xl font-medium">{formatCurrency(crypto.market_cap, 'usd', 0)}</p>
            <p className="text-xs text-crypto-text-secondary mt-1">Rank #{crypto.market_cap_rank}</p>
          </div>
          
          <div className="bg-crypto-bg-dark p-4 rounded-md">
            <p className="text-xs text-crypto-text-secondary mb-1">24h Volume</p>
            <p className="text-xl font-medium">{formatCurrency(crypto.total_volume, 'usd', 0)}</p>
          </div>
        </div>
        
        <PriceChart 
          coinId={crypto.id} 
          name={crypto.name}
          currentPrice={crypto.current_price}
        />
        
        <Separator className="my-4 bg-crypto-accent-blue/10" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm text-crypto-text-secondary mb-2">Supply Information</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-crypto-text-secondary">Circulating Supply</span>
                <span>{formatNumber(crypto.circulating_supply)} {crypto.symbol.toUpperCase()}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-crypto-text-secondary">Total Supply</span>
                <span>{formatNumber(crypto.total_supply || 0)} {crypto.symbol.toUpperCase()}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm text-crypto-text-secondary mb-2">Price Statistics</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-crypto-text-secondary">All Time High</span>
                <span>{formatCurrency(crypto.ath)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-crypto-text-secondary">ATH Change</span>
                <PriceChange value={crypto.ath_change_percentage} />
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CryptoDetailDialog;
