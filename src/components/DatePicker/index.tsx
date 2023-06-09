import { memo } from 'react';
import { DatePicker as Date } from "antd";
import dayjs from "dayjs";

import { WeatherFields } from "../../constants/displayFields";
import { DATE_TIME_TYPE } from "../../constants/types";
import { INVALID_DATE } from '../../constants/displayMessage';

interface Props {
  value: string;
  onChange: (value: string, fieldName: string) => void;
}

const DatePicker = ({ value, onChange }: Props) => {
  const handleOnChange = (date: dayjs.Dayjs | null) =>{
    onChange(dayjs(date).format(DATE_TIME_TYPE.DATE_FORMAT), WeatherFields.DATE)
  }

  return <Date
    className='date-picker'
    format={DATE_TIME_TYPE.DATE_FORMAT}
    defaultValue={dayjs(value, DATE_TIME_TYPE.DATE_FORMAT)}
    onChange={handleOnChange}
    status={value === INVALID_DATE  ? "error" : ""}
  />
}

export default memo(DatePicker);