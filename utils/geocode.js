const API_KEY = require("../keys");
const request = require("request");

// Geocoding
const geocode = (address, callback) => {
  if (!address) return callback("Please provide an address!");

  const urlMapbox =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?limit=1&access_token=" +
    API_KEY.MAPBOX;

  request({ url: urlMapbox, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to geoconding services!");
    } else if (body.features.length === 0) {
      callback("Unable to find location! Try again.", undefined);
    } else {
      callback(undefined, {
        location: address,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
      });
    }
  });
};

module.exports = geocode;
