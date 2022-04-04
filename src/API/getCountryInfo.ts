import axios from "axios";
import { apiURLv2 } from "../util/api";

export interface ICountryInfo {
  name: string,
  nativeName: string,
  population: number,
  region: string,
  subregion: string,
  capital: string,
  flag: string,
  area: number,
  currencies:
  {
    code: string
    name: string
  }[],
  languages:
  {
    iso639_1: string
    name: string
  }[],

  borders:
  string[]

}

const getCountryInfo = async (countryCode: string): Promise<ICountryInfo> => {
  const response = await axios.get<ICountryInfo>(`${apiURLv2}/alpha/${countryCode}`);
  return response.data;
};

export default getCountryInfo;
