import { useEffect, useState } from 'react';
import * as apiService from '../../services/api.services';
import { ResultsDisplay } from '../../interfaces/resultsDisplay';
import './styles.css'
import warning from '../../assets/images/warning.svg'
import { currencyFormatter } from '../../shared/currencyFormatter';

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
    console.log('api', ratesResult);
    setLastUpdateDate(ratesResult?.date);
    let rate = ratesResult?.rates[currencyToDisplay.split('-')[0].trim()];
    if (rate !== undefined) {
      amountToDisplay = Number(amountToDisplay);
      conversionResult = amountToDisplay * rate;
    }
    return conversionResult;
  };

  useEffect(() => {
    if (!amountToDisplay) {
      setResult(0);
      setInverseResult(0);
      return
    }
    
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
      <div className="resultsContainer">
        <div className="results">
          <p className="result-equals lg:text-3xl font-semibold">
            {amountToDisplay} {currencyFormatter(fromCurrencyToDisplay)[1]} =
          </p>
          <p className="results-equals-right lg:text-[40px] lg:font-semibold">
            {result?.toFixed(4)} {currencyFormatter(toCurrencyToDisplay)[1]}
          </p>
        </div>
        <div className="results">
          <p className="result-equals lg:text-xl lg:font-semibold">
            {amountToDisplay} {currencyFormatter(toCurrencyToDisplay)[0]} ={' '}
            {inverseResult?.toFixed(4)}{' '}
            {currencyFormatter(fromCurrencyToDisplay)[0]}
          </p>
          <p className="result-equals lg:text-xl lg:font-semibold">
            {amountToDisplay} {currencyFormatter(fromCurrencyToDisplay)[0]} ={' '}
            {result?.toFixed(4)} {currencyFormatter(toCurrencyToDisplay)[0]}
          </p>
        </div>
        <div className="warning">
          <img src={warning} alt="" style={{ display: 'inline' }} />
          <p className="rounded-lg lg:w-4/5 text-xs font-normal ">
            We use the market rate. This is for informational purposes only.
          </p>
        </div>
      </div>
    </>
  );
};

export default ResultsContainer;
