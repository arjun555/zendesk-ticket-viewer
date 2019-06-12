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

    // Set Token for API given the password
    setToken(password){
        this.token = new Buffer(`${this.user}:${password}`).toString('base64')
        return this.token
    }

    // Set nextPage given the next_page url from the api
    setNextPage(url){
        return this.nextPage = url
    }

    // Return the next page number, given the current page
    getNextPage(currentPageNum){
        return this.nextPage ?  Number(currentPageNum) + 1 : 0;
    }

    // Set previousPage given the previous_page url from the api
    setPreviousPage(url){
        return this.previousPage = url
    }

    // Return the previous page number, given the current page
    getPreviousPage(currentPageNum){
        return this.previousPage ?  Number(currentPageNum) - 1 : 0;
    }

    // Set ticketCount given the count from the api
    setTicketCount(ticketCount){
        return this.count = ticketCount
    }

    // process the 'tickets' data from the api and set properties 
    processData(apiData){
        this.setNextPage(apiData.next_page)
        this.setPreviousPage(apiData.previous_page)
        this.setTicketCount(apiData.count)
    }

    // check the queried page number is valid and return the page value 
    checkPageValid(page){
        return !page || (page) < 1?  1: page;
    }

    // Get tickets data from API. Number of tickets data is capped by the value of this.perPage property
    getTickets(page=1){
        return axios.get(`https://${this.domain}.zendesk.com/api/v2/tickets?page=${page}&per_page=${this.perPage}`, {
            headers: {
                Authorization: `Basic ${this.token}` 
            }})
    }
}

module.exports = {Tickets}