import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { getDataCountryInfo } from '../../store/countriesData';
import { RootState } from '../../store/store';
import style from './CountryInfo.module.scss';
import NoData from '../NotFound/NoData';

const CountryInfo: FC = () => {
  const { countryCode } = useParams();
  const dispatch = useDispatch();
  const { isWarning, isLoading, countryInfo } = useSelector((store: RootState) => store.countriesData);

  useEffect(() => {
    dispatch(getDataCountryInfo(countryCode!));
  }, [countryCode]);

  return (
    <>
      {isLoading && <LinearProgress />}
      {isWarning && <NoData />}
      {countryInfo && (

        <main className={style.main}>
          <img src={countryInfo.flag} alt={`flag: ${countryInfo.name}`} />
          <div className={style.data}>
            <h1>{countryInfo.name}</h1>
            <div className={style.info}>
              <p>
                <span>Native Name: </span>
                {countryInfo.nativeName}
              </p>
              <p>
                <span>Region: </span>
                {countryInfo.region}
              </p>
              <p>
                <span>Subregion: </span>
                {countryInfo.subregion}
              </p>
              <p>
                <span>Population: </span>
                {(countryInfo.population).toLocaleString()}
              </p>
              {countryInfo.area && (
                <p>
                  <span>Area: </span>
                  {(countryInfo.area).toLocaleString()}
                </p>
              )}
              {countryInfo.capital ? (
                <p>
                  <span>Capital: </span>
                  {countryInfo.capital}
                </p>
              )
                : (
                  <p>
                    <span>Capital: </span>
                    -
                  </p>
                )}

              {countryInfo.currencies && (
                <div className={style.penum}>
                  <p>
                    <span>Currencies: </span>
                  </p>
                  <span className={style.enum}>
                    {countryInfo.currencies.map((item) => <Link to={`/currencies/${item.code}`} key={item.code}>{item.name}</Link>)}
                  </span>
                </div>
              )}

              {countryInfo.languages && (
                <div className={style.penum}>
                  <p>
                    <span>Languages: </span>
                  </p>
                  <span className={style.enum}>
                    {countryInfo.languages.map((item) => <Link to={`/languages/${item.iso639_2}`} key={item.iso639_2}>{item.name}</Link>)}
                  </span>
                </div>
              )}
            </div>

            {!countryInfo.borders
              ? (
                <div className={style.borders}>
                  <span>
                    <b>Border Countries: </b>
                  </span>
                  &mdash;
                </div>
              )
              : (
                <div className={style.borders}>
                  <p>Border Countries: </p>
                  <div className={style.border}>
                    {countryInfo.borders.map((item, index) => <Link to={`/country/${item}`} key={index}>{item}</Link>)}
                  </div>
                </div>
              )}
          </div>
        </main>
      )}
    </>
  );
};

export default CountryInfo;
