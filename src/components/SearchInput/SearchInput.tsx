import { ChangeEvent, FC } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../../store/filterSlice";
import style from './SearchInput.module.scss';

const SearchInput: FC = () => {
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(e.target.value));
  }

  return (
    <div className={style.main}>
      <input type="text" placeholder="Search" onChange={handleChange} />
    </div>
  )
}

export default SearchInput;
