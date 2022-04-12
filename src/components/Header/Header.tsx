import { FC, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import style from './Header.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';
import { description } from '../../store/descriptionSlice';

const Header: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const descriptionData = useSelector(description);
  const [backButton, showBackButton] = useState(false);

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
  }, [pathname])


  return (
    <>
      <header className={style.main}>
        {backButton && <p className={style.arrow} onClick={() => navigate(-1)}><ArrowBackIcon /></p>}
        <h1 onClick={() => navigate('/')}>Countries</h1>
        <span className={style.descr}>{descriptionData}</span>
      </header >
      <Outlet />
    </>
  )
}

export default Header;
