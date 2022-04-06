import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isChartFalse, isChartTrue } from '../../store/dataChart';
import { RootState } from '../../store/store';
import { activeClass1, activeClass2 } from '../../store/tabState';
import style from './MapSwitcher.module.scss';

const MapSwitcher: FC = () => {

  const { activeClass } = useSelector((store: RootState) => store.tabState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <div className={style.button} onClick={() => navigate(-1)} >Back</div>
      Countries
      <div className={style.multiButton}>
        <span className={activeClass === 1 ? style.active : style.span} onClick={setChartTrue}>
          List Of Countries
        </span>
        <span className={activeClass === 2 ? style.active : style.span} onClick={setChartFalse}>
          Map
        </span>
      </div>
    </div>
  )
}

export default MapSwitcher;
