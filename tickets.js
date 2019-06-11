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

    processData(apiData){
        this.setNextPage(apiData.next_page)
        this.setPreviousPage(apiData.previous_page)
        this.setTicketCount(apiData.count)
    }

    // Get tickets from API. Number of tickets data is capped by the value of this.perPage property
    getTickets(page=1){
        return axios.get(`https://${this.domain}.zendesk.com/api/v2/tickets?page=${page}&per_page=${this.perPage}`, {
            headers: {
                Authorization: `Basic ${this.token}` 
            }})
    }
}

module.exports = {Tickets}