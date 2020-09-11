const API_KEY = require("./keys.js");
const request = require("request");

const urlWeather =
  "http://api.weatherstack.com/current?access_key=" +
  API_KEY.WEATHERSTACK +
  "&query=Salvador&units=f";

request({ url: urlWeather, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to weather service!");
  } else if (response.body.error) {
    console.log(response.body.error.info);
  } else {
    const weatherDescriptions = response.body.current.weather_descriptions[0];
    const temperature = response.body.current.temperature;
    const feelslike = response.body.current.feelslike;

    console.log(
      weatherDescriptions +
        ". It is currently " +
        temperature +
        " degress out. It feels like " +
        feelslike +
        " degress out."
    );
  }
});

// Geocoding
const urlMapbox =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Salvador.json?limit=1&access_token=" +
  API_KEY.MAPBOX;

request({ url: urlMapbox, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to geoconding services!");
  } else if (response.body.error) {
    console.log(response.body.error);
  } else if (response.body.features.length === 0) {
    console.log("Unable to find location! Try again.");
  } else {
    const longitude = response.body.features[0].center[0];
    const latitude = response.body.features[0].center[1];

    console.log("Longitude is " + longitude);
    console.log("Latitude is " + latitude);
  }
});
