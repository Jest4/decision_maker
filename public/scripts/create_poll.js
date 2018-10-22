let addChoices = function() {
  return	$(`
        <div class="row option pt-2 pb-1 pl-0 pr-0 mt-1 mb-1">
          <div class="col-4">
            <input class='choice_title' placeholder=" List an option" type="text" required>
          </div>
          <div class="col-5">
            <input class='choice_desc' placeholder=" Option description" type="text" required>
          </div>
          <div class="col-2">
            <button type="button" class="btn on-brand del_choice">Delete</button>
          </div>
          <div class="col-1">&nbsp;</div>
        </div>
  `)
}

// function addChoices(){
//   return  `
//   <section class='choices_box'>
//     <input class='choice_title' type="text" required>
//     <label>Description</label>
//     <textarea class='choice_desc'></textarea>
//     <button class="del_choice">Delete</button>
//   </section>  `
// }

$(document).ready(function() {
	let poll_data = {
   choice_title:[],
   choice_desc:[]
 }

let $intro = $('.intro');
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

$(add).click(function(){
  event.preventDefault();
  let newOption = addChoices();
  $choices.append(newOption);
  newOption.find('.del_choice').click(function(){
    $(this).closest('.row').remove();
  });
});

$(del).click(function(){
  $(this).closest('.row').remove();
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
  $intro.slideUp('slow');
  $form.slideDown('slow');
  $form.show();
  $email.hide();
});

});

// module.exports = {
// 	poll_data: poll_data
// }



