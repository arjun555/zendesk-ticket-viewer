console.log('ticket jQuery')

$(document).ready( () =>{
    $('.tickets-item').click(toggleDetails)
})

function toggleDetails(){
    $(event.target).children('.ticket-details').fadeToggle(200)
}