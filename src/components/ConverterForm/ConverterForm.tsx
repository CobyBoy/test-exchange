import React, { useEffect, useState } from 'react';
import { FROM_LABEL, INITIAL_AMOUNT, To_LABEL } from '../../constants/constants';
import CurrencyInputs from './CurrencyInputs/CurrencyInputs';
import * as apiService from '../../services/api.services'
import { Currency } from '../../interfaces/currency';
import ResultsContainer from '../Results/ResultsContainer';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import ConversionInfo from '../ConversionInfo/ConversionInfo';

const ConverterForm = () => {
  const [amount, setAmount] = useState<string | number>(INITIAL_AMOUNT);
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [currencyOptions, setCurrencyOptions] = useState<[string, Currency][]>([]);

  const setAmountValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    (Number(e.target.value) > 0)? setAmount(Number(e.target.value)) : setAmount(0);
  };

   useEffect(() => {
     apiService.getCurrencies().then((currencies: any) => {
       const fromArray = Object.entries(currencies)[1];
       const toArray = Object.entries(currencies)[0];
       const fromObject = { ...fromArray };
       const fromString = `${fromObject[0]} - ${(fromObject[1] as Currency).name}`;
       setFromCurrency(fromString);

       const toObject = { ...toArray };
       const toString = `${toObject[0]} - ${(toObject[1] as Currency).name}`;
       setToCurrency(toString);
       setCurrencyOptions(Object.entries(currencies));
     });
     //{ setCurrencyOptions(Object.entries(currencies)) }
   }, []);
  
  return (
    <>
      <h1>
        <p
          className="text-white text-2x1 mb-10 font-semibold"
          style={{ fontSize: '34px', lineHeight: '39.88px' }}
        >
          Convert {amount} {fromCurrency.split('-')[1]} to{' '}
          {toCurrency.split('-')[1]} -{' '}
          {fromCurrency.split('-')[0]} to{' '}
          {toCurrency.split('-')[0]}
        </p>
      </h1>
      <Paper sx={{ p: 2 }}>
        <Stack direction="row">
          <div style={{ width: '50%', border: '1px solid black' }}>
            <div className="col-span-3 sm:col-span-2">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-500 text-left"
              >
                Amount
              </label>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmountValue(e)}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none border-gray-300 text-right"
              />
            </div>

            <CurrencyInputs
              selectLabel={FROM_LABEL}
              currency={fromCurrency}
              currencyOptions={currencyOptions}
              onSelectChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFromCurrency(e.target.value)
              }
            />
            <CurrencyInputs
              selectLabel={To_LABEL}
              currency={toCurrency}
              currencyOptions={currencyOptions}
              onSelectChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setToCurrency(e.target.value)
              }
            />
          </div>
          <ResultsContainer
            amountToDisplay={amount}
            fromCurrencyToDisplay={fromCurrency}
            toCurrencyToDisplay={toCurrency}
          />
        </Stack>
      </Paper>
      <ConversionInfo fromInfo={fromCurrency} toInfo={toCurrency} />
    </>
  );
};

export default ConverterForm;
