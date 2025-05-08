
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Cryptocurrency } from '@/types/crypto';
import { searchCryptocurrencies } from '@/services/cryptoService';
import { formatCurrency } from '@/utils/formatters';
import PriceChange from '@/components/PriceChange';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSelectCrypto: (crypto: Cryptocurrency) => void;
}

const SearchBar = ({ onSelectCrypto }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Cryptocurrency[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchRef]);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await searchCryptocurrencies(query);
        setResults(data);
        setIsOpen(data.length > 0);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleSelect = (crypto: Cryptocurrency) => {
    onSelectCrypto(crypto);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:w-80" ref={searchRef}>
      <div className="flex">
        <Input
          className="bg-crypto-bg-card border-crypto-accent-blue/20 placeholder:text-crypto-text-secondary/70 focus-visible:ring-crypto-accent-blue"
          placeholder="Search cryptocurrencies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
        />
        <Button
          variant="ghost"
          className="ml-2 bg-crypto-accent-blue/10 hover:bg-crypto-accent-blue/20 text-crypto-accent-blue"
          size="icon"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-crypto-bg-card border border-crypto-accent-blue/20 rounded-md shadow-lg z-50 max-h-80 overflow-auto">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="animate-pulse-blue h-6 w-6 rounded-full mx-auto"></div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-crypto-text-secondary">
              No results found
            </div>
          ) : (
            <ul>
              {results.map((crypto) => (
                <li
                  key={crypto.id}
                  className="border-b border-crypto-accent-blue/10 last:border-0 p-3 hover:bg-crypto-accent-blue/10 cursor-pointer transition-colors"
                  onClick={() => handleSelect(crypto)}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={crypto.image} 
                      alt={crypto.name} 
                      className="w-6 h-6 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{crypto.name}</p>
                      <p className="text-xs text-crypto-text-secondary">{crypto.symbol.toUpperCase()}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-sm">{formatCurrency(crypto.current_price)}</p>
                      <PriceChange value={crypto.price_change_percentage_24h} className="text-xs" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
