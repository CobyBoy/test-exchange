import React, { useEffect, useState } from 'react';
import {
  FROM_LABEL,
  INITIAL_AMOUNT,
  To_LABEL,
} from '../../constants/constants';
import CurrencyInputs from './CurrencyInputs/CurrencyInputs';
import * as apiService from '../../services/api.services';
import { Currency } from '../../interfaces/currency';
import ResultsContainer from '../Results/ResultsContainer';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import ConversionInfo from '../ConversionInfo/ConversionInfo';
import imgSvg from '../../assets/images/Trade.svg';
import './styles.css';
import { currencyFormatter } from '../../shared/currencyFormatter';

const ConverterForm = () => {
  const [amount, setAmount] = useState<string | number>(INITIAL_AMOUNT);
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [currencyOptions, setCurrencyOptions] = useState<[string, Currency][]>(
    []
  );
  const [lastUpdateDate, setLastUpdateDate] = useState<string | undefined>();

  const setAmountValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    Number(e.target.value) > 0
      ? setAmount(Number(e.target.value))
      : setAmount(0);
  };

  const swapFromAndTo = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    console.log('revert from and to');
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
        <h1 className="convert-heading">
          <p className="convert-heading mb-10">
            Convert {amount} {currencyFormatter(fromCurrency)[1]} to{' '}
            {currencyFormatter(toCurrency)[1]} -{' '}
            {currencyFormatter(fromCurrency)[0]} to{' '}
            {currencyFormatter(toCurrency)[0]}
          </p>
        </h1>
        <Paper
          sx={{
            p: 2,
            width: '97%',
            height: '522px',
            margin: 'auto',
            borderRadius: '8px',
            border: '1px #E7EAF3',
            boxShadow: '0px 0px 12px rgbs(140, 152, 164, 0.08)',
          }}
        >
          <Stack direction="row" style={{ padding: '80px', height: '100%' }}>
            <div id='inputs-container'>
              <div className="col-span-3 sm:col-span-2" style={{display: 'flex', flexDirection: 'column'}}>
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
                />
              </div>
              <div style={{ display: 'flex' }}>
                <CurrencyInputs
                  selectLabel={FROM_LABEL}
                  currency={fromCurrency}
                  currencyOptions={currencyOptions}
                  onSelectChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setFromCurrency(e.target.value)
                  }
                />
                <div
                  style={{
                    paddingTop: '2.5%',
                    marginLeft: '10px',
                  }}
                >
                  <img
                    src={imgSvg}
                    alt="trade-icon"
                    style={{
                      border: '#00AEEF solid 1px',
                      borderRadius: '100%',
                      padding: '10px',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      swapFromAndTo();
                    }}
                  />
                </div>
              </div>

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
