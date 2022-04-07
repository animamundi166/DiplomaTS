import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isChartFalse, isChartTrue } from '../../store/dataChart';
import { RootState } from '../../store/store';
import { activeClass1, activeClass2 } from '../../store/tabState';
import SearchInput from '../SearchInput/SearchInput';
import style from './MapSwitcher.module.scss';

interface INameProps {
  name: string | undefined,
}

const MapSwitcher: FC<INameProps> = ({ name }) => {

  const { activeClass } = useSelector((store: RootState) => store.tabState);
  const dispatch = useDispatch();

  const setChartTrue = () => {
    dispatch(activeClass1());
    dispatch(isChartFalse());
  }

  const setChartFalse = () => {
    dispatch(activeClass2());
    dispatch(isChartTrue());
  }

  return (
    <div className={style.main}>
      <SearchInput />
      <div className={style.multiButton}>
        <span className={activeClass === 1 ? style.active : style.span} onClick={setChartTrue}>
          List Of Countries ({name})
        </span>
        <span className={activeClass === 2 ? style.active : style.span} onClick={setChartFalse}>
          Map
        </span>
      </div>
    </div>
  )
}

export default MapSwitcher;
