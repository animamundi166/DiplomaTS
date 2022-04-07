import axios from "axios";
import { apiURLv3 } from "../util/constants";

export interface ICurrencyInfo {
  ccn3: string,
  cca2: string,
  cca3: string,
  name: {
    common: string
  },
  population: number,
  capital: string,
  currencies: {
    [key: string]: {
      name: string
    };
  }
  flags: {
    png: string
  }
}

const getCurrencyInfo = async (name: string): Promise<ICurrencyInfo[]> => {
  const response = await axios.get<ICurrencyInfo[]>(`${apiURLv3}/currency/${name}`);
  return response.data;
};

export default getCurrencyInfo;
