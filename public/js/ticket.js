console.log('ticket jQuery')

$(document).ready( () =>{
    $('.tickets-item').click(toggleDetails)
})

// Toggle ticket details display
function toggleDetails(){
    $(event.target).children('.ticket-details').fadeToggle(200)
}