const path = require('path');
const express = require('express');
const chalk = require('chalk');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath)); 
  
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mike Cho'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mike Cho'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'Let us help you',
        title: 'help', 
        name: 'Mike Cho'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })    
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error })
        }    
        forecast(latitude, longitude,  (error, forecastData) => {
          if (error) {
            return res.send({ error })
        }  
        res.send(
            {
                forecast: forecastData,
                location: location,
                address: req.query.address
            }
        );
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    } 
    res.send({
        products: []
    });
 
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        message: 'sorry, that help article not found',
        name: 'Mike Cho'
        }
    )
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'sorry, that page not found',
        name: 'Mike Cho'
    })
})

app.listen(3000, () => {
    console.log(chalk.redBright('Server is up on port 3000'));
})