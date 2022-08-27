import React from 'react';
import ConverterForm from './ConverterForm/ConverterForm';

export const ConverterContainer = () => {
  return (
    <>
      <div
        className="pt-14 bg-white pb-14 px-6 shadow"
        style={{
          margin: '3% 100px',
          height: '522px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid rgba(231, 234, 243, 0.7)',
          boxShadow: '0px 0px 12px rgba(140, 152, 164, 0.08)',
        }}
      >
        <div className="text-black text-2x1 mb-10 font-semibold">
          ConverterContainer
        </div>
        <ConverterForm />
      </div>
    </>
  );
};
