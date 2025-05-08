
import React, { useState } from 'react';
import { useCryptocurrencies } from '@/hooks/useCryptoData';
import { Cryptocurrency } from '@/types/crypto';
import Header from '@/components/Header';
import CryptoCard from '@/components/CryptoCard';
import CryptoCardSkeleton from '@/components/CryptoCardSkeleton';
import CryptoDetailDialog from '@/components/CryptoDetailDialog';
import MarketOverview from '@/components/MarketOverview';
import { toast } from '@/components/ui/sonner';

const Index = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<Cryptocurrency | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Fetch cryptocurrencies list
  const { data: cryptos, isLoading, isError } = useCryptocurrencies();

  // Handle selecting a crypto
  const handleSelectCrypto = (crypto: Cryptocurrency) => {
    setSelectedCrypto(crypto);
    setIsDialogOpen(true);
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Show error toast if API fails
  if (isError) {
    toast.error("Failed to load cryptocurrency data. Please try again later.");
  }

  return (
    <div className="min-h-screen bg-crypto-bg-dark text-white pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Header onSelectCrypto={handleSelectCrypto} />
        
        <MarketOverview />
        
        <h2 className="text-xl font-bold mt-8 mb-4">Top Cryptocurrencies</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading ? (
            // Show skeletons while loading
            Array.from({ length: 12 }).map((_, index) => (
              <CryptoCardSkeleton key={index} />
            ))
          ) : cryptos ? (
            // Show crypto cards
            cryptos.map(crypto => (
              <CryptoCard 
                key={crypto.id} 
                crypto={crypto} 
                onClick={handleSelectCrypto} 
              />
            ))
          ) : (
            // Show message if no data
            <div className="col-span-full text-center py-8 text-crypto-text-secondary">
              No cryptocurrency data available
            </div>
          )}
        </div>
        
        {/* Crypto detail dialog */}
        <CryptoDetailDialog 
          crypto={selectedCrypto} 
          isOpen={isDialogOpen} 
          onClose={handleCloseDialog} 
        />
      </div>
    </div>
  );
};

export default Index;
