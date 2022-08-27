import React, { useEffect, useState } from 'react';
import { INITIAL_AMOUNT } from '../../constants/constants';
import CurrencyInputs from './CurrencyInputs/CurrencyInputs';
import * as apiService from '../../services/api.services'
import { Currency } from '../../interfaces/currency';

const ConverterForm = () => {
  const [amount, setAmount] = useState<string | number>(INITIAL_AMOUNT);
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [currencyOptions, setCurrencyOptions] = useState<[string, Currency][]>([]);

  const setValueAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value ? setAmount(Number(e.target.value)) : setAmount('');
  };

   useEffect(() => {
     apiService.getCurrencies().then((currencies: any) => {
       const fromArray = Object.entries(currencies)[1];
       const toArray = Object.entries(currencies)[0];
       const fromObject = { ...fromArray };
       const fromString = `${fromObject[0]} - ${(fromObject[1] as Currency).name}`;
       setFromCurrency(fromString);

       const toObject = { ...toArray };
       const toString = `${toObject[0]}, ${(toObject[1] as Currency).name}`;
       setToCurrency(toString);
       setCurrencyOptions(Object.entries(currencies));
     });
     //{ setCurrencyOptions(Object.entries(currencies)) }
   }, []);
  
  return (
    <>
      <div style={{ width: '50%', border: '1px solid black' }}>
        <div className="col-span-3 sm:col-span-2">
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
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none border-gray-300 text-right"
          />
        </div>

        <CurrencyInputs
          selectLabel={'From'}
          currency={fromCurrency}
          currencyOptions={currencyOptions}
          onSelectChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFromCurrency(e.target.value)
          }
        />
        <CurrencyInputs
          selectLabel={'To'}
          currency={toCurrency}
          currencyOptions={currencyOptions}
          onSelectChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setToCurrency(e.target.value)
          }
        />
      </div>
    </>
  );
};

export default ConverterForm;
