import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import style from './CurrencyInfo.module.scss';
import CountryItem from '../CountryItem/CountryItem';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';
import { getDataCurrencyInfo } from '../../store/countriesData';
import Loader from '../Loader/Loader';
import { RootState } from '../../store/store';
import MapSwitcher from '../MapSwitcher/MapSwitcher';
import MapChartFilled from '../MapCharts/MapChartFilled';
import { LinearProgress } from '@mui/material';

const CurrencyInfo: FC = () => {
  const { currency } = useParams();
  const { isChart } = useSelector((store: RootState) => store.dataChart);
  const { isWarning, isLoading, currencyInfo } = useSelector((store: RootState) => store.countriesData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataCurrencyInfo(currency!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getArrayForChart = () => {
    const currencies = currencyInfo.map(item => item.cca3);
    const newObj = [];
    currencies.forEach(element => {
      const x = {
        ISO3: element,
      };
      newObj.push(x);
    })
    return newObj;
  }

  return (
    <>
      <Header />
      {isLoading && <LinearProgress />}
      {isWarning && 'No Data'}
      {!currencyInfo && 'Not Found'}
      <div className={style.main}>
        {/* <span>Countries with {currencyInfo.currency.name}</span> */}
        {isWarning || <MapSwitcher />}
        {!isChart && <div className={style.countries}>
          {currencyInfo.map((item) => (
            <CountryItem
              key={item.ccn3}
              code={item.cca2}
              name={item.name.common}
              population={item.population}
              capital={item.capital}
              flag={item.flags.png}
            />
          ))
          }
        </div>}
        {isChart && <MapChartFilled data={getArrayForChart()} />}
      </div>
    </>
  )
}

export default CurrencyInfo;
