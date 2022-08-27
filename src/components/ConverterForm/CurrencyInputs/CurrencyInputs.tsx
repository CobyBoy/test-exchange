import React, { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Currency, CurrencyResult } from '../../../interfaces/currency';
import { RatesResult } from '../../../interfaces/rates';
import * as apiService from '../../../services/api.services';
interface Props {
  selectLabel: string;
  currency: string;
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const baseCurrencies: RatesResult = {
  date: '2022-08-25',
  base: 'USD',
  rates: {
    EUR: 1.0030090270812437,
    USD: 1.0,
    JPY: 136.47943831494482,
    BGN: 1.9616850551654965,
    CZK: 24.722166499498496,
    DKK: 7.459779338014043,
    GBP: 0.8454663991975927,
    HUF: 410.160481444333,
    PLN: 4.772116349047141,
    RON: 4.890471414242728,
    SEK: 10.584252758274825,
    CHF: 0.964493480441324,
    ISK: 140.7221664994985,
    NOK: 9.66900702106319,
    HRK: 7.536609829488466,
    TRY: 18.166499498495483,
    AUD: 1.4349047141424274,
    BRL: 5.103209628886661,
    CAD: 1.29197592778335,
    CNY: 6.852256770310932,
    HKD: 7.846940822467403,
    IDR: 14797.542627883651,
    ILS: 3.2889669007021065,
    INR: 79.89518555667001,
    KRW: 1335.987963891675,
    MXN: 19.872818455366097,
    MYR: 4.472016048144433,
    NZD: 1.6054162487462387,
    PHP: 56.01003009027081,
    SGD: 1.3898696088264795,
    THB: 35.839518555667,
    ZAR: 16.840822467402205,
  },
};
const CurrencyInputs = ({ selectLabel, currency }: Props) => {
  const [selected, setSelected] = useState(currency);
  const [baseCurrency, setBaseCurrency] = useState<string>(baseCurrencies.base);
  const [currencyOptions, setCurrencyOptions] = useState<[string, Currency][]>(
    []
  );

  useEffect(() => {
    apiService.getCurrencies().then((currencies: any) => {
      setCurrencyOptions(Object.entries(currencies));
    });
    //{ setCurrencyOptions(Object.entries(currencies)) }
  }, []);

  return (
    <>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              {selectLabel}
            </Listbox.Label>
            <div className="mt-1 relative">
              <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">{selected}</span>
                </span>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {currencyOptions?.map(([key, { name, symbol }]) => (
                  <Listbox.Option
                    key={key}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={`${key} - ${name}`}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate'
                            )}
                          >
                            {name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </>
        )}
      </Listbox>
    </>
  );
};

export default CurrencyInputs;
