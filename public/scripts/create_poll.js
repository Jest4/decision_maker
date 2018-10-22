

function addChoices(){
return	`<section class = 'choices_box'>
				<input class='choice_title' type="text" required>
				<label>Description</label>
				<textarea class= 'choice_desc'></textarea>
				<button class="del_choice">Delete</button>
			</section>  `
}

$(document).ready(function() {
	let poll_data = {
	choice_title:[],
	choice_desc:[]
}

//Diana if you change any of these class names when you work on index.ejs,
//please change them here in these let variables
let add = '.add_choice';
let del = '.del_choice';
let $create = $('.create_poll');
let title = ".choice_title";
let desc =  ".choice_desc" ;
let $form = $('.poll_container');
let submit = '.submit_poll';
let $choices = $('.choices_container');
let $admin = $('.creator_email');
let $pollname = $('.poll_title');
let $button = $('#poll_form');
let $email = $('.email_msg')




	$('body').on('click', add, function(){

		$choices.append(addChoices());

	});

	$('body').on('click', del , function() {
	    $(this).parent().remove();
	});

  $button.submit(function (event) {
		event.preventDefault();
		$(this).filter('')
	if ($admin.val() && $pollname.val() && $(title).val()){

		if($admin.val()){
			poll_data.admin_email = $admin.val();
		}

		if($pollname.val()){
			poll_data.poll_name = $pollname.val();
		}

		$(title).each(function( index ) {

			// console.log( index + ": " + $( this ).val())
  			poll_data.choice_title.push($( this ).val());
  			// console.log(poll_data.choice_title);


  		});

  		$(desc).each(function( index ) {

  			// console.log( index + ": " + $( this ).val() )
  			poll_data.choice_desc.push($( this ).val());
  			// console.log(poll_data.choice_desc)


  		});
  		console.log(poll_data);

  		  $.post("/", poll_data)
      	.then(function(results) {
          url = `/admin/${results}`;
          $( location ).attr("href", url)
      	});

	} else{
		alert('Please enter your email and title of the poll!');
  }

  });


  $create.on('click', function(){
    $form.slideDown();
    $form.show();
    $email.hide();
  });

});

// module.exports = {
// 	poll_data: poll_data
// }



