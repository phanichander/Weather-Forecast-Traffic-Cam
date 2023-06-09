import { useCallback, useEffect, useReducer, useState } from 'react'
import { Card } from 'antd'
import dayjs from 'dayjs';

import DatePicker from '../components/DatePicker';
import TimePicker from '../components/TimePicker';
import Image from '../components/Image';
import { ListOfLocation } from '../components/ListOfLocation';
import { WeatherBanner } from '../components/WeatherBanner';
import { getClosestGeoLocations, getLocationList } from '../utils';
import { INVALID_DATE, PAGE_TITLE } from '../constants/displayMessage';
import { getApiRequest } from '../api';
import { DATE_TIME_TYPE, cameraDetails as cameraDetailsType, locationDetails } from '../constants/types';
import { dateTimeReducer } from '../reducer';

function Home() {
  const [dateTimeState, dispatch] = useReducer(dateTimeReducer, {
    date: dayjs(new Date('2021-03-20')).format(DATE_TIME_TYPE.DATE_FORMAT),
    time: dayjs("09:10:00", DATE_TIME_TYPE.TIME_FORMAT).format(DATE_TIME_TYPE.TIME_FORMAT),
  });

  // const [dateTimeState, setDateTimeState] = useState({
  //   date: dayjs(new Date('2021-03-20')).format(DATE_TIME_TYPE.DATE_FORMAT),
  //   time: dayjs("09:10:00", DATE_TIME_TYPE.TIME_FORMAT).format(DATE_TIME_TYPE.TIME_FORMAT),
  // });
  const [trafficState, setTrafficState] = useState({
    cameras: [],
    geoLocations: []
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
    }
  });

  useEffect(() => {
    if (![dateTimeState.date, dateTimeState.time].includes('Invalid Date')) {
      callTrafficAPI();
      callWeatherAPI();
    }
  }, [])

  const callTrafficAPI = async () => {
    const TRAFFIC_IMAGES_API = `transport/traffic-images?date_time=${dayjs(`${dateTimeState.date} ${dateTimeState.time}`).format(DATE_TIME_TYPE.DATE_TIME_FORMAT)}`
    const response: any  = await getApiRequest(TRAFFIC_IMAGES_API);
    const cameraDetails = response.data.items[0].cameras;
    let geoLocationsList: any = []; 

    if(Boolean(cameraDetails.length)) {
      cameraDetails.map((camera: any) => {
        geoLocationsList.push(camera.location)
      });

      setTrafficState({
        cameras: cameraDetails,
        geoLocations: geoLocationsList
      });
    }
  }

  const callWeatherAPI = async () => {
    const WEATHER_API = `environment/2-hour-weather-forecast?date_time=${dayjs(`${dateTimeState.date} ${dateTimeState.time}`).format(DATE_TIME_TYPE.DATE_TIME_FORMAT)}`;
    const locationList: any = await getLocationList(await getApiRequest(WEATHER_API));
     
    if (Boolean(locationList.length)) {
      setWeatherState({
        ...weatherState, 
        locations: locationList 
      });
    }
  }

  const handleDateTimeChange = useCallback((value: string, fieldName: string) => {
    // setDateTimeState({
    //   ...dateTimeState,
    //   [fieldName] : value
    // });
    dispatch({ type: fieldName, [fieldName]: value });
    
    if (value !== INVALID_DATE) {
      callTrafficAPI();
      callWeatherAPI();

      setTrafficState({
        cameras: [],
        geoLocations: []
      });
  
      setWeatherState({
        ...weatherState,
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
  }, [dateTimeState])

  const handleLocationClick = (selectedLocation: locationDetails) => {
    const { geoLocations, cameras } = trafficState;
    const nearestLocation = getClosestGeoLocations(geoLocations, selectedLocation.location);
    const imageDetails: cameraDetailsType | undefined = cameras.find((item: cameraDetailsType) => item.location.latitude === nearestLocation.latitude && item.location.longitude === nearestLocation.longitude);

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
  const { name } = selectedLocationDetails;
 
  return (
    <Card title={PAGE_TITLE}>
      <section className='mb-6'>       
        <DatePicker value={date} onChange={handleDateTimeChange} />
        <TimePicker value={time} onChange={handleDateTimeChange} />
      </section>
      
      {(Boolean(date !== INVALID_DATE) && Boolean(time)) &&
        <>
          <section className='mb-6'>
            {Boolean(locations.length) && <ListOfLocation showValue={Boolean(name)} locations={locations} onLocationClick={handleLocationClick} /> }
            {Boolean(name) && <WeatherBanner locationDetails={selectedLocationDetails} /> }
          </section>
          
          {
            trafficImageDetails.image &&
              <section className='text-center'>
                <Image source={trafficImageDetails.image} />
              </section>
          }
        </>
      }
    </Card>
  )
}

export default Home;
