import React from 'react';
import { FROM_LABEL, TO_LABEL } from '../../../constants/constants';
import { Currency } from '../../../interfaces/currency';
import AmountInput from '../AmountInput/AmountInput';
import CurrencyInputs from '../CurrencyInputs/CurrencyInputs';
import SwapButton from '../SwapButton/SwapButton';
import './styles.css'

interface Input {
  amount: string | number;
  currencyOptions: [string, Currency][];
  focusCursorAtEndOfInput: (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => void;
  fromCurrency: string;
  setAmountValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFromCurrency: (value: React.SetStateAction<string>) => void;
  setToCurrency: (value: React.SetStateAction<string>) => void;
  swapFromAndTo: () => void;
  toCurrency: string;
}
const InputContainer = ({
  amount,
  currencyOptions,
  setAmountValue,
  focusCursorAtEndOfInput,
  fromCurrency,
  setFromCurrency,
  setToCurrency,
  swapFromAndTo,
  toCurrency,
}: Input) => {
  return (
    <>
      <AmountInput
        amount={amount}
        focusCursorAtEndOfInput={focusCursorAtEndOfInput}
        setAmountValue={setAmountValue}
      />
      <div id='from-and-button-container'>
        <CurrencyInputs
          selectLabel={FROM_LABEL}
          currency={fromCurrency}
          currencyOptions={currencyOptions}
          onSelectChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFromCurrency(e.target.value)
          }
        />
        <SwapButton swapFromAndTo={swapFromAndTo} />
      </div>

      <CurrencyInputs
        selectLabel={TO_LABEL}
        currency={toCurrency}
        currencyOptions={currencyOptions}
        onSelectChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setToCurrency(e.target.value)
        }
      />
    </>
  );
};

export default InputContainer;
