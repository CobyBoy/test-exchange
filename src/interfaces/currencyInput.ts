import { Currency } from "./currency";

export interface currencyInput {
  selectLabel: string;
  currency: string;
  currencyOptions: [string, Currency][];
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}