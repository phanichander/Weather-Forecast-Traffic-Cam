const distance = (geoLocation: any, selectedGeoLocation: any) => {
  return Math.sqrt(Math.pow(selectedGeoLocation.latitude - geoLocation.latitude, 2) + Math.pow(selectedGeoLocation.longitude - geoLocation.longitude, 2))
}

export const getClosestGeoLocations = (geoLocations:any , selectedGeoLocation: any) => {
  return geoLocations.reduce((a: number, b: number) => distance(selectedGeoLocation, a) < distance(selectedGeoLocation, b) ? a : b);
}

export const getLocationList = (response: any ) => {
  const { items, area_metadata } = response.data;
  let locationList: any = [];

  items.map((item: any) => {
    item.forecasts.map((forecast: any) => {
      const { name, label_location: location } = area_metadata.find((area: { name: string }) => area.name === forecast.area);
      locationList.push({ ...forecast, name, location });
    });
  });

  return locationList;
};

