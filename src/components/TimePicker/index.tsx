

import React from 'react';
import { TimePicker as Time } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { WeatherFields } from '../../constants/displayFields';

dayjs.extend(customParseFormat);

interface Props { 
  value: string;
  onChange: any;
}

const TimePicker = ({value, onChange } : Props) => {
  const handleChange = (time: any, timeString: string) => {
    onChange(timeString, WeatherFields.TIME )
  };

  return <Time
    defaultValue={dayjs(value, 'HH:mm:ss')}
    className='timer'
    onChange={handleChange}
    defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
  />
};

export default TimePicker;
