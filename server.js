const http = require ('./http')
const express = require('express')
const app = express()
const port = 8080;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
// set the view directory to ./views and the view engine to ejs
app.set('views', './views')
app.set('view engine', 'ejs')

// Routing
app.get('/', (req, appRes) => {
    appRes.render('home')
})

app.get('/tickets', (req, appRes) => {
    // Get all tickets
    http.getTickets().then((result) => 

                                appRes.render('tickets', {
                                    tickets: result.tickets,
                                    nextPage: result.next_page
                                }))
                            .catch((error) => console.log(error))
})


