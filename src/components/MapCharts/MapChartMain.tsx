import { FC, memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { geoUrl } from "../../util/constants";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const MapChartMain: FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');

  return (
    <>
      <ReactTooltip>{content}</ReactTooltip>
      <ComposableMap data-tip="" projectionConfig={{ scale: 150 }} width={700} height={450}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const { NAME, ISO_A2 } = geo.properties;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setContent(NAME);
                    }}
                    onMouseLeave={() => {
                      setContent('');
                    }}
                    onClick={() => {
                      navigate(`/country/${ISO_A2}`);
                    }}
                    style={{
                      default: {
                        fill: "#D6D6DA",
                        outline: "none"
                      },
                      hover: {
                        fill: "#78909c",
                        outline: "none"
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                    }}
                  />)
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChartMain);
