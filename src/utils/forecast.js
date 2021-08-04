const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1dff4ad555295d7b11f6b660d2fa8a0f&query=${latitude}, ${longitude}`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to the weather service!", undefined);
    } else if (body.success === false) {
      callback(body.error.info, undefined);
    } else {
      const current = body.current;
      callback(
        undefined,
        `${current.weather_descriptions[0]}. It is currently ${current.temperature} C out. It feels like ${current.feelslike} C. The humidity is ${current.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
