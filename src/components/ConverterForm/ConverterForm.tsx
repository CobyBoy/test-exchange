import React, { useState } from 'react';
import { INITIAL_AMOUNT } from '../../constants/constants';
import CurrencyInputs from './CurrencyInputs/CurrencyInputs';

const ConverterForm = () => {
  const [amount, setAmount] = useState<string | number>(INITIAL_AMOUNT);
  const [fromCurrency, setFromCurrency] = useState<string>('yes');
  const [toCurrency, setToCurrency] = useState<string>('no');

  const setValueAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value ? setAmount(Number(e.target.value)) : setAmount('');
  };
  return (
    <>
      <div
        className="mt-1 relative rounded-md shadow-sm"
        style={{ width: '50%' }}
      >
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 text-left"
        >
          Amount
        </label>
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setValueAmount(e)}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        <CurrencyInputs selectLabel={'From'} currency={fromCurrency} />
        <CurrencyInputs selectLabel={'To'} currency={toCurrency} />
      </div>
    </>
  );
};

export default ConverterForm;
