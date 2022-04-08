import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { populationData, setFilteredPopul } from '../../store/populationSlice';

const RangeSlider = () => {
    const population = useSelector(populationData);
    const dispatch = useDispatch();

    const [value, setValue] = useState<number[]>([0, 2000000000]);
    dispatch(setFilteredPopul(value));

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    function valueLabelFormat(value: number) {
        const units = ['k', 'M', 'G'];

        let unitIndex = 0;
        let scaledValue = value;

        while (scaledValue >= 1000 && unitIndex < units.length - 1) {
            unitIndex += 1;
            scaledValue /= 1000;
        }

        return `${scaledValue} ${units[unitIndex]}`;
    }

    return (
        <Box sx={{ width: 200 }}>
            <Slider
                size="small"
                value={value}
                step={100000}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={population[0]}
                max={population[1]}
                valueLabelFormat={valueLabelFormat}
            />
        </Box>
    );
}

export default RangeSlider;

