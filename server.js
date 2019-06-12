const homeController = require('./controllers/homeController')
const ticketsController = require('./controllers/ticketsController')
const unknownController = require('./controllers/unknownRouteController')
const express = require('express')
const app = express()
const port = 8080;

// set the view directory to ./views and the view engine to ejs
app.set('views', './views')
app.set('view engine', 'ejs')
// middleware function to serve static files from public
app.use(express.static('public'));
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

// Startup Route
app.get('/', (req, res) => homeController.render(req, res))

// Tickets Route
app.get('/tickets', (req, res) => ticketsController.render(req, res))

// Unknown Route 
app.get('*', (req, res) => unknownController.render(req, res));
