import React from 'react';
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
            {amountToDisplay} {toCurrencyToDisplay.split('-')[1]}
          </p>
        </div>
        <div>
          <p>
            {amountToDisplay} {toCurrencyToDisplay.split('-')[0]} ={' '}
            {amountToDisplay} {fromCurrencyToDisplay.split('-')[0]}
          </p>
          <p>
            {' '}
            {amountToDisplay} {fromCurrencyToDisplay.split('-')[0]} ={' '}
            {amountToDisplay} {toCurrencyToDisplay.split('-')[0]}
          </p>
        </div>
      </div>
    </>
  );
};

export default ResultsContainer;
