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

export const DATE_TIME_TYPE = {
  DATE_FORMAT: "YYYY-MM-DD",
  TIME_FORMAT: "HH:mm:ss",
  DATE_TIME_FORMAT: "YYYY-MM-DDTHH:mm:ss"
}