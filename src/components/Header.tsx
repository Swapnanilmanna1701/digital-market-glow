
import React from 'react';
import SearchBar from '@/components/SearchBar';
import { Cryptocurrency } from '@/types/crypto';

interface HeaderProps {
  onSelectCrypto: (crypto: Cryptocurrency) => void;
}

const Header = ({ onSelectCrypto }: HeaderProps) => {
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-crypto-accent-blue to-blue-400 bg-clip-text text-transparent">
            Crypto Tracker
          </h1>
          <p className="text-crypto-text-secondary mt-1">
            Real-time cryptocurrency prices and market data
          </p>
        </div>
        <SearchBar onSelectCrypto={onSelectCrypto} />
      </div>
    </header>
  );
};

export default Header;
