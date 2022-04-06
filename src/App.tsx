import { FC } from 'react';
import style from './App.module.scss';
import MapChartMain from './components/MapCharts/MapChartMain';

const App: FC = () => {
  return (
    <div className={style.main}>
      <MapChartMain />
    </div>
  );
}

export default App;
