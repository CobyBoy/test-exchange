export interface RatesResult {
  date: string;
  base: string;
  rates: Rates;
}

export interface Rates {
    [key: string]: number;
}