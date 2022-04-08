import { FC } from "react"
import { useNavigate } from "react-router-dom";
import NotFoundImgSrc from "./NotFound.png";
import style from "./NotFound.module.scss";

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <img className={style.image} src={NotFoundImgSrc} alt="Not Found" />
      <p className={style.title}>Not Found</p>
      <button className={style.button} onClick={() => navigate('/')} >Back to Home</button>
    </div>
  )
}

export default NotFound;
