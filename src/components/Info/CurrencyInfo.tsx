import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import style from './Info.module.scss';
import CountryItem from '../CountryItem/CountryItem';
import { useDispatch, useSelector } from 'react-redux';
import { getDataCurrencyInfo } from '../../store/countriesData';
import { RootState } from '../../store/store';
import MapSwitcher from '../MapSwitcher/MapSwitcher';
import MapChartFilled from '../MapCharts/MapChartFilled';
import { LinearProgress } from '@mui/material';
import NoData from '../NotFound/NoData';
import { inputData } from '../../store/filterSlice';
import { cc } from '../../util/constants';
import NotFound from '../NotFound/NotFound';

const CurrencyInfo: FC = () => {
  const { curr } = useParams();
  const { isChart } = useSelector((store: RootState) => store.dataChart);
  const { isWarning, isLoading, currencyInfo } = useSelector((store: RootState) => store.countriesData);
  const inputedData = useSelector(inputData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataCurrencyInfo(curr!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curr]);

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

  const currencyFullName = cc.code(curr).currency;

  return (
    <>
      {isLoading && <LinearProgress />}
      {isWarning && <NoData />}
      {!currencyInfo && <NotFound />}
      <main className={style.main}>
        < MapSwitcher name={currencyFullName} />
        {!isChart && <div className={style.countries}>
          {currencyInfo
            .filter((item) => item.name.common.toLowerCase().includes(inputedData.toLowerCase()))
            .map((item) => (
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
