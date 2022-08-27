export interface CurrencyResult {
    [key: string]: Currency
}

export interface Currency {
  name: string;
  symbol: string;
}