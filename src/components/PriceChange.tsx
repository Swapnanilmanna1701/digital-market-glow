
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { formatPercentage } from '@/utils/formatters';
import { cn } from '@/lib/utils';

interface PriceChangeProps {
  value: number | null | undefined;
  className?: string;
  showIcon?: boolean;
  showValue?: boolean;
}

const PriceChange = ({
  value,
  className = '',
  showIcon = true,
  showValue = true,
}: PriceChangeProps) => {
  if (value === null || value === undefined || isNaN(value)) {
    return <span className="text-crypto-text-secondary">N/A</span>;
  }

  const isPositive = value >= 0;
  const textColor = isPositive ? 'text-crypto-up' : 'text-crypto-down';

  return (
    <div className={cn('flex items-center gap-1', textColor, className)}>
      {showIcon && (
        <div className="shrink-0">
          {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
        </div>
      )}
      {showValue && <span>{formatPercentage(value)}</span>}
    </div>
  );
};

export default PriceChange;
