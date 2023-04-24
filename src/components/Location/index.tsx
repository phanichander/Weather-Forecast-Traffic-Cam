import { Select } from 'antd';
import { useMemo } from 'react';

import { SELECT_LOCATION } from '../../constants/displayMessage';
import { locationDetails } from '../../constants/types';

interface Props {
  locations: locationDetails[];
  onLocationClick: (location: locationDetails) => void
}

const Location = ({ locations, onLocationClick } : Props) => {  
  const selectOptions = useMemo(() => {
    return locations.map((location: locationDetails) => ({...location, label: location.name, value: location.name.replace(/\s/g, '')}));
  }, [locations]);

  const handleChange = (value: string) => {
    if (value) {
      const selectedLocation = locations.find((location: locationDetails) => location.name.replace(/\s/g, '') === value); 
      
      if (selectedLocation) {
        onLocationClick(selectedLocation);
      }
    }
  }

  return (      
    <Select
      className="location-details w-full"
      allowClear
      showSearch
      placeholder={SELECT_LOCATION}
      onChange={handleChange}
      options={selectOptions}
    />
  );
}

export default Location;
