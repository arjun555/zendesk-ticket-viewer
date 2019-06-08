const express = require('express')
const axios = require('axios')
const dotenv = require ('dotenv')
const app = express()
const port = 8080;

// configure dotenv module
dotenv.config()

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.send('hi')
})

const token = new Buffer(`${process.env.ZENDESK_API_USER}:${process.env.ZENDESK_API_PASS}`).toString('base64')
axios.get(`https://${process.env.ZENDESK_API_DOMAIN}.zendesk.com/api/v2/tickets?per_page=3`, {
 headers: {
   Authorization: `Basic ${token}` 
 }
}).then(res => console.log(res))
    .catch(res => console.log(res.response))