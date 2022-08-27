import React from 'react';
interface Info {
  fromInfo: string;
  toInfo: string;
}
const ConversionInfo = ({ fromInfo, toInfo }: Info) => {
  return (
    <>
      <p>
        Conversion from {fromInfo.split('-')[1]} to {toInfo.split('-')[1]} -
        Last Updated: {new Date().toLocaleDateString()}
      </p>
    </>
  );
};

export default ConversionInfo;
