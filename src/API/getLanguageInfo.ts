import axios from "axios";
import { apiURLv2 } from "../util/constants";

export interface ILanguageInfo {
  alpha2Code: string,
  alpha3Code: string,
  name: string,
  population: number,
  capital: string,
  flags: {
    png: string
  }
  languages:
  {
    iso639_2: string
    name: string
  }
}

const getLanguageInfo = async (langCode: string): Promise<ILanguageInfo[]> => {
  const response = await axios.get<ILanguageInfo[]>(`${apiURLv2}/lang/${langCode}`);
  return response.data;
};

export default getLanguageInfo;
