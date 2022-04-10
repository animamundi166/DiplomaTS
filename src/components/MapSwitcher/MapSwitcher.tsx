import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isChartFalse, isChartTrue } from '../../store/showChart';
import { RootState } from '../../store/store';
import { activeClass1, activeClass2 } from '../../store/tabState';
import SearchInput from '../SearchInput/SearchInput';
import RangeSlider from '../Slider/Slider';
import style from './MapSwitcher.module.scss';
import SearchIcon from '@mui/icons-material/Search';

interface INameProps {
  name: string | undefined,
}

const MapSwitcher: FC<INameProps> = ({ name }) => {

  const { activeClass } = useSelector((store: RootState) => store.tabState);
  const dispatch = useDispatch();
  const [shownFilter, setShownFilter] = useState(false);

  const setChartTrue = () => {
    dispatch(activeClass1());
    dispatch(isChartFalse());
  }

  const setChartFalse = () => {
    dispatch(activeClass2());
    dispatch(isChartTrue());
  }

  const showFilter = () => {
    setShownFilter(!shownFilter);
  }

  return (
    <div className={style.container}>
      <div className={style.switch}>
        <div>
          <span className={activeClass === 1 ? style.active : style.span} onClick={setChartTrue}>
            List Of Countries ({name})
          </span>
          <span className={activeClass === 2 ? style.active : style.span} onClick={setChartFalse}>
            Map
          </span>
        </div>
        <div onClick={showFilter} className={style.icon}><SearchIcon /></div>
      </div>

      {shownFilter && <div className={style.searchPanel}>
        <SearchInput />
        <RangeSlider />
      </div>}
    </div>
  )
}

export default MapSwitcher;
