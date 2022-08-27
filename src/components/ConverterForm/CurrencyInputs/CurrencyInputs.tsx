import { Currency } from '../../../interfaces/currency';
import { RatesResult } from '../../../interfaces/rates';
interface Props {
  selectLabel: string;
  currency: string;
  currencyOptions: [string, Currency][];
  onSelectChange: (e:React.ChangeEvent<HTMLSelectElement>) => void;
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
const CurrencyInputs = ({
  selectLabel,
  currency,
  currencyOptions,
  onSelectChange,
}: Props) => {
  return (
    <>
      <section>
        <label htmlFor="selectCurrency">{selectLabel}</label>
        <div>
          <select
            name="currencySelect"
            id="selectCurrency"
            value={currency}
            onChange={onSelectChange}
          >
            {currencyOptions.map(([key, { name, symbol }]) => (
              <option
                value={`${key} - ${name}`}
                key={key}
              >{`${key} - ${name}`}</option>
            ))}
          </select>
        </div>
      </section>
    </>
  );
};

export default CurrencyInputs;