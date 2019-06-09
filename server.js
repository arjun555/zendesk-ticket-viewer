const http = require ('./tickets')
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

app.get('/', (req, appRes) => {

    http.getAllTicketData().then((result) => console.log(result))
                            .catch((error) => console.log(error))

})


