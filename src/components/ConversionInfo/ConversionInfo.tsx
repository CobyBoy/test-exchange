import React from 'react';
import { Info } from '../../interfaces/info';
import './styles.css'

const ConversionInfo = ({ fromInfo, toInfo, lastUpdateDate }: Info) => {
  return (
    <>
      <footer className="md:block font-normal text-left">
        Conversion from {fromInfo.split('-')[1]} to {toInfo.split('-')[1]} -
        Last Updated: {new Date(String(lastUpdateDate)).toUTCString()}
      </footer>
    </>
  );
};

export default ConversionInfo;
