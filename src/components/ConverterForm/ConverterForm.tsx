import React, { useEffect, useState } from 'react';
import {
  INITIAL_AMOUNT,
} from '../../constants/constants';
import * as apiService from '../../services/api.services';
import { Currency } from '../../interfaces/currency';
import Paper from '@mui/material/Paper';
import ConversionInfo from '../ConversionInfo/ConversionInfo';
import './styles.css';
import { currencyFormatter } from '../../shared/currencyFormatter';
import InputContainer from './InputsContainer/InputContainer';
import { Stack } from '@mui/material';
import ResultsContainer from '../Results/ResultsContainer';

const ConverterForm = () => {
  const [amount, setAmount] = useState<string | number>(INITIAL_AMOUNT);
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [currencyOptions, setCurrencyOptions] = useState<[string, Currency][]>(
    []
  );
  const [lastUpdateDate, setLastUpdateDate] = useState<string | undefined>();

  const setAmountValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    Number(e.target.value) > 0
      ? setAmount(Number(e.target.value))
      : setAmount(0);
  };

  const swapFromAndTo = (): void => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    console.log('swap from and to');
  };

  const focusCursorAtEndOfInput = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ): void => {
    let end = e.target.value.length;
    /**timeout makes it work with Chrome*/
    setTimeout(() => {
      e.target.setSelectionRange(end, end);
      e.target.focus();
    }, 0);
  };

  useEffect(() => {
    apiService.getCurrencies().then((currencies: any) => {
      const fromArray = Object.entries(currencies)[1];
      const toArray = Object.entries(currencies)[0];
      const fromObject = { ...fromArray };
      const fromString = `${fromObject[0]} - ${
        (fromObject[1] as Currency).name
      }`;
      setFromCurrency(fromString);

      const toObject = { ...toArray };
      const toString = `${toObject[0]} - ${(toObject[1] as Currency).name}`;
      setToCurrency(toString);
      setCurrencyOptions(Object.entries(currencies));
    });
  }, []);

  return (
    <>
      <div id="convert-container">
        <h1 className="convert-heading mb-8">
          Convert {amount} {currencyFormatter(fromCurrency)[1]} to{' '}
          {currencyFormatter(toCurrency)[1]} -{' '}
          {currencyFormatter(fromCurrency)[0]} to{' '}
          {currencyFormatter(toCurrency)[0]}
        </h1>
        <Paper id="convert-paper-container">
          <Stack id="stack-container" direction="row">
            <div id="inputs-container">
              <InputContainer
                amount={amount}
                setAmountValue={setAmountValue}
                focusCursorAtEndOfInput={focusCursorAtEndOfInput}
                currencyOptions={currencyOptions}
                fromCurrency={fromCurrency}
                setFromCurrency={setFromCurrency}
                setToCurrency={setToCurrency}
                swapFromAndTo={swapFromAndTo}
                toCurrency={toCurrency}
              />
            </div>
            <ResultsContainer
              amountToDisplay={amount}
              fromCurrencyToDisplay={fromCurrency}
              toCurrencyToDisplay={toCurrency}
              setLastUpdateDate={setLastUpdateDate}
            />
          </Stack>
        </Paper>
        <ConversionInfo
          fromInfo={fromCurrency}
          toInfo={toCurrency}
          lastUpdateDate={lastUpdateDate}
        />
      </div>
    </>
  );
};

export default ConverterForm;
