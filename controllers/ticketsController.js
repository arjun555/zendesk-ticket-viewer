const dotenv = require ('dotenv')
const {Tickets} = require('../models/ticketsModel')
// configure dotenv for environment variables
dotenv.config()
// Initialize Tickets instance and set API token
const tickets = new Tickets(process.env.ZENDESK_API_USER, process.env.ZENDESK_API_DOMAIN)
tickets.setToken(process.env.ZENDESK_API_PASS)

function ticketsPage (req, pageRes) {
    // check page querystring is valid
    let page = tickets.checkPageValid(req.query.page)
    // Call API for Ticket Data
    tickets.getTickets(page)
        .then((dataRes) => {
            processData(dataRes)
            return dataRes
        })
        .then((dataRes) => {
            renderTickets(pageRes, dataRes, page)
        })
        .catch((err) => {renderError(pageRes, err)})
}

// Process the tickets data from a successful api call
function processData(res){
    tickets.processData(res.data)
}

// Render tickets.ejs to show ticket data
function renderTickets(pageRes, dataRes, page){
    pageRes.render('tickets', {
        tickets: dataRes.data.tickets,
        nextPage: tickets.getNextPage(page),
        previousPage: tickets.getPreviousPage(page),
        count: dataRes.data.count,
        currentPage: page,
        perPage: tickets.perPage
})}

// Render error.ejs page for the case of an api error response
function renderError(pageRes, errRes){
    pageRes.render('error',
    {
        status: errRes.response.status,
        text: errRes.response.statusText
    })
}

module.exports ={
    render: ticketsPage
}