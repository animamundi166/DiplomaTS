import { FC, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import style from './Header.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const Header: FC = () => {
    const [backButton, showBackButton] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const chechPath = () => {
        if (pathname === ('/')) {
            showBackButton(false)
        }
        else {
            showBackButton(true)
        }
    }

    useEffect(() => {
        chechPath();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    return (
        <>
            <header className={style.main}>
                {backButton && <p className={style.arrow} onClick={() => navigate(-1)}><ArrowBackIcon /></p>}
                <h1 onClick={() => navigate('/')}>Countries</h1>
            </header >
            <Outlet />
        </>
    )
}

export default Header;
