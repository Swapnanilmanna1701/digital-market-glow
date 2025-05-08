
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const CryptoCardSkeleton = () => {
  return (
    <Card className="bg-crypto-bg-card border-crypto-accent-blue/10 overflow-hidden">
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full bg-crypto-accent-blue/10" />
          <div className="flex-1">
            <Skeleton className="h-4 w-24 bg-crypto-accent-blue/10" />
            <Skeleton className="h-3 w-12 mt-1 bg-crypto-accent-blue/10" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <Skeleton className="h-4 w-16 bg-crypto-accent-blue/10" />
            <Skeleton className="h-3 w-10 bg-crypto-accent-blue/10" />
          </div>
        </div>
        
        <Skeleton className="h-12 w-full bg-crypto-accent-blue/10" />
        
        <div className="flex justify-between">
          <Skeleton className="h-3 w-24 bg-crypto-accent-blue/10" />
          <Skeleton className="h-3 w-16 bg-crypto-accent-blue/10" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoCardSkeleton;
