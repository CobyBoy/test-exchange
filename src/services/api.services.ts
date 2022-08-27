import { AxiosResponse } from 'axios';
import * as apiClient from '../api/api.client';
import { CurrencyResult } from '../interfaces/currency';
import { RatesResult } from '../interfaces/rates';

export const getRates = async () => {
  try {
    const { data } = await apiClient.getAllRates();
    console.log('all rates', data);
  } catch (error) {}
};

export const getBaseRate = async (base: string) => {
  try {
    const { data }: AxiosResponse<RatesResult> = await apiClient.getBaseRate(
      base
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrencies = async () => {
  try {
    const { data }: AxiosResponse<CurrencyResult> =
      await apiClient.getAllCurrencies();
    return data;
  } catch (error) {}
};
