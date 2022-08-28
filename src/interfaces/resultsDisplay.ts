export interface ResultsDisplay {
  amountToDisplay: string | number;
  fromCurrencyToDisplay: string;
  toCurrencyToDisplay: string;
  setLastUpdateDate: React.Dispatch<React.SetStateAction<string | undefined>>;
}