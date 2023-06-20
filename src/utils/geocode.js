const request = require('request');

const geocode = (address, callback) => {
    //use encodeURIComponent to protect any user inputted variable from fucking up the URL
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmNoYXl3YXJkIiwiYSI6ImNsYjQ3eTYxODAzdXo0MG82OGFkNmMxeGoifQ.1HKGF_q7oCLkxMP5JOIsLQ&limit=1'

    request({url: url, json: true}, (error, response) => {
        //if error is defined,
        if (error) {
            callback('unable to connect to location services', undefined);
        } else if (response.body.features.length === 0) {
            //if response is valid but empty
            callback('Unable to find location, try another.', undefined);
        } else {
            callback(undefined, response.body)
        }
    })

}
//can require this module wherever we want to use it
module.exports = geocode;