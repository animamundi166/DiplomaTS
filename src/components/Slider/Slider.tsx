import { Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredPopul } from '../../store/populationSlice';
import { RootState } from '../../store/store';
import style from './Slider.module.scss';


// interface IMark {
//     [key: number]: number;
// }

interface Props {
    children: React.ReactElement;
    value: number;
}

const RangeSlider = () => {
    const dispatch = useDispatch();
    const { languageInfo } = useSelector((store: RootState) => store.countriesData);

    const [value, setValue] = useState<number[]>([1, 2e9]);

    useEffect(() => {
        dispatch(setFilteredPopul(value));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const valueLabelFormat = (value: number) => {
        const units = ['', 'k', 'M', 'G'];

        let unitIndex = 0;
        let scaledValue = value;

        while (scaledValue >= 1000 && unitIndex < units.length - 1) {
            unitIndex += 1;
            scaledValue /= 1000;
        }
        return `${Number(scaledValue.toFixed(1))} ${units[unitIndex]}`;
    }

    const getPopulationItems = (): number[] => {
        const popul = languageInfo.map(item => item.population);
        return popul;
    }

    const findMinMaxValues = () => {
        const maxPopul = Math.max(...(getPopulationItems()));
        const minPopul = Math.min(...(getPopulationItems()));
        return ([minPopul, maxPopul])
    }

    // const populationStepValues = (): IMark[] | any => {
    //     const newObj: IMark[] = [];
    //     getPopulationItems().forEach(element => {
    //         const x = {
    //             value: element,
    //         };
    //         newObj.push(x);
    //     })
    //     return newObj;
    // }

    const ValueLabelComponent = (props: Props) => {
        const { children, value } = props;

        return (
            <Tooltip enterTouchDelay={0} placement="top" title={value}>
                {children}
            </Tooltip>
        );
    }

    return (
        <div className={style.main}>
            <Box sx={{ width: 500 }}>
                <Typography align='center' variant="body2">Population</Typography>
                <Slider
                    value={value}
                    // marks={populationStepValues()}
                    // step={null}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={findMinMaxValues()[0]}
                    max={findMinMaxValues()[1]}
                    track={false}
                    valueLabelFormat={valueLabelFormat}
                    components={{
                        ValueLabel: ValueLabelComponent,
                    }}
                />
            </Box>
        </div>
    );
}

export default RangeSlider;

