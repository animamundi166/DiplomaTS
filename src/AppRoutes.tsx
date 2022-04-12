import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './App';
import CountryInfo from './components/CountryInfo/CountryInfo';
import CurrencyInfo from './components/Info/CurrencyInfo';
import LanguageInfo from './components/Info/LanguageInfo';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';

const AppRoutes: FC = () => (
  <Routes>
    <Route path="/" element={<Header />}>
      <Route index element={<App />} />
      <Route path="country/:countryCode" element={<CountryInfo />} />
      <Route path="languages/:langCode" element={<LanguageInfo />} />
      <Route path="currencies/:curr" element={<CurrencyInfo />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default AppRoutes;
