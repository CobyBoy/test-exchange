import React from 'react';
interface Info {
  fromInfo: string;
  toInfo: string;
  lastUpdateDate: string;
}
const ConversionInfo = ({ fromInfo, toInfo, lastUpdateDate }: Info) => {
  return (
    <>
      <footer className="block text-sm font-medium text-gray-500 text-left">
        Conversion from {fromInfo.split('-')[1]} to {toInfo.split('-')[1]} -
        Last Updated: {new Date(lastUpdateDate).toUTCString()}
      </footer>
    </>
  );
};

export default ConversionInfo;
