$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

<<<<<<< HEAD

=======
//homepage!
//"create poll" button should show and toggle poll ()

//poll has form:
//button adds new rows to our form
//button deletes rows *** we are not savages

//poll page: has js url selector button

//vote page: shrug = js (optional)

//results page: button  that selects our choice is a js function

//final_results: should have link that can be emailed to people
>>>>>>> 00292a0ac8a50b52b18d2564b4bd401f69739a0e
