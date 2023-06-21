const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// NEED THIS LINE TO SET UP HANDLEBARS FOR EXPRESS
app.set('view engine', 'hbs')

// This points the app to look for views under viewspath
app.set('views', viewsPath)

// Register path for your handlebar partials
hbs.registerPartials(partialsPath)

//serve up static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

// Get the file "index" from views rather than the public directory 
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather Application v2.1",
        name: "Ryan Hayward"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "Weather Application v2.1",
        name: "Ryan Hayward"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Weather Application v2.1",
        msg: "Get some help here son"
    })
})

// Weather route
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Must enter an address as a query param.'
        })
    }
    //pass address to geocode function
    geocode(req.query.address, (error, gc_data) => {
        if (error) {
            return res.send({error})
        }
        
        forecast(gc_data.features[0].center[1], gc_data.features[0].center[0], (error, forecastData) => {
            if (error) {
                return res.send({error})
            } else {
                res.send({
                    forecast: forecastData,
                    location: gc_data.features[0].place_name,
                    address: req.query.address
                })
            }
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        //using return stops the function and prevents errors, or can use else {}
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    res.send({
        products: []
    })
})


// Can provide more specific 404's for more specific errors
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Weather Application v2.1"
    })
})

// 404 error message protocol (use *)
app.get('*', (req, res) => {
    res.render('404', {
        title: "Weather Application v2.1"
    })
})



// Common development port (default for HTTP is Port 80)
// Tell the app to listen on port 3000 OR the environmentally available port
app.listen(port, () => {
    console.log('Server is up and running on ' + port)
})


