import { FC } from "react"
import { useNavigate } from "react-router-dom";
import NotFoundImgSrc from "./NoData.jpg";
import styles from "./NotFound.module.scss";

const NoData: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img src={NotFoundImgSrc} alt="No Data" />
      <p className={styles.title}>No Data</p>
      <button className={styles.button} onClick={() => navigate('/')} >Back to Home</button>
    </div>
  )
}

export default NoData;
