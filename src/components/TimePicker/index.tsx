import { TimePicker as Time } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { WeatherFields } from '../../constants/displayFields';
import { DATE_TIME_TYPE } from '../../constants/types';

dayjs.extend(customParseFormat);

interface Props { 
  value: string;
  onChange: (value: string, fieldName: string) => void;
}

const TimePicker = ({value, onChange } : Props) => {
  const handleChange = (time: any, timeString: string) => {
    onChange(timeString, WeatherFields.TIME )
  };

  return (
    <Time
      defaultValue={dayjs(value, DATE_TIME_TYPE.TIME_FORMAT)}
      className='timer-picker'
      onChange={handleChange}
    />
  );
};

export default TimePicker;
