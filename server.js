const http = require ('./http')
const {Tickets} = require('./tickets')
const dotenv = require ('dotenv')
const express = require('express')
const app = express()
const port = 8080;

// configure dotenv for environment variables
dotenv.config()

// set the view directory to ./views and the view engine to ejs
app.set('views', './views')
app.set('view engine', 'ejs')
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
    tickets.getTickets()
            .then((result) => {
                if(result.tickets){
                    appRes.render('tickets', {
                        tickets: result.tickets,
                        nextPage: result.next_page,
                        prevPage: result.previous_page,
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


app.get('/next', (req, appRes) => {
    tickets.getNextTicketsPage()
            .then((result) => {
                if(result.tickets){
                    appRes.render('tickets', {
                        tickets: result.tickets,
                        nextPage: result.next_page,
                        previousPage: result.previous_page,
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