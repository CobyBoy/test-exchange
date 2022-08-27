import { AxiosResponse } from 'axios';
import * as apiClient from '../api/api.client';
import { CurrencyResult } from '../interfaces/currency';

export const getRates = async () => {
  try {
    const { data } = await apiClient.getAllRates();
    console.log('all rates', data);
  } catch (error) {}
};

export const getBaseRate = async (base: string) => {
  try {
    const { data } = await apiClient.getBaseRate(base);
    console.log('base rate', data);
  } catch (error) {}
};

export const getCurrencies = async () => {
  try {
    const { data }: AxiosResponse<CurrencyResult> =
      await apiClient.getAllCurrencies();
    return data;
  } catch (error) {}
};
