import React from 'react';
import ConverterForm from './ConverterForm/ConverterForm';
import ResultsContainer from './Results/ResultsContainer';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

export const ConverterContainer = () => {
  return (
    <>
      <h1 className="text-orange-500 text-2x1 mb-10 font-semibold">
        ConverterContainer
      </h1>
      <Container>
        <Paper sx={{ p: 2 }}>
          <Stack direction="row">
            <ConverterForm />
            <ResultsContainer />
          </Stack>
        </Paper>
      </Container>
    </>
  );
};
