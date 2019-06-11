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
app.get('/', (req, res) => homePage(req, res))

// Tickets Route
app.get('/tickets', (req, res) => ticketsPage(req, res))

function ticketsPage (req, pageRes) {
    // Set page number
    let page = 1;
    if(req.query.page){
        page = req.query.page
    }

    // Call API for Ticket Data
    tickets.getTickets(page)
        .then((dataRes) => {
            processData(dataRes)
            return dataRes
        })
        .then((dataRes) => {
            renderTickets(pageRes, dataRes, page)} )
        .catch((err) => {renderError(pageRes, err)})
}

function processData(res){
    tickets.processData(res.data)
}

function renderTickets(pageRes, dataRes, page){
    pageRes.render('tickets', {
        tickets: dataRes.data.tickets,
        nextPage: tickets.getNextPage(page),
        previousPage: tickets.getPreviousPage(page),
        count: dataRes.data.count
})}

function renderError(pageRes, errRes){
    pageRes.render('error',
    {
        status: errRes.response.status,
        text: errRes.response.statusText
    })
}

function homePage(req, res){
    res.render('home')
}