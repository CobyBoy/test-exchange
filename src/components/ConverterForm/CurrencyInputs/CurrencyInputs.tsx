import { Currency } from '../../../interfaces/currency';
interface Props {
  selectLabel: string;
  currency: string;
  currencyOptions: [string, Currency][];
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CurrencyInputs = ({
  selectLabel,
  currency,
  currencyOptions,
  onSelectChange,
}: Props) => {
  return (
    <>
      <section>
        <label
          htmlFor="selectCurrency"
          className="block text-sm font-medium text-gray-500 text-left"
        >
          {selectLabel}
        </label>
        <div>
          <select
            name="currencySelect"
            id="selectCurrency"
            value={currency}
            onChange={onSelectChange}
            style={{width: '100%'}}
          >
            {currencyOptions.map(([key, { name }]) => (
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
