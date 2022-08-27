import React from 'react';
interface Info {
  fromInfo: string;
  toInfo: string;
}
const ConversionInfo = ({ fromInfo, toInfo }: Info) => {
  return (
    <>
      <footer className="block text-sm font-medium text-gray-500 text-left">
        Conversion from {fromInfo.split('-')[1]} to {toInfo.split('-')[1]} -
        Last Updated: {new Date().toLocaleDateString()}
      </footer>
    </>
  );
};

export default ConversionInfo;
