const {Tickets} = require('../../tickets')


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

    test('getNextTicketsPage() will call the api and return an object', () =>{
        testTickets.nextPage = apiResData.next_page
        expect(typeof testTickets.getNextTicketsPage()).toBe('object')
    })
})
