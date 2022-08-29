import { currencyInput } from '../../../interfaces/currencyInput';
import './styles.css'

const CurrencyInputs = ({
  selectLabel,
  currency,
  currencyOptions,
  onSelectChange,
}: currencyInput) => {
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
            className="text-base"
          >
            {currencyOptions.map(([key, { name }]) => (
              <option
                value={`${key} - ${name}`}
                key={key}
                className="text-base"
              >{`${key} - ${name}`}</option>
            ))}
          </select>
        </div>
      </section>
    </>
  );
};

export default CurrencyInputs;
