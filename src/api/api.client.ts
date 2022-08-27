import axios from 'axios'
import { api } from '../environments/environment';

export const getAllRates = () => axios.get(`${api.BASE_API_URL}/rates`);
export const getBaseRate = (base: string) => axios.get(`${(api.BASE_API_URL)}/rates?base=${base}`);
export const getAllCurrencies = () => axios.get(`${(api.BASE_API_URL)}/currencies`);