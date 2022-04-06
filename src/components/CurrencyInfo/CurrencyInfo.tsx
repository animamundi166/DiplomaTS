import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import style from './CurrencyInfo.module.scss';
import CountryItem from '../CountryItem/CountryItem';
import { useDispatch, useSelector } from 'react-redux';
import { getDataCurrencyInfo } from '../../store/countriesData';
import { RootState } from '../../store/store';
import MapSwitcher from '../MapSwitcher/MapSwitcher';
import MapChartFilled from '../MapCharts/MapChartFilled';
import { LinearProgress } from '@mui/material';
import NoData from '../NoData/NoData';

const CurrencyInfo: FC = () => {
  const { currency } = useParams();
  const { isChart } = useSelector((store: RootState) => store.dataChart);
  const { isWarning, isLoading, currencyInfo } = useSelector((store: RootState) => store.countriesData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataCurrencyInfo(currency!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  interface INewObj {
    [key: string]: string;
  }

  const getArrayForChart = (): INewObj[] => {
    const currencies = currencyInfo.map(item => item.cca3);
    const newObj: INewObj[] = [];
    currencies.forEach(element => {
      const x: INewObj = {
        ISO3: element,
      };
      newObj.push(x);
    })
    return newObj;
  }

  return (
    <>
      {isLoading && <LinearProgress />}
      {isWarning && <NoData />}
      <main className={style.main}>
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
      </main>
    </>
  )
}

export default CurrencyInfo;
