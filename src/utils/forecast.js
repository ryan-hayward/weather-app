const request = require('request');

const forecast = (lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=205cedda24adb27da50db561d0e40d78&query=' + lat + ',' + long + '&units=f'

    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback("unable to print current location")
        } else if (response.body.error) {
            callback("invalid request")
        }
        else {  
            callback (undefined, {
                temp : response.body.current.temperature,
                precip : response.body.current.precip
            })    
        }
    })
}

module.exports = forecast;

//NOTE: this only doesn't work because of an issue with access associated with the free tier