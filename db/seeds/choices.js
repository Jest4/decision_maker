exports.seed = function(knex, Promise) {
  return knex('choices').del()
    .then(function () {
      return Promise.all([

        knex('choices').insert({choice_id: 10001, choice_name:'Applebees', choice_description: 'lolwut', poll_id: 10001}),
        knex('choices').insert({choice_id: 10002, choice_name:'Mickey Dees', choice_description: 'dumpster diving', poll_id: 10001}),
        knex('choices').insert({choice_id: 10003, choice_name:'Pizzaiolo', choice_description: 'big pies', poll_id: 10001}),
        knex('choices').insert({choice_id: 10004, choice_name:'KFC', choice_description: 'sometimes i hate myself', poll_id: 10001}),
        knex('choices').insert({choice_id: 10005, choice_name:'Chipotle', choice_description: 'i hope i dont need chipotlaway', poll_id: 10001}),
        knex('choices').insert({choice_id: 10006, choice_name:'Applebees', choice_description: 'lolwut', poll_id: 10002}),
        knex('choices').insert({choice_id: 10007, choice_name:'Mickey Dees', choice_description: 'dumpster diving', poll_id: 10002}),
        knex('choices').insert({choice_id: 10008, choice_name:'Pizzaiolo', choice_description: 'big pies', poll_id: 10002}),
        knex('choices').insert({choice_id: 10009, choice_name:'KFC', choice_description: 'sometimes i hate myself', poll_id: 10002}),
        knex('choices').insert({choice_id: 10010, choice_name:'Chipotle', choice_description: 'i hope i dont need chipotlaway', poll_id: 10002}),
        knex('choices').insert({choice_id: 10011, choice_name:'Burrito Boyz', choice_description: 'gotta get that taco fix', poll_id: 10002}),
        knex('choices').insert({choice_id: 10012, choice_name:'Timmys', choice_description: 'i already thought i bottomed out', poll_id: 10002}),
        knex('choices').insert({choice_id: 10013, choice_name:'A dubs', choice_description: 'go beyond', poll_id: 10002}),
        knex('choices').insert({choice_id: 10014, choice_name:'Chipotle', choice_description: 'i hope i dont need chipotlaway', poll_id: 10003}),
        knex('choices').insert({choice_id: 10015, choice_name:'Burrito Boyz', choice_description: 'gotta get that taco fix', poll_id: 10003}),
        knex('choices').insert({choice_id: 10016, choice_name:'Timmys', choice_description: 'i already thought i bottomed out', poll_id: 10003}),
        knex('choices').insert({choice_id: 10017, choice_name:'A dubs', choice_description: 'go beyond', poll_id: 10003}),
        knex('choices').insert({choice_id: 10018, choice_name:'Pizzaiolo', choice_description: 'big pies', poll_id: 10004}),
        knex('choices').insert({choice_id: 10019, choice_name:'KFC', choice_description: 'sometimes i hate myself', poll_id: 10004}),
        knex('choices').insert({choice_id: 10020, choice_name:'Chipotle', choice_description: 'i hope i dont need chipotlaway', poll_id: 10004}),
        knex('choices').insert({choice_id: 10021, choice_name:'Applebees', choice_description: 'lolwut', poll_id: 10004}),
        knex('choices').insert({choice_id: 10022, choice_name:'Mickey Dees', choice_description: 'dumpster diving', poll_id: 10004}),
        knex('choices').insert({choice_id: 10023, choice_name:'Pizzaiolo', choice_description: 'big pies', poll_id: 10005}),
        knex('choices').insert({choice_id: 10024, choice_name:'KFC', choice_description: 'sometimes i hate myself', poll_id: 10005}),
        knex('choices').insert({choice_id: 10025, choice_name:'Chipotle', choice_description: 'i hope i dont need chipotlaway', poll_id: 10005}),
        knex('choices').insert({choice_id: 10026, choice_name:'Burrito Boyz', choice_description: 'gotta get that taco fix', poll_id: 10005}),
        knex('choices').insert({choice_id: 10027, choice_name:'Timmys', choice_description: 'i already thought i bottomed out', poll_id: 10005}),
        knex('choices').insert({choice_id: 10028, choice_name:'A dubs', choice_description: 'go beyond', poll_id: 10005})




      ]);
    });
};
