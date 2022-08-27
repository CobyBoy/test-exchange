import React from 'react';
import ConverterForm from './ConverterForm/ConverterForm';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

export const ConverterContainer = () => {
  return (
    <>
      <Container
        style={{
          border: '2px solid green',
          backgroundColor: 'red',
          marginTop: '-120px',
        }}
      >
        <ConverterForm />
      </Container>
    </>
  );
};
