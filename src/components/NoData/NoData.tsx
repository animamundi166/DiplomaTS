import { FC } from "react"
import { useNavigate } from "react-router-dom";
import NotFoundImgSrc from "./1.jpg";
import styles from "./NoData.module.scss";

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
