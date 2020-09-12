const yargs = require("yargs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

geocode(yargs.argv._[0], (error, { latitude, longitude, location } = {}) => {
  if (error) {
    return console.log("Error", error);
  }

  forecast(latitude, longitude, (error, forescastData) => {
    if (error) {
      return console.log("Error", error);
    }
    console.log(location);
    console.log(forescastData);
  });
});

yargs.parse();
