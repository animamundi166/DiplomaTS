import { FC } from "react"
import { useNavigate } from "react-router-dom";
import NotFoundImgSrc from "./1.png";
import styles from "./NotFound.module.scss";

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img src={NotFoundImgSrc} alt="Not Found" />
      <p className={styles.title}>Not Found</p>
      <button onClick={() => navigate('/')} >Back to Home</button>
    </div>
  )
}

export default NotFound;
