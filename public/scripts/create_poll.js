	let poll_data = {
	choice_title:[],
	choice_desc:[]
}

function addChoices(){
return	`<section class = 'choices_box'>
				<input class='choice_title' type="text" required>
				<button>Description</button>
				<textarea class= 'choice_desc'></textarea>
				<button class="del_choice">Delete</button>
			</section>  `
}

$(document).ready(function() {
//Diana if you change any of these class names when you work on index.ejs, 
//please change them here in these let variables
let add = '.add_choice';
let del = '.del_choice';
let $create = $('.create_poll');
let title = ".choice_title";
let desc =  ".choice_desc" ;
let $form = $('.poll_container');
let $choices = $('.choices_container');
let $admin = $('.creator_email');
let $pollname = $('.poll_title');





	$('body').on('click', add, function(){
		
		$choices.append(addChoices());

	});

	$('body').on('click', del , function() {
	    $(this).parent().remove();
	});

	$form.on('submit', function (event) {
		event.preventDefault();
		$(this).filter('')

		if($admin.val()){
			poll_data.admin_email = $admin.val();
		}

		if($pollname.val()){
			poll_data.poll_name = $pollname.val();
		}

		$(title).each(function( index ) {
  		console.log( index + ": " + $( this ).val())
  		poll_data.choice_title.push($( this ).val());
  		console.log(poll_data.choice_title);
  		});

  		$(desc).each(function( index ) {
  		console.log( index + ": " + $( this ).val() )
  		poll_data.choice_desc.push($( this ).val());
  		console.log(poll_data.choice_desc)
  		});
  		
  		console.log(poll_data);


	});
		
	$create.unbind('click').bind('click', function(){	
		$form.slideDown();
		$form.show();

	});

});

module.exports = {
	poll_data: poll_data
}



