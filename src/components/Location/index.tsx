import { Select } from 'antd';
import { useMemo } from 'react';
import { SELECT_LOCATION } from '../../constants/displayMessage';

interface Props {
  locations: any;
  onLocationClick: (location: any) => void
}

const Location = ({ locations, onLocationClick}:Props) => {  
  const selectOptions = useMemo(() => {
    return locations.map((location: any) => ({...location, label: location.name, value: location.name.replace(/\s/g, '') }))
  }, [locations]);

  const handleChange = (value: string) => {
    if (value) {
      const selectedLocation = locations.find((location: any) => location.name.replace(/\s/g, '') === value); 
      onLocationClick(selectedLocation);
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




// const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

// const App: React.FC = () => {
//   const [selectedItems, setSelectedItems] = useState<string[]>([]);

//   const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

//   return (
//     <Select
//       placeholder="Inserted are removed"
//       value={selectedItems}
//       onChange={setSelectedItems}
//       style={{ width: '100%' }}
//       options={filteredOptions.map((item) => ({
//         value: item,
//         label: item,
//       }))}
//     />
//   );
// };

// export default App;