import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import CountryInfo from "./components/CountryInfo/CountryInfo";
import CurrencyInfo from "./components/CurrencyInfo/CurrencyInfo";
import LanguageInfo from "./components/LanguageInfo/LanguageInfo";

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/country/:countryCode" element={<CountryInfo />} />
      <Route path="/languages/:langCode" element={<LanguageInfo />} />
      <Route path="/currencies/:currency" element={<CurrencyInfo />} />
      <Route path="*" element="Not Found" />
    </Routes>
  );
};

export default AppRoutes;
