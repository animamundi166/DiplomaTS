import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isChartFalse, isChartTrue } from '../../store/dataChart';
import { RootState } from '../../store/store';
import { activeClass1, activeClass2 } from '../../store/tabState';
import style from './MapSwitcher.module.scss';

const MapSwitcher: FC = () => {

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
      <div className={style.multiButton}>
        <button
          className={activeClass === 1 ? style.active : ''}
          onClick={setChartTrue}
        >List Of Countries</button>
        <button
          className={activeClass === 2 ? style.active : ''}
          onClick={setChartFalse}
        >Map</button>
      </div>
    </div>
  )
}

export default MapSwitcher;
