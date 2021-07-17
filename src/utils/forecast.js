const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=9691a75c2815b9d98fa1c64fb02ae705&query=" + latitude + "," + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to Weather service!", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, `It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`);
        }
    })
};

module.exports = forecast;