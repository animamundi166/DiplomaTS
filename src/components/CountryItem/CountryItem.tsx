import { FC } from 'react'
import { Link } from 'react-router-dom';
import style from './CountryItem.module.scss';

interface ICountryItemProps {
  key: string,
  name: string,
  population: number,
  capital: string,
  flag: string,
  code: string
}

const CountryItem: FC<ICountryItemProps> = ({ name, population, capital, flag, code }) => {

  return (
    <main className={style.main}>
      <Link to={`/country/${code}`}>
        <div className={style.image}>
          <img src={flag} alt={`Flag of: ${name}`} />
        </div>
        <div className={style.data}>
          <p className={style.name}>{name}</p>
          <p>Capital: <span>{capital ? capital : '-'}</span></p>
          <p>Population: <span>{population.toLocaleString()}</span></p>
        </div>
      </Link>
    </main>
  )
}

export default CountryItem;
