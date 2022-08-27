import { useEffect, useState } from 'react';
import * as apiService from '../../services/api.services';
interface ResultsDisplay {
  amountToDisplay: string | number;
  fromCurrencyToDisplay: string;
    toCurrencyToDisplay: string;
    setLastUpdateDate: React.Dispatch<React.SetStateAction<string | undefined>>
}

const ResultsContainer = ({
  amountToDisplay,
  fromCurrencyToDisplay,
  toCurrencyToDisplay,
  setLastUpdateDate,
}: ResultsDisplay) => {
  const [result, setResult] = useState<number>();
  const [inverseResult, setInverseResult] = useState<number>();

  const getResults = async (
    currencyBase: string,
    currencyToDisplay: string
  ) => {
    let conversionResult: number = 0;

    let ratesResult = await apiService.getBaseRate(currencyBase.split('-')[0]);
    setLastUpdateDate(ratesResult?.date);
    let rate = ratesResult?.rates[currencyToDisplay.split('-')[0].trim()];
    if (rate !== undefined) {
      conversionResult = ~~amountToDisplay * rate;
    }
    return conversionResult;
  };

  useEffect(() => {
    if (!fromCurrencyToDisplay || !toCurrencyToDisplay) {
      console.log('no cuurenc... returning');
      return;
    }
    let result = getResults(fromCurrencyToDisplay, toCurrencyToDisplay);
    result.then((res) => {
      setResult(res);
    });

    let inverseResult = getResults(toCurrencyToDisplay, fromCurrencyToDisplay);
    inverseResult.then((res) => {
      setInverseResult(res);
    });
  }, [fromCurrencyToDisplay, amountToDisplay, toCurrencyToDisplay]);
  return (
    <>
      <div style={{ width: '50%', border: '1px solid black' }}>
        <h1 className="text-orange-300 text-2x1 mb-10 font-semibold">
          ResultsContainer
        </h1>
        <div>
          <p>
            {amountToDisplay} {fromCurrencyToDisplay.split('-')[1]} =
          </p>
          <p>
            {result?.toFixed(4)} {toCurrencyToDisplay.split('-')[1]}
          </p>
        </div>
        <div>
          <p>
            {amountToDisplay} {toCurrencyToDisplay.split('-')[0]} ={' '}
            {inverseResult?.toFixed(4)} {fromCurrencyToDisplay.split('-')[0]}
          </p>
          <p>
            {amountToDisplay} {fromCurrencyToDisplay.split('-')[0]} ={' '}
            {result?.toFixed(4)} {toCurrencyToDisplay.split('-')[0]}
          </p>
        </div>
      </div>
    </>
  );
};

export default ResultsContainer;
