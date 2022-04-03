import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import { getDataCountryInfo } from '../../store/countriesData';
import { RootState } from '../../store/store';
import style from './CountryInfo.module.scss';
import { LinearProgress } from '@mui/material';
import NotFound from '../NotFound/NotFound';


const CountryInfo: FC = () => {
  const { countryCode } = useParams();
  const dispatch = useDispatch();
  const { isWarning, isLoading, countryInfo } = useSelector((store: RootState) => store.countriesData);

  useEffect(() => {
    dispatch(getDataCountryInfo(countryCode!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode]);

  console.log(countryInfo);

  return (
    <>
      <Header />
      {isLoading && <LinearProgress />}
      {isWarning && <NotFound />}
      {countryInfo && (
        <div className={style.main}>
          <img src={countryInfo.flag} alt={`flag: ${countryInfo.name}`} />
          <div className={style.data}>
            <h1>{countryInfo.name}</h1>
            <div className={style.info}>
              <p><span>Native Name: </span>{countryInfo.nativeName}</p>
              <p><span>Region: </span>{countryInfo.region}</p>
              <p><span>Subregion: </span>{countryInfo.subregion}</p>
              <p><span>Population: </span>{(countryInfo.population).toLocaleString()}</p>
              {countryInfo.area && <p><span>Area: </span>{(countryInfo.area).toLocaleString()}</p>}
              {countryInfo.capital && <p><span>Capital: </span>{countryInfo.capital}</p>}

              {countryInfo.currencies &&
                <p><span>Currencies: </span>
                  {countryInfo.currencies.map((item, index) =>
                    <Link to={`/currencies/${item.code}`} key={index}>{item.name}</Link>)}
                </p>}

              {countryInfo.languages &&
                <div>
                  <p className={style.links}><span>Languages: </span>
                    {countryInfo.languages.map((item, index) =>
                      <Link to={`/languages/${item.iso639_1}`} key={index}>{item.name}</Link>)}
                  </p>
                </div>}

            </div>

            {!countryInfo.borders
              ? (
                <div className={style.borders}>
                  <span><b>Border Countries: </b></span>
                  <span>There is no border countries</span>
                </div>
              )
              : (
                <div className={style.borders}>
                  <p>Border Countries: </p>
                  <div className={style.border}>
                    {countryInfo.borders.map((item, index) =>
                      <Link to={`/country/${item}`} key={index}>{item}</Link>)}
                  </div>
                </div>
              )
            }
          </div>
        </div>
      )}
    </>
  )
}

export default CountryInfo;
