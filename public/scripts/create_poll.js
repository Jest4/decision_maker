
$(document).ready(function() {

$('.add_choice').unbind('click').bind('click',function(){
	$('.poll_container').prepend(addChoices());

});

$(document).on('click', '.del_choice', function() {
    $(this).parent().remove();
});

function addChoices(){
return	`<section class = 'choices_box'>
			<input type="text">
			<button>Description</button>
			<textarea class=description></textarea>
			<button class="del_choice">Delete</button>
		</section> `
}

	$('.poll_container').hide()
	
$('.create_poll').unbind('click').bind('click', function(){

	
	$('.poll_container').slideDown();
	$('.poll_container').show();
	
	
});

});


