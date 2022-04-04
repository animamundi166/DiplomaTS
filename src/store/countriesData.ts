import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import getCountryInfo, { ICountryInfo } from "../API/getCountryInfo";
import getCurrencyInfo, { ICurrencyInfo } from "../API/getCurrencyInfo";
import getLanguageInfo, { ILanguageInfo } from "../API/getLanguageInfo";

export const getDataCountryInfo = createAsyncThunk('getDataCountryInfo', (countryCode: string) => {
  return getCountryInfo(countryCode);
});

export const getDataLanguageInfo = createAsyncThunk('getDataLanguageInfo', (langCode: string) => {
  return getLanguageInfo(langCode);
});

export const getDataCurrencyInfo = createAsyncThunk('getDataCurrencyInfo', (currency: string) => {
  return getCurrencyInfo(currency);
});

interface ICountriesDataState {
  countryInfo: ICountryInfo | null,
  languageInfo: ILanguageInfo[],
  currencyInfo: ICurrencyInfo[],
  isLoading: boolean,
  isWarning: boolean,
}

const initialState: ICountriesDataState = {
  countryInfo: null,
  languageInfo: [],
  currencyInfo: [],
  isLoading: false,
  isWarning: false,
};

const countriesReducer = createReducer(initialState, (builder) => {

  builder.addCase(getDataCountryInfo.pending, (state) => {
    state.isWarning = false;
    state.isLoading = true;
    state.countryInfo = null;
  });
  builder.addCase(getDataCountryInfo.fulfilled, (state, action) => {
    state.countryInfo = action.payload;
    state.isLoading = false;
  });
  builder.addCase(getDataCountryInfo.rejected, (state) => {
    state.countryInfo = null;
    state.isLoading = false;
    state.isWarning = true;
  });

  builder.addCase(getDataLanguageInfo.pending, (state) => {
    state.isWarning = false;
    state.isLoading = true;
    state.languageInfo = [];
  });
  builder.addCase(getDataLanguageInfo.fulfilled, (state, action) => {
    state.languageInfo = action.payload;
    state.isLoading = false;
  });
  builder.addCase(getDataLanguageInfo.rejected, (state) => {
    state.languageInfo = [];
    state.isLoading = false;
    state.isWarning = true;
  });

  builder.addCase(getDataCurrencyInfo.pending, (state) => {
    state.isWarning = false;
    state.isLoading = true;
    state.currencyInfo = [];
  });
  builder.addCase(getDataCurrencyInfo.fulfilled, (state, action) => {
    state.currencyInfo = action.payload;
    state.isLoading = false;
  });
  builder.addCase(getDataCurrencyInfo.rejected, (state) => {
    state.currencyInfo = [];
    state.isLoading = false;
    state.isWarning = true;
  });
});

export default countriesReducer;
