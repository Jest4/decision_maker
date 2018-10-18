const number = 0;

function addChoices(){
return	`<section class='choices_box'>
			<input type="text" name="title-${number}">
			<button>Description</button>
			<textarea class=description></textarea>
			<button class="del_choice">Delete</button>
		</section> `
}

$(document).ready(function() {
	$('body').on('click', '.add_choice', function(){
		$('.poll_container').prepend(addChoices());
	});

	$('body').on('click', '.del_choice', function() {
	    $(this).parent().remove();
	});

	$('.poll_container').on('submit', function (event) {
		event.preventDefault();
		$(this).filter('')

	})

	// $('submit_poll').on('click', function(){
	// 	storeData()
	// });
		
	$('.create_poll').unbind('click').bind('click', function(){	
		$('.poll_container').slideDown();
		$('.poll_container').show();
	});

});


