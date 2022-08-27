import { useEffect, useState } from 'react';
import './App.css';
import { ConverterContainer } from './components/ConverterContainer';

const App = () => {
  return (
    <>
      <div className="bg">
        <header>
          <p
            className="text-lg text-white"
            style={{ fontSize: '34px', lineHeight: '39.88px' }}
          >
            Convert 1 Euro to Canadian Dollar- EUD to CA$
          </p>
        </header>
        <ConverterContainer />
      </div>
    </>
  );
};

export default App;
