import React from 'react';
import { Info } from '../../interfaces/info';

const ConversionInfo = ({ fromInfo, toInfo, lastUpdateDate }: Info) => {
  return (
    <>
      <footer className="block text-sm font-medium text-gray-500 text-left">
        Conversion from {fromInfo.split('-')[1]} to {toInfo.split('-')[1]} -
        Last Updated: {new Date(String(lastUpdateDate)).toUTCString()}
      </footer>
    </>
  );
};

export default ConversionInfo;
