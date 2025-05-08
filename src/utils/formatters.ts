
// Format currency with appropriate symbol
export const formatCurrency = (
  value: number,
  currency: string = 'usd',
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2
): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits,
    maximumFractionDigits,
  });
  
  return formatter.format(value);
};

// Format large numbers with abbreviations (K, M, B, T)
export const formatNumber = (num: number): string => {
  if (num === null || num === undefined || isNaN(num)) {
    return 'N/A';
  }

  if (Math.abs(num) < 1000) {
    return num.toFixed(2);
  }

  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  const abbreviations = [
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
  ];

  for (const abbreviation of abbreviations) {
    if (absNum >= abbreviation.value) {
      return sign + (absNum / abbreviation.value).toFixed(2) + abbreviation.symbol;
    }
  }

  return num.toString();
};

// Format percentage values
export const formatPercentage = (value: number | null | undefined): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return 'N/A';
  }
  
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
};

// Format time periods for chart displays
export const formatTimePeriod = (period: string): string => {
  switch (period) {
    case '1h': return '1 Hour';
    case '24h': return '24 Hours';
    case '7d': return '7 Days';
    case '30d': return '30 Days';
    case '90d': return '3 Months';
    case '1y': return '1 Year';
    case 'max': return 'All Time';
    default: return period;
  }
};

// Format date for chart tooltips
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// Format time for chart tooltips
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Format date and time for chart tooltips
export const formatDateTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return `${formatDate(timestamp)} ${formatTime(timestamp)}`;
};

// Get time period in days for API requests
export const getTimePeriodDays = (period: string): string => {
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
