const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidWRkZXNoeWE5OCIsImEiOiJja3JscHBzb3oxYnc2MnZydnR6Z2hqZHltIn0.xVVLdXkETQc5_1Po8AuOFQ&limit=1`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location service!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the location. Try another search.", undefined);
    } else {
      const feature = body.features[0];
      callback(undefined, {
        latitude: feature.center[1],
        longitude: feature.center[0],
        location: feature.place_name
      });
    }
  });
};

module.exports = geocode;
