import { useEffect, useState } from 'react'
import { Card } from 'antd'
import dayjs from 'dayjs';
import axios, { AxiosResponse } from 'axios';

import DatePicker from '../components/DatePicker';
import TimePicker from '../components/TimePicker';
import Image from '../components/Image';
import Location from '../components/Location';
import { Weather } from '../components/Weather';
import { getClosestGeoLocations } from '../utils';
import { PAGE_TITLE } from '../constants/displayMessage';
import { getApiRequest } from '../api';

function Home() {
  const [initialState, setInitialState] = useState({
    date: dayjs(new Date('2021-03-20')).format('YYYY-MM-DD'),
    time: dayjs("09:10:00", "HH:mm:ss").format('HH:mm:ss'),
    locations: [],
    cameras: [],
    geoLocations: [], // List of location from cameras
    locationDetails: {
      name: "",
      area: "",
      forecast: ""
    },
    trafficImageDetails: {
      image: ""
    }
  });

  useEffect(() => {
    if (initialState.date && initialState.time) {
      loadData();
    }
  }, [initialState.date, initialState.time])

  const loadData = async () => {
    const TRAFFIC_IMAGES_API = `transport/traffic-images?date_time=${dayjs(`${initialState.date} ${initialState.time}`).format('YYYY-MM-DDTHH:mm:ss')}`
    const response: any = await getApiRequest(TRAFFIC_IMAGES_API);
    let geoLocationsList: any[] = []; 
    response.data.items[0].cameras.forEach((item: any) => {
      geoLocationsList.push(item.location)
    });
    callWeatherAPI();
    setInitialState((prevState: any) => {
      return {
        ...prevState,
        cameras: response.data.items[0].cameras,
        geoLocations: geoLocationsList
      }
    });
  }

  const callWeatherAPI = async () => {
    const WEATHER_API = `environment/2-hour-weather-forecast?date_time=${dayjs(`${initialState.date} ${initialState.time}`).format('YYYY-MM-DDTHH:mm:ss')}`;
    const response: any = await getApiRequest(WEATHER_API)
    wheatherState(response);
  }

  const wheatherState = (response: AxiosResponse<any, any>) => {
    let results: any = [];
  
    response.data.items.forEach((item: { forecasts?: any; }) => {
      if (Object.keys(item).length > 0) {
        item.forecasts.forEach((forecast: any) => {
          response.data.area_metadata.forEach((meta: any) => {
            if (forecast.area === meta.name) {
              let result = {
                  name: meta.name,
                  area: forecast.area,
                  forecast: forecast.forecast,
                  location: meta.label_location
              }
              results.push(result);
            } 
          });
        });

        setInitialState((prevState: any) => {
          return {
            ...prevState, 
            locations: results 
          }
        });
      } else {
          setInitialState((prevState: any) => {
            return {
              ...prevState,
              locations: []
            }
          });
      }
    });
  }

  const handleOnChange = (value: any, fieldName: any) => {
    setInitialState({
      ...initialState,
      [fieldName] : value,
      locations: [],
      cameras: [],
      geoLocations: [],
      locationDetails: {
        name: "",
        area: "",
        forecast: ""
      },
      trafficImageDetails: {
        image: ""
      }
    });
    
  }

  const handleLocationClick = (selectedLocation: any) => {
    let imageDetails: any = '';
    const nearestLocation = getClosestGeoLocations(initialState.geoLocations, selectedLocation.location);
    imageDetails = initialState.cameras.find((item: any) => item.location.latitude === nearestLocation.latitude && item.location.longitude === nearestLocation.longitude);

    setInitialState((prevState: any) => {
      return {
        ...prevState,
        locationDetails: selectedLocation,
        trafficImageDetails: imageDetails
      }
    })
  }

  const { locations, locationDetails, trafficImageDetails, date, time } = initialState;

  return (
    <Card title={PAGE_TITLE}>
      <section className='mb-6'>       
        <DatePicker value={date} onChange={handleOnChange} />
        <TimePicker value={time} onChange={handleOnChange} />
      </section>

      <section className='mb-6'>  
        {locations.length && <Location locations={locations} onLocationClick={handleLocationClick} /> }
        {locationDetails.name && <Weather locationDetails={locationDetails} /> }
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