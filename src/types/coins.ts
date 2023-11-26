export type Coin = {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: number;
  changePercent24Hr: number;
  vwap24Hr: number | string;
  explorer: string;
  biggerPrice: boolean;
  smallerPrice: boolean;
}