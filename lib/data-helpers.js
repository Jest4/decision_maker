const poll_data = require('../public/scripts/create_poll.js');

module.exports = function makeDataHelpers(db) {
  return {

 	createPoll: function(poll_data, callback){

 			db.insert({poll_title: poll_data.poll_name},{admin_email: poll_data.admin_email}).
 			returning('poll_id').into('polls').then(function(id){
	 			let choices = poll_data.choice_title;
	 			let descriptions = poll_data.choice_desc;
	 			choices.forEach((choice,index)=>{
	 				db('choices').insert({choice_name: choice},{choice_description: descriptions[index]},{poll_id: id});		
	 			});	
 			});
 			
 			// for (let choice of choices){
 			// 	db('choices').insert({choice_name: choice});
 			// }
      
 	},
 	displayPoll: function(callback){



 	}

 	//Jeff you can have your Data Helpers down here



  };
}