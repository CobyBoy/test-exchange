import { useEffect, useState } from 'react';
import * as apiService from '../../services/api.services';
import { ResultsDisplay } from '../../interfaces/resultsDisplay';
import Results from './Results';

const ResultsContainer = ({
  amountToDisplay,
  fromCurrencyToDisplay,
  toCurrencyToDisplay,
  setLastUpdateDate,
}: ResultsDisplay) => {
  const [result, setResult] = useState<number>();
  const [inverseResult, setInverseResult] = useState<number>();

  const getRate = async (currencyBase: string, currencyToDisplay: string) => {
    let conversionRate: number = 0;
    let baseRate = await apiService.getBaseRate(currencyBase.split('-')[0]);
    console.log('api', baseRate);
    setLastUpdateDate(baseRate?.date);
    let rate = baseRate?.rates[currencyToDisplay.split('-')[0].trim()];
    if (rate !== undefined) {
      conversionRate = rate;
    }
    return conversionRate;
  };

  useEffect(() => {
    if (!amountToDisplay) {
      setResult(0);
      setInverseResult(0);
      return;
    }

    if (!fromCurrencyToDisplay || !toCurrencyToDisplay) {
      console.log('no cuurencies... returning');
      return;
    }

    const ratesPromise = getRate(fromCurrencyToDisplay, toCurrencyToDisplay);
    ratesPromise.then((rate) => {
      let conversionResult: number = 0;
      let inverseConversionResult: number = 0;
      amountToDisplay = Number(amountToDisplay);
      conversionResult = amountToDisplay * rate;
      inverseConversionResult = amountToDisplay / rate;
      setResult(conversionResult);
      setInverseResult(inverseConversionResult);
    });
  }, [fromCurrencyToDisplay, amountToDisplay, toCurrencyToDisplay]);

  return (
    <>
      <Results
        amountToDisplay={amountToDisplay}
        toCurrencyToDisplay={toCurrencyToDisplay}
        fromCurrencyToDisplay={fromCurrencyToDisplay}
        inverseResult={inverseResult}
        result={result}
      />
    </>
  );
};

export default ResultsContainer;
