import React, { useEffect, useState } from 'react';
import { RatesResult } from '../../interfaces/rates';
import * as apiService from '../../services/api.services';
interface ResultsDisplay {
  amountToDisplay: string | number;
  fromCurrencyToDisplay: string;
  toCurrencyToDisplay: string;
}

const ResultsContainer = ({
  amountToDisplay,
  fromCurrencyToDisplay,
  toCurrencyToDisplay,
}: ResultsDisplay) => {
  const [result, setResult] = useState<number>();
    const [inverseResult, setInverseResult] = useState<number>();

  useEffect(() => {
    if (!fromCurrencyToDisplay || !toCurrencyToDisplay) {
      console.log('no cuurenc... returning');
      return;
    }
    apiService
      .getBaseRate(fromCurrencyToDisplay.split('-')[0])
      .then((ratesResult) => {
        let toRate =
          ratesResult?.rates[toCurrencyToDisplay.split('-')[0].trim()];
        if (toRate !== undefined) {
          let conversionResult = ~~amountToDisplay * toRate;
          setResult(conversionResult);
          console.log(`resultado: ${conversionResult}`);
        }

        console.log('r', ratesResult);
      });

    apiService
      .getBaseRate(toCurrencyToDisplay.split('-')[0])
      .then((ratesResult) => {
        let toRate =
          ratesResult?.rates[fromCurrencyToDisplay.split('-')[0].trim()];
        if (toRate !== undefined) {
          let conversionResult = ~~amountToDisplay * toRate;
          setInverseResult(conversionResult);
          console.log(`resultado: ${conversionResult}`);
        }

        console.log('r', ratesResult);
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
            {amountToDisplay} {toCurrencyToDisplay.split('-')[0]} = {inverseResult?.toFixed(4)} {fromCurrencyToDisplay.split('-')[0]}
          </p>
          <p>
            {amountToDisplay} {fromCurrencyToDisplay.split('-')[0]} = {result?.toFixed(4)} {toCurrencyToDisplay.split('-')[0]}
          </p>
        </div>
      </div>
    </>
  );
};

export default ResultsContainer;
