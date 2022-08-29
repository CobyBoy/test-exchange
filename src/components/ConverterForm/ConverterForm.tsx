import React, { useEffect, useState } from 'react';
import { INITIAL_AMOUNT } from '../../constants/constants';
import * as apiService from '../../services/api.services';
import { Currency } from '../../interfaces/currency';
import Paper from '@mui/material/Paper';
import ConversionInfo from '../ConversionInfo/ConversionInfo';
import './styles.css';
import InputContainer from './InputsContainer/InputContainer';
import { Stack } from '@mui/material';
import ResultsContainer from '../Results/ResultsContainer';
import Title from './Title/Title';

const ConverterForm = () => {
  const [amount, setAmount] = useState<string>(INITIAL_AMOUNT);
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [currencyOptions, setCurrencyOptions] = useState<[string, Currency][]>(
    []
  );
  const [lastUpdateDate, setLastUpdateDate] = useState<string | undefined>();

  const setAmountValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('stat', e.target.value);
    const onlyNumbers = /^\d+\.?\d*$/g;
    const oneZero = /^[0][1-9]/g; //01
    const onlyTwoZeroes = /^[0]+[^\.]/g; //001
    const theresOnlyNumbers = onlyNumbers.test(e.target.value);
    const oneLeadingZero = oneZero.test(e.target.value);
    const tooManyLeadingZeros = onlyTwoZeroes.test(e.target.value);
    

    if (tooManyLeadingZeros) return;
    if (oneLeadingZero) return;
    if (!e.target.value) { setAmount(''); return; }
    if (theresOnlyNumbers) { setAmount(e.target.value); return; }
  };;

  const swapFromAndTo = (): void => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
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
        <Title
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
        />
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
