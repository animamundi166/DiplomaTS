import { Tooltip } from '@mui/material';
import Slider from '@mui/material/Slider';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filteredPopulationRange, minMaxPopulationValues, setFilteredPopul } from '../../store/populationSlice';
import style from './Slider.module.scss';

interface Props {
    children: React.ReactElement;
    value: number;
}

const RangeSlider = () => {
    const dispatch = useDispatch();
    const minMaxData = useSelector(minMaxPopulationValues);
    const filteredPopulData = useSelector(filteredPopulationRange);

    console.log('filteredPopulData', filteredPopulData);

    useEffect(() => {
        dispatch(setFilteredPopul(filteredPopulData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredPopulData])

    const handleChange = (event: Event, newValue: number | number[]) => {
        dispatch(setFilteredPopul(newValue as number[]));
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
            <Slider
                value={filteredPopulData}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={minMaxData[0]}
                max={minMaxData[1]}
                track={false}
                size="small"
                valueLabelFormat={valueLabelFormat}
                components={{
                    ValueLabel: ValueLabelComponent,
                }}
            />
        </div>
    );
}

export default RangeSlider;

