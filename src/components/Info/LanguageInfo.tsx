import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './Info.module.scss';
import CountryItem from '../CountryItem/CountryItem';
import { useDispatch, useSelector } from 'react-redux';
import { getDataLanguageInfo } from '../../store/countriesData';
import { RootState } from '../../store/store';
import MapSwitcher from '../MapSwitcher/MapSwitcher';
import MapChartFilled from '../MapCharts/MapChartFilled';
import { LinearProgress } from '@mui/material';
import NoData from '../NotFound/NoData';
import NotFound from '../NotFound/NotFound';
import { inputData, setFilter } from '../../store/filterSlice';
import { livingISO6392 } from '../../util/constants';
import { filteredPopulationRange, setFilteredPopul, setMinMaxPopulationValues } from '../../store/populationSlice';
import { setDescription } from '../../store/descriptionSlice';

export interface INewObj {
  [key: string]: string | number;
}

const LanguageInfo: FC = () => {
  const { langCode } = useParams();
  const dispatch = useDispatch();
  const { isChart } = useSelector((store: RootState) => store.showChart);
  const { isWarning, isLoading, languageInfo } = useSelector((store: RootState) => store.countriesData);
  const inputedData = useSelector(inputData);
  const filteredPopulData = useSelector(filteredPopulationRange);

  useEffect(() => {
    dispatch(getDataLanguageInfo(langCode!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langCode]);

  useEffect(() => {
    dispatch(setFilteredPopul([0, 2e9]));
    dispatch(setMinMaxPopulationValues(findMinMaxPopulationValues()));
    dispatch(setFilter(''));
    dispatch(setDescription(`with ${LanguageFullName} language`));
    return () => {
      dispatch(setDescription(''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageInfo]);


  const getArrayForChart = (): INewObj[] => {
    const arr = languageInfo.map(item => [item.alpha3Code, item.name, item.population]);
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
    const popul = languageInfo.map(item => item.population);
    const maxPopul = Math.max(...popul);
    return ([0, maxPopul])
  }

  const LanguageFullName = livingISO6392[langCode!];

  return (
    <>
      {isLoading && <LinearProgress />}
      {isWarning && <NoData />}
      {!languageInfo && <NotFound />}
      <div className={style.main}>
        {isWarning || < MapSwitcher />}
        {!isChart && <div className={style.countries}>
          {languageInfo
            .filter((item) => item.name.toLowerCase().includes(inputedData.toLowerCase().trim()))
            .filter((item) => item.population >= filteredPopulData[0] && item.population <= filteredPopulData[1])
            .map((item) => (
              <CountryItem
                key={item.alpha2Code}
                code={item.alpha3Code}
                name={item.name}
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

export default LanguageInfo;
