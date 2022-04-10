import { ChangeEvent, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputData, setFilter } from "../../store/filterSlice";
import style from './SearchInput.module.scss';

const SearchInput: FC = () => {
  const dispatch = useDispatch();
  const inputedData = useSelector(inputData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setFilter(e.target.value));
  }

  return (
    <div className={style.main}>
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
        value={inputedData} />
    </div>
  )
}

export default SearchInput;
