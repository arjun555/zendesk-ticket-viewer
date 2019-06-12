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
// middleware function to serve static files from public
app.use(express.static('public'));
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

app.get('*', (req, res) => { renderUnknownRoute(req, res)});

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
            // return dataRes so that it can be used in the next .then() chain
            return dataRes
        })
        .then((dataRes) => {
            renderTickets(pageRes, dataRes, page)
        })
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

function renderUnknownRoute(pageReq, pageRes){
    pageRes.render('error',
    {
        status: '404',
        text: `The requested URL '${pageReq.res.req._parsedOriginalUrl.pathname}' was not found on this server.`
    })
}

function homePage(req, res){
    res.render('home')
}