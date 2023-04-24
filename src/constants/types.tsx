export type locationDetails = {
  name: string,
  area: string,
  forecast: string,
  location: { latitude: number, longitude: number }
}

export type cameraDetails = {
  camera_id: string,
  image: string,
  image_metadata: {
    height: number, width: number, md5: string
  },
  location: { latitude: number, longitude: number },
  timestamp: string
}
