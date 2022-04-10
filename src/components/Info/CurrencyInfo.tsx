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
import { inputData, setFilter } from '../../store/filterSlice';
import { cc } from '../../util/constants';
import NotFound from '../NotFound/NotFound';
import { filteredPopulationRange, setFilteredPopul, setMinMaxPopulationValues } from '../../store/populationSlice';
import { INewObj } from './LanguageInfo';


const CurrencyInfo: FC = () => {
  const { curr } = useParams();
  const dispatch = useDispatch();
  const { isChart } = useSelector((store: RootState) => store.showChart);
  const { isWarning, isLoading, currencyInfo } = useSelector((store: RootState) => store.countriesData);
  const inputedData = useSelector(inputData);
  const filteredPopulData = useSelector(filteredPopulationRange);

  useEffect(() => {
    dispatch(getDataCurrencyInfo(curr!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curr]);

  useEffect(() => {
    dispatch(setFilteredPopul([0, 2e9]));
    dispatch(setMinMaxPopulationValues(findMinMaxPopulationValues()));
    dispatch(setFilter(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyInfo]);

  const getArrayForChart = (): INewObj[] => {
    const arr = currencyInfo.map(item => [item.cca3, item.name.common, item.population]);
    const newObj: INewObj[] = [];
    arr.forEach(element => {
      const x: INewObj = {
        ISO3: element[0],
        name: element[1],
        population: element[2],
      };
      newObj.push(x);
    })
    return newObj;
  }

  const findMinMaxPopulationValues = () => {
    const popul = currencyInfo.map(item => item.population);
    const maxPopul = Math.max(...popul);
    return ([0, maxPopul])
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
            .filter((item) => item.population >= filteredPopulData[0] && item.population <= filteredPopulData[1])
            .map((item) => (
              <CountryItem
                key={item.cca3}
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
