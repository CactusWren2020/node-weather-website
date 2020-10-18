const request = require('postman-request');
const chalk = require('chalk');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=41f70748c480974186e876eb25ed2133&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f';
 
    request({url, json: true }, (error, { body } ) => {
        if (error) {
            callback('sorry, we can\'t process that request', undefined);
        } else if (body.error) {
            callback('unable to find that location', undefined);
        } else {
            const data = body.current;
            const message = 'It is currently ' + data.weather_descriptions[0] + ' and ' + data.temperature + ' degrees out. It feels like ' + data.feelslike + ' degrees out. For you sailors, the pressure is ' + data.pressure + ' and the wind direction is ' + data.wind_dir + '.';
            callback(undefined, message);
        }
    });
    
}
 
module.exports = forecast;