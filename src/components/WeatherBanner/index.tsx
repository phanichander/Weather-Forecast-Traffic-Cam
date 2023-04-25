import { WeatherColors, WeatherIcons, WeatherTypes } from "../../constants/displayFields";
import { AREA_NAME_NOT_FOUND, FORECAST_NOT_FOUND } from "../../constants/displayMessage";
import { locationDetails } from "../../constants/types";

interface Props {
  locationDetails: locationDetails;
}

export const WeatherBanner = ({ locationDetails }: Props) => {
  const { forecast, name } = locationDetails;
  let icon = WeatherIcons.NIGHT_CLEAR;
  let color = WeatherColors.NIGHT;

  if (forecast) {
    switch (forecast) {
      case WeatherTypes.FAIR_NIGHT:
        icon = WeatherIcons.NIGHT_CLEAR;
        color = WeatherColors.NIGHT;
      break;

      case WeatherTypes.WINDY:
        icon = WeatherIcons.CLOUDY_WINDY;
        color = WeatherColors.WINDY;
      break;

      case WeatherTypes.PARTLY_CLOUDY_DAY:
        icon = WeatherIcons.DAY_CLOUDY;
        color = WeatherColors.DAY_CLOUDY;
      break;

      case WeatherTypes.FAIR_AND_WARM:
        icon = WeatherIcons.SUNNY_OVERCAST;
        color = WeatherColors.FAIR_WARM;
      break;

      case WeatherTypes.CLOUDY:
        icon = WeatherIcons.CLOUDY;
        color = WeatherColors.CLOUDY;
      break;

      case WeatherTypes.THUNDERY_SHOWERS:
        icon = WeatherIcons.THUNDER;
        color = WeatherColors.THUNDER;
      break;

      case WeatherTypes.FAIR_DAY:
      default:
          icon = WeatherIcons.DAY_SUNNY;
          color = WeatherColors.DAY;
      }
  }

  return (
    <div className={`mt-6 weather_banner ${color}`}>
      <div className="icon">
        <i className={icon} />
      </div>
      
      <div className="weather_desc">
        <p> {!forecast ? FORECAST_NOT_FOUND : forecast} </p>
        <p> {!name ? AREA_NAME_NOT_FOUND : name} </p>
      </div>
    </div>
  )
};
