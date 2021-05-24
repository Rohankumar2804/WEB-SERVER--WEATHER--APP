const request = require("request");
const forecast = (latitude, longitude, callback) => {
  let appId = "2f7ef2a30b1fba49b1844ce406c6fc17";
  let url = `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${appId}`;
  //console.log(url);
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      console.log("Unable to connect weather service", undefined);
    } else if (response.body.message) {
      console.log("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        "It is currently " +
          response.body.main.temp +
          " degree celcuis and there is " +
          response.body.weather[0].description +
          " weather"
      );
    }
  });
};

module.exports = forecast;
