import React from 'react';
import swapButton from '../../../assets/images/swap.svg';
import './styles.css';

interface SwapButton {
  swapFromAndTo: () => void;
}
const SwapButton = ({ swapFromAndTo }: SwapButton) => {
  return (
    <div id="swapButton-container">
      <img
        src={swapButton}
        alt="swap-currency-icon"
        role={'button'}
        onClick={(e) => {
          swapFromAndTo();
        }}
      />
    </div>
  );
};

export default SwapButton;
