import React from 'react';
import { currencyFormatter } from '../../../shared/currencyFormatter';
import './styles.css';

interface Title {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
}

const Title = ({ amount, fromCurrency, toCurrency }: Title) => {
  return (
    <h1 className="convert-heading mb-8">
      Convert {amount} {currencyFormatter(fromCurrency)[1]} to{' '}
      {currencyFormatter(toCurrency)[1]} - {currencyFormatter(fromCurrency)[0]}{' '}
      to {currencyFormatter(toCurrency)[0]}
    </h1>
  );
};

export default Title;