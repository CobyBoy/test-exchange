import React from 'react'
import './styles.css'

interface AmountInput {
  amount: string | number;
  setAmountValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  focusCursorAtEndOfInput: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const AmountInput = ({
  amount,
  setAmountValue,
  focusCursorAtEndOfInput,
}: AmountInput) => {
  return (
    <div id='amount'
      className="col-span-3 sm:col-span-2"
    >
      <label
        htmlFor="amount"
        className="block font-normal text-gray-500 text-left"
      >
        Amount
      </label>
      <input
        type="text"
        name="amount"
        id="amount"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmountValue(e)}
        onFocus={(e) => focusCursorAtEndOfInput(e)}
      />
    </div>
  );
};

export default AmountInput