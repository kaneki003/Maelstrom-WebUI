export interface PoolMock {
  slug: string;            
  symbol: string;         
  name: string;           
  logoUrl?: string;
  priceUSD: number;
  priceChange24hPct: number;
  liquidityUSD: number;
  lastExchangeTs: number;  // unix timestamp
  priceHistory24h: number[]; // small array for sparkline
}

// Function to format currency in compact notation
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2
  }).format(value);
}

// Function to format relative time
export function formatRelativeTime(timestamp: number): string {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const diff = Math.floor((timestamp - Date.now()) / 1000);

  if (Math.abs(diff) < 60) return "just now";
  
  const minutes = Math.floor(diff / 60);
  if (Math.abs(minutes) < 60) return rtf.format(minutes, "minute");
  
  const hours = Math.floor(minutes / 60);
  if (Math.abs(hours) < 24) return rtf.format(hours, "hour");
  
  const days = Math.floor(hours / 24);
  return rtf.format(days, "day");
}

// Function to format percentage with + sign for positive values
export function formatPercentage(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}
