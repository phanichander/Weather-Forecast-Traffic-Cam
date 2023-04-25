import { useEffect, useState } from 'react'
import { Card } from 'antd'
import dayjs from 'dayjs';

import DatePicker from '../components/DatePicker';
import TimePicker from '../components/TimePicker';
import Image from '../components/Image';
import Location from '../components/Location';
import { Weather } from '../components/Weather';
import { getClosestGeoLocations, getLocationList } from '../utils';
import { PAGE_TITLE } from '../constants/displayMessage';
import { getApiRequest } from '../api';
import { cameraDetails as cameraDetailsType, locationDetails } from '../constants/types';

function Home() {
  const [dateTimeState, setDateTimeState] = useState({
    date: dayjs(new Date('2021-03-20')).format('YYYY-MM-DD'),
    time: dayjs("09:10:00", "HH:mm:ss").format('HH:mm:ss'),
  });

  const [trafficState, setTrafficState] = useState({
    cameras: [],
    geoLocations: [] // List of location from cameras
  });

  const [weatherState, setWeatherState] = useState({
    locations: [],
    trafficImageDetails: {
      image: ""
    },
    selectedLocationDetails: {
      name: "",
      area: "",
      forecast: "",
      location: { latitude: 0, longitude: 0 }
    },
  });

  useEffect(() => {
    if (dateTimeState.date && dateTimeState.time) {
      callTrafficAPI();
      callWeatherAPI();
    }
  }, [dateTimeState.date, dateTimeState.time])

  const callTrafficAPI = async () => {
    const TRAFFIC_IMAGES_API = `transport/traffic-images?date_time=${dayjs(`${dateTimeState.date} ${dateTimeState.time}`).format('YYYY-MM-DDTHH:mm:ss')}`
    const response: any  = await getApiRequest(TRAFFIC_IMAGES_API);
    const cameraDetails = response.data.items[0].cameras;
    let geoLocationsList: any = []; 

    cameraDetails.map((camera: any) => {
      geoLocationsList.push(camera.location)
    });

    setTrafficState({
      cameras: cameraDetails,
      geoLocations: geoLocationsList
    });
  }

  const callWeatherAPI = async () => {
    const WEATHER_API = `environment/2-hour-weather-forecast?date_time=${dayjs(`${dateTimeState.date} ${dateTimeState.time}`).format('YYYY-MM-DDTHH:mm:ss')}`;
    const locationList: any = await getLocationList(await getApiRequest(WEATHER_API));
     
    if (Boolean(locationList.length)) {
      setWeatherState({
        ...weatherState, 
        locations: locationList 
      });
    } else {
      setWeatherState({
        ...weatherState,
        locations: []
      });
    }
  }

  const handleDateTimeChange = (value: string, fieldName: string) => {
    setDateTimeState({
      ...dateTimeState,
      [fieldName] : value
    });

    setTrafficState({
      cameras: [],
      geoLocations: []
    });

    setWeatherState({
      locations: [],
      trafficImageDetails: {
        image: ""
      },
      selectedLocationDetails: {
        name: "",
        area: "",
        forecast: "",
        location: { latitude: 0, longitude: 0 }
      }
    });
  }

  const handleLocationClick = (selectedLocation: locationDetails) => { 
    const nearestLocation = getClosestGeoLocations(trafficState.geoLocations, selectedLocation.location);
    const imageDetails: cameraDetailsType | undefined = trafficState.cameras.find((item: cameraDetailsType) => item.location.latitude === nearestLocation.latitude && item.location.longitude === nearestLocation.longitude);

    setWeatherState((prevState: any) => {
      return {
        ...prevState,
        selectedLocationDetails: selectedLocation,
        trafficImageDetails: imageDetails
      }
    })
  }

  const { date, time } = dateTimeState;
  const { locations, selectedLocationDetails, trafficImageDetails } = weatherState;

  return (
    <Card title={PAGE_TITLE}>
      <section className='mb-6'>       
        <DatePicker value={date} onChange={handleDateTimeChange} />
        <TimePicker value={time} onChange={handleDateTimeChange} />
      </section>

      <section className='mb-6'>  
        {Boolean(locations.length) && <Location locations={locations} onLocationClick={handleLocationClick} /> }
        {selectedLocationDetails.name && <Weather locationDetails={selectedLocationDetails} /> }
      </section>
      
      {
        trafficImageDetails.image &&
          <section className='text-center'>
            <Image source={trafficImageDetails.image} />
          </section>
      }
    </Card>
  )
}

export default Home;
