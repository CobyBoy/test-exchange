import React from 'react'
import { currencyFormatter } from '../../shared/currencyFormatter';
import warning from '../../assets/images/warning.svg'
import './styles.css'

interface Result {
  amountToDisplay:string | number;
  fromCurrencyToDisplay:string;
  toCurrencyToDisplay:string;
  inverseResult: number | undefined;
  result: number | undefined;
}

const Results = ({
  amountToDisplay,
  fromCurrencyToDisplay,
  toCurrencyToDisplay,
  inverseResult,
  result,
}: Result) => {
  return (
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
  );
};

export default Results