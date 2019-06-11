const axios = require('axios')

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

    setNextPage(url){
        return this.nextPage = url
    }

    getNextPage(currentPageNum){
        return this.nextPage ?  Number(currentPageNum) + 1 : 0;
    }

    setPreviousPage(url){
        return this.previousPage = url
    }

    getPreviousPage(currentPageNum){
        return this.previousPage ?  Number(currentPageNum) - 1 : 0;
    }

    setTicketCount(ticketCount){
        return this.count = ticketCount
    }

    // Get tickets from API. Number of tickets data is capped by the value of this.perPage property
    getTickets (page=1){
        return axios.get(`https://${this.domain}.zendesk.com/api/v2/tickets?page=${page}&per_page=${this.perPage}`, {
            headers: {
                Authorization: `Basic ${this.token}` 
            }})
            .then(res => {
                // status will be 200
                this.setNextPage(res.data.next_page)
                this.setPreviousPage(res.data.previous_page)
                return (res.data)})
            .catch(res => {
                // status will be  >= 400
                return (res.response)})
    }
}

module.exports = {Tickets}