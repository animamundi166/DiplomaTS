import { FC } from 'react'
import { Link } from 'react-router-dom';
import style from './CountryItem.module.scss';

const CountryItem: FC = ({ name, population, capital, flag, code }) => {

  return (
    <div className={style.main}>
      <Link to={`/country/${code}`}>
        <div className={style.image}>
          <img src={flag} alt={`Flag of: ${name}`} />
        </div>
        <div className={style.data}>
          <p className={style.name}>{name}</p>
          <p>Capital: <span>{capital}</span></p>
          <p>Population: <span>{Intl.NumberFormat().format(population)}</span></p>
        </div>
      </Link>
    </div>
  )
}

export default CountryItem;
