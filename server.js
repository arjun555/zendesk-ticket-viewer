const http = require ('./http')
const express = require('express')
// const axios = require('axios')
const dotenv = require ('dotenv')
const app = express()
const port = 8080;
// configure dotenv module
dotenv.config()

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
// set the view directory to ./views
app.set("views", `./views`)
// express setting to use ejs as render engine
app.set('view engine', 'ejs')


app.get('/', (req, appRes) => {
    appRes.render('home')
})

app.get('/tickets', (req, appRes) => {
    // Get all tickets
    http.getAllTicketData().then((result) => 
                                appRes.render('tickets', {
                                    tickets: result.tickets,
                                    nextPage: result.next_page
                                }))
                            .catch((error) => console.log(error))
})


