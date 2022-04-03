import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Header.module.scss';

export const Header: FC = () => {
    const navigate = useNavigate();

    return (
        <div className={style.main}>
            <h1 onClick={() => navigate('/')}>Countries</h1>
            <p>Feature</p>
        </div >
    )
}

export default Header;
