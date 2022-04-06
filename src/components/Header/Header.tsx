import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import style from './Header.module.scss';

export const Header: FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <header className={style.main}>
                <h1 onClick={() => navigate('/')}>Countries</h1>
                {/* <p>Feature</p> */}
            </header >
            <Outlet />
        </>
    )
}

export default Header;
