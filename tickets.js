const axios = require('axios')
const dotenv = require ('dotenv')

class Tickets {

    constructor(user, domain){
        this.user = user,
        this.domain = domain,
        this.token = '',
        this.nextPage = null,
        this.previousPage = null,
        this.count = null,
        this.perPage = 25
    }

    // Calculate and Set Token for API
    setToken(password){
        this.token = new Buffer(`${this.user}:${password}`).toString('base64')
        return this.token
    }

    setNextPage(data){
        
    }

    // Get tickets from API. Number of tickets data is capped by the 'numberOfTickets' arg
    getTickets (numberOfTickets=25){
    return axios.get(`https://${this.domain}.zendesk.com/api/v2/tickets?per_page=${numberOfTickets}`, {
        headers: {
            Authorization: `Basic ${this.token}` 
        }})
        .then(res => {
            // status will be 200
            return (res.data)})
        .catch(res => {
            // status will be  >= 400
            return (res.response)})
    }

}

module.exports = {Tickets}