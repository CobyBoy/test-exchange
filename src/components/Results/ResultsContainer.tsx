import { useEffect, useState } from 'react';
import * as apiService from '../../services/api.services';
import { ResultsDisplay } from '../../interfaces/resultsDisplay';
import './styles.css'

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
      console.log('no cuurencies... returning');
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
      <div  className='resultsContainer'>
        <div className="results">
          <p>
            {amountToDisplay} {fromCurrencyToDisplay.split('-')[1]} =
          </p>
          <p>
            {result?.toFixed(4)} {toCurrencyToDisplay.split('-')[1]}
          </p>
        </div>
        <div className="results">
          <p>
            {amountToDisplay} {toCurrencyToDisplay.split('-')[0]} ={' '}
            {inverseResult?.toFixed(4)} {fromCurrencyToDisplay.split('-')[0]}
          </p>
          <p>
            {amountToDisplay} {fromCurrencyToDisplay.split('-')[0]} ={' '}
            {result?.toFixed(4)} {toCurrencyToDisplay.split('-')[0]}
          </p>
        </div>
        <div className="results">
          <p>We use the market rate. This is for information purpose only</p>
        </div>
      </div>
    </>
  );
};

export default ResultsContainer;
