const {Tickets} = require('../../tickets')

test('Tickets.token returns a string', () =>{
    expect(typeof new Tickets().token).toBe('string')
})