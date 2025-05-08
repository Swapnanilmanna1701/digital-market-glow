
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import { Cryptocurrency } from '@/types/crypto';
import { Button } from './ui/button';
import { Home } from 'lucide-react';

interface HeaderProps {
  onSelectCrypto: (crypto: Cryptocurrency) => void;
}

const Header = ({ onSelectCrypto }: HeaderProps) => {
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-crypto-accent-blue to-blue-400 bg-clip-text text-transparent">
            Crypto Tracker
          </h1>
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-crypto-text-secondary">
              <Home className="h-4 w-4 mr-1" /> Landing
            </Button>
          </Link>
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
