const homeController = require('./controllers/homeController')
const ticketsController = require('./controllers/ticketsController')
const express = require('express')
const app = express()
const port = 8080;

// // configure dotenv for environment variables
// dotenv.config()
// set the view directory to ./views and the view engine to ejs
app.set('views', './views')
app.set('view engine', 'ejs')
// middleware function to serve static files from public
app.use(express.static('public'));
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

///////////////////////////////////////////////////////////////////////////////////////////////////
// Routing
///////////////////////////////////////////////////////////////////////////////////////////////////

// Startup Route
app.get('/', (req, res) => homeController.render(req, res))

// Tickets Route
app.get('/tickets', (req, res) => ticketsController.ticketsPage(req, res))

// Unknown Route 
app.get('*', (req, res) => renderUnknownRoute(req, res));

// Render error.ejs page for the case of an unknown route
function renderUnknownRoute(pageReq, pageRes){
    pageRes.render('error',
    {
        status: '404',
        text: `The requested URL '${pageReq.res.req._parsedOriginalUrl.pathname}' was not found on this server.`
    })
}