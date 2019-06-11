const http = require ('./http')
const {Tickets} = require('./tickets')
const dotenv = require ('dotenv')
const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const app = express()
const port = 8080;

// configure dotenv for environment variables
dotenv.config()

// set the view directory to ./views and the view engine to ejs
app.set('views', './views')
app.set('view engine', 'ejs')
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

// Initialize Tickets instance and set API token
const tickets = new Tickets(process.env.ZENDESK_API_USER, process.env.ZENDESK_API_DOMAIN)

tickets.setToken(process.env.ZENDESK_API_PASS)

///////////////////////////////////////////////////////////////////////////////////////////////////
// Routing
///////////////////////////////////////////////////////////////////////////////////////////////////

// Startup Route
app.get('/', (req, appRes) => {
    appRes.render('home')
})

// Tickets Route
app.get('/tickets', (req, appRes) => {

    // Set page
    let page = 1;
    if(req.query.page){
        page = req.query.page
    }

    tickets.getTickets(page)
            .then((result) => {
                if(result.tickets){
                    appRes.render('tickets', {
                        tickets: result.tickets,
                        nextPage: tickets.getNextPage(page),
                        previousPage: tickets.getPreviousPage(page),
                        count: result.count
                    })
                }else{
                    appRes.render('error', {
                        status: result.status,
                        text: result.statusText
                    })
                }
            })
            .catch((error) => {console.log(error)})
})