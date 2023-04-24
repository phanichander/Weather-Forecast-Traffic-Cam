const distance = (geoLocation: any, selectedGeoLocation: any) => {
    return Math.sqrt(Math.pow(selectedGeoLocation.latitude - geoLocation.latitude, 2) + Math.pow(selectedGeoLocation.longitude - geoLocation.longitude, 2))
}

export const getClosestGeoLocations = (geoLocations:any , selectedGeoLocation: any) => {
    return geoLocations.reduce((a: number, b: number) => distance(selectedGeoLocation, a) < distance(selectedGeoLocation, b) ? a : b);
}