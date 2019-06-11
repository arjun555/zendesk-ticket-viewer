console.log('ticket jQuery')

$(document).ready( () =>{
    $('.ticket-subject').click(toggleDetails)
})

function toggleDetails(){
    $(event.target).next('.ticket-details').toggleClass('reveal')
}