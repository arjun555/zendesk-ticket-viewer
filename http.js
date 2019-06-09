const axios = require('axios')
const dotenv = require ('dotenv')
dotenv.config()

const token = new Buffer(`${process.env.ZENDESK_API_USER}:${process.env.ZENDESK_API_PASS}`).toString('base64')
// Get tickets from API
function getAllTicketData (numberOfTickets=25){
    return axios.get(`https://${process.env.ZENDESK_API_DOMAIN}.zendesk.com/api/v2/tickets?per_page=${numberOfTickets}`, {
        headers: {
            Authorization: `Basic ${token}` 
        }})
        .then(res => {
            return (res.data)})
        .catch(res => {
            return (res.response)})
}

module.exports = {
    getAllTicketData: getAllTicketData
}
