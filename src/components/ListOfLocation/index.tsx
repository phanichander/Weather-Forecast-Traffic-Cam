import { Select } from 'antd';
import { useMemo, useState } from 'react';

import { SELECT_LOCATION } from '../../constants/displayMessage';
import { locationDetails } from '../../constants/types';
import { truncateSpace } from '../../utils';

interface Props {
  showValue: boolean;
  locations: locationDetails[];
  onLocationClick: (location: locationDetails) => void
}

export const ListOfLocation = ({ showValue, locations, onLocationClick } : Props) => {  
  const [value, setValue] = useState("");

  const selectOptions = useMemo(() => {
    return locations.map((location: locationDetails) => ({...location, label: location.name, value: truncateSpace(location.name)}));
  }, [locations]);

  const handleChange = (value: string) => {
    if (value) {
      const selectedLocation = locations.find((location: locationDetails) => truncateSpace(location.name) === value); 
      
      if (selectedLocation) {
        setValue(value)
        onLocationClick(selectedLocation);
      }
    }
  }

  return (      
    <Select
      value={showValue ? value : ""}
      className="location-details w-full"
      allowClear
      showSearch
      placeholder={SELECT_LOCATION}
      onChange={handleChange}
      options={selectOptions}
    />
  );
};