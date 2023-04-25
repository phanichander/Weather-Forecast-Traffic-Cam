const distance = (geoLocation: any, selectedGeoLocation: any) => {
  return Math.sqrt(Math.pow(selectedGeoLocation.latitude - geoLocation.latitude, 2) + Math.pow(selectedGeoLocation.longitude - geoLocation.longitude, 2))
}

export const getClosestGeoLocations = (geoLocations:any , selectedGeoLocation: any) => {
  return geoLocations.reduce((a: number, b: number) => distance(selectedGeoLocation, a) < distance(selectedGeoLocation, b) ? a : b);
}

export const getLocationList = (response: any ) => {
  const { items, area_metadata } = response.data;
  let locationList: any = [];

  items.map((item: { forecasts: any[] }) => {
    item.forecasts.map((forecast: any) => {
      area_metadata.map((meta: any) => {
        if (forecast.area === meta.name) {
          let result = {
            name: meta.name,
            area: forecast.area,
            forecast: forecast.forecast,
            location: meta.label_location
          }

          locationList.push(result);
        }
      });
    });
  });

  return locationList;
};

