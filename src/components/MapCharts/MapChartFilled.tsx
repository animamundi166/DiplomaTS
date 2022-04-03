import { FC, memo } from "react";
import { geoUrl } from "../../util/api";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";


const MapChartFilled: FC = ({ data }) => {

  return (
    <ComposableMap projectionConfig={{ scale: 100 }} width={700} height={450}>

      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const { ISO_A3 } = geo.properties;
              const filledCountries = data.find(item => item.ISO3 === ISO_A3);
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
