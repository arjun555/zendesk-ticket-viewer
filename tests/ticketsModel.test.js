const {Tickets} = require('../models/ticketsModel')
const request = require('supertest');
const app = require('../server')


describe('API Testing', ()=>{
    
    test('should return status code: 200 on /GET tickets', function(done){
        request(app.server)
            .get('/tickets')
            .expect(200, done)
    })

    test('should return status code: 200 on /GET of no-existing route', function(done){
        request(app.server)
            .get('/doesntexist')
            .expect(200, done)
    })
})


describe('Tickets class', ()=>{

    let testTickets = new Tickets();
    // sample response data when requesting ticket data. Stripped the "tickets" object to show what is of interest for this application
    let apiResData = {
        "tickets": [
          {
            "url": "https://apatel.zendesk.com/api/v2/tickets/1.json",
            "id": 1,
            "external_id": null,
            "created_at": "2019-06-05 06:44:09 UTC",
            "updated_at": "2019-06-05 06:44:10 UTC",
            "type": "incident",
            "subject": "Sample ticket: Meet the ticket",
            "raw_subject": "Sample ticket: Meet the ticket",
            "description": "Hi Arjun,\n\nThis is your first ticket. Ta-da! Any customer request sent to your supported channels (email, chat, voicemail, web form, and tweet) will become a Support ticket, just like this one. Respond to this ticket by typing a message above and clicking Submit. You can also see how an email becomes a ticket by emailing your new account, support@apatel.zendesk.com. Your ticket will appear in ticket views.\n\nThat's the ticket on tickets. If you want to learn more, check out: \nhttps://support.zendesk.com/hc/en-us/articles/203691476\n",
            "priority": "normal",
            "status": "open"
          }
        ],
        "next_page": "https://apatel.zendesk.com/api/v2/tickets.json?page=2&per_page=2",
        "previous_page": null,
        "count": 104
      }

    test('Tickets.token returns a string', () =>{
        expect(typeof testTickets.token).toBe('string')
    })
    
    test('setToken returns a string', () =>{
        expect(typeof testTickets.setToken('')).toBe('string')
    })

    test('getTickets() returns an object', () =>{
        expect(typeof testTickets.getTickets()).toBe('object')
    })

    test('setNextPage() will take the data returned from the api call, and set the nextPage property', () =>{
        expect(testTickets.setNextPage(apiResData.next_page)).toBe("https://apatel.zendesk.com/api/v2/tickets.json?page=2&per_page=2")
    })

    test('setPreviousPage() will take the data returned from the api call, and set the previousPage property', () =>{
        expect(testTickets.setPreviousPage(apiResData.previous_page)).toBe(null)
    })

    test('setTicketCount() will take the data returned from the api call, and set the count property', () =>{
        expect(testTickets.setTicketCount(apiResData.count)).toBe(104)
    })

    test('getNextPage() returns a number', () =>{
        testTickets.nextPage = apiResData.next_page
        expect(typeof testTickets.getNextPage(1)).toBe('number')
    })

    test('getNextPage() returns 3, if the currentPage is 2 and testTickets.nextPage is not null', () =>{
        let currentPage = 2;
        testTickets.nextPage = apiResData.next_page
        expect(testTickets.getNextPage(currentPage)).toBe(3)
    })

    test('getNextPage() returns 0, if the currentPage is 2 and testTickets.nextPage is null', () =>{
        let currentPage = 2;
        testTickets.nextPage = null
        expect(testTickets.getNextPage(currentPage)).toBe(0)
    })

    test('getPreviousPage() returns 1, if the currentPage is 2 and testTickets.previousPage is not null', () =>{
        let currentPage = 2;
        testTickets.previousPage = "https://apatel.zendesk.com/api/v2/tickets.json?page=2&per_page=2"
        expect(testTickets.getPreviousPage(currentPage)).toBe(1)
    })

    test('getPreviousPage() returns 0, if the currentPage is 1 and testTickets.previousPage is null', () =>{
        let currentPage = 1;
        testTickets.previousPage = null
        expect(testTickets.getPreviousPage(currentPage)).toBe(0)
    })

    test('tickets.checkPageValid() returns 1, when 1 is passed in', () =>{
        expect(testTickets.checkPageValid(1)).toBe(1)
    })

    test('tickets.checkPageValid() returns 1, when 0 is passed in', () =>{
        expect(testTickets.checkPageValid(0)).toBe(1)
    })

    test('tickets.checkPageValid() returns 1, when undefined is passed in', () =>{
        expect(testTickets.checkPageValid(undefined)).toBe(1)
    })

    test('if username is correct', ()=>{
        expect()
    })
    
})
