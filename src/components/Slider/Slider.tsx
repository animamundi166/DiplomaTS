import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

function valuetext(value: number) {
    return `${value}°C`;
}

const RangeSlider = () => {
    const [value, setValue] = useState<number[]>([20, 37]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    console.log(value[0]);


    return (
        <Box sx={{ width: 200 }}>
            <Slider
                getAriaLabel={() => 'Population range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
        </Box>
    );
}

export default RangeSlider;

