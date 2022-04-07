import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import style from './LanguageInfo.module.scss';
import CountryItem from '../CountryItem/CountryItem';
import { useDispatch, useSelector } from 'react-redux';
import { getDataLanguageInfo } from '../../store/countriesData';
import { RootState } from '../../store/store';
import MapSwitcher from '../MapSwitcher/MapSwitcher';
import MapChartFilled from '../MapCharts/MapChartFilled';
import { LinearProgress } from '@mui/material';
import NoData from '../NoData/NoData';
import NotFound from '../NotFound/NotFound';
import { inputData } from '../../store/filterSlice';
import { livingISO6392 } from '../../util/constants';


export interface INewObj {
  [key: string]: string;
}

const LanguageInfo: FC = () => {
  const { langCode } = useParams();
  const { isChart } = useSelector((store: RootState) => store.dataChart);
  const { isWarning, isLoading, languageInfo } = useSelector((store: RootState) => store.countriesData);
  const inputedData = useSelector(inputData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataLanguageInfo(langCode!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langCode]);

  const getArrayForChart = (): INewObj[] => {
    const langs = languageInfo.map(item => item.alpha3Code);
    const newObj: INewObj[] = [];
    langs.forEach(element => {
      const x: INewObj = {
        ISO3: element,
      };
      newObj.push(x);
    })
    return newObj;
  }

  const LanguageFullName = livingISO6392[langCode!];


  return (
    <>
      {isLoading && <LinearProgress />}
      {isWarning && <NoData />}
      {!languageInfo && <NotFound />}
      <div className={style.main}>
        {isWarning || <MapSwitcher name={LanguageFullName} />}
        {!isChart && <div className={style.countries}>
          {!languageInfo && 'Not Found'}
          {languageInfo
            .filter((item) => item.name.toLowerCase().includes(inputedData.toLowerCase()))
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
