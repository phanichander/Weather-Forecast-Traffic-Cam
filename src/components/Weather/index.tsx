import { WeatherIcons, WeatherTypes } from "../../constants/displayFields";
import { locationDetails } from "../../constants/types";

interface Props {
  locationDetails: locationDetails;
}

export const Weather = ({ locationDetails }: Props) => {
  const { forecast, name } = locationDetails;
  
  let icon = WeatherIcons.NIGHT_CLEAR;
  let color = 'desc-night';

  if (forecast) {
    switch (forecast) {
      case WeatherTypes.FAIR_NIGHT:
        icon = WeatherIcons.NIGHT_CLEAR;
        color = 'desc-night';
      break;

      case WeatherTypes.WINDY:
        icon = WeatherIcons.CLOUDY_WINDY;
        color = 'desc-windy';
      break;

      case WeatherTypes.PARTLY_CLOUDY_DAY:
        icon = WeatherIcons.DAY_CLOUDY;
        color = 'desc-day-cloudy';
      break;

      case WeatherTypes.FAIR_AND_WARM:
        icon = WeatherIcons.SUNNY_OVERCAST;
        color = 'desc-fair-warm';
      break;

      case WeatherTypes.FAIR_DAY:
      default:
          icon = WeatherIcons.DAY_SUNNY;
          color = 'desc-day';
      }
  }

  return (
    <div className={`mt-6 card_banner ${color}`}>
      <div className="icon">
        <i className={icon} />
      </div>
      
      <div className="card_desc">
        <p> {!forecast ? 'Forecast not found' : forecast} </p>
        <p> {!name ? 'Area name not found' : name} </p>
      </div>
    </div>
  )
};
