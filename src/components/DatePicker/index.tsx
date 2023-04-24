import { DatePicker as Date } from "antd";
import dayjs from "dayjs";

import { WeatherFields } from "../../constants/displayFields";

interface Props {
  value: string;
  onChange: (value: string, fieldName: string) => void;
}

const DatePicker = ({ value, onChange }: Props) => {
  const handleOnChange = (date: any, dateString: string) =>{
    onChange(dateString, WeatherFields.DATE)
  }

  return <Date
    className='date-picker'
    format="YYYY-MM-DD"
    defaultValue={dayjs(value, 'YYYY-MM-DD')}
    onChange={handleOnChange}
  />
}

export default DatePicker;