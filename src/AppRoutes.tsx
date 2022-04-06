import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import CountryInfo from "./components/CountryInfo/CountryInfo";
import CurrencyInfo from "./components/CurrencyInfo/CurrencyInfo";
import Header from "./components/Header/Header";
import LanguageInfo from "./components/LanguageInfo/LanguageInfo";
import NotFound from "./components/NotFound/NotFound";

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />} >
        <Route index element={<App />} />
        <Route path="country/:countryCode" element={<CountryInfo />} />
        <Route path="languages/:langCode" element={<LanguageInfo />} />
        <Route path="currencies/:currency" element={<CurrencyInfo />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
