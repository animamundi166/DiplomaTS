import { FC, memo } from "react";
import { geoUrl } from "../../util/constants";
import { INewObj } from "../Info/LanguageInfo";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { useSelector } from "react-redux";
import { inputData } from "../../store/filterSlice";
import { filteredPopulationRange } from "../../store/populationSlice";

interface IDataProps {
  data: INewObj[],
}

const MapChartFilled: FC<IDataProps> = ({ data }) => {
  const inputedData = useSelector(inputData);
  const filteredPopulData = useSelector(filteredPopulationRange);

  return (
    <ComposableMap projectionConfig={{ scale: 130 }} width={700} height={420}>

      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const { ISO_A3 } = geo.properties;
              const filledCountries = data
                .filter((item) => item.name.toString().toLowerCase().includes(inputedData.toLowerCase().trim()))
                .filter((item) => item.population >= filteredPopulData[0] && item.population <= filteredPopulData[1])
                .find(item => item.ISO3 === ISO_A3);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={filledCountries ? "#457a9d" : "#D6D6DA"}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

export default memo(MapChartFilled);
