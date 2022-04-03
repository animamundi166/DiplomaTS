import { FC } from 'react';
import style from './App.module.scss';
import Header from "./components/Header/Header";
import MapChartMain from './components/MapCharts/MapChartMain';

const App: FC = () => {
  return (
    <>
      <Header />
      <div className={style.main}>
        <MapChartMain />
      </div>
    </>
  );
}

export default App;
