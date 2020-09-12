const API_KEY = require("../keys");
const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const urlWeather =
    "http://api.weatherstack.com/current?access_key=" +
    API_KEY.WEATHERSTACK +
    "&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url: urlWeather, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      callback(body.error.info);
    } else {
      const weatherDescriptions = body.current.weather_descriptions[0];
      const temperature = body.current.temperature;
      const feelslike = body.current.feelslike;

      callback(
        undefined,
        weatherDescriptions +
          ". It is currently " +
          temperature +
          " degress out. It feels like " +
          feelslike +
          " degress out."
      );
    }
  });
};

module.exports = forecast;
