const {Tickets} = require('../../tickets')


describe('Tickets class', ()=>{

    let testTickets = new Tickets();

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
        expect(testTickets.setNextPage())
    })

})
