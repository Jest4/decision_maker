exports.seed = function(knex, Promise) {
  return knex('choices').del()
    .then(function () {
      return Promise.all([
        knex('choices').insert({choice_name:'Applebees', choice_description: 'lolwut', poll_id: 1}),
        knex('choices').insert({choice_name:'Mickey Dees', choice_description: 'dumpster diving', poll_id: 1}),
        knex('choices').insert({choice_name:'Pizzaiolo', choice_description: 'big pies', poll_id: 1}),
        knex('choices').insert({choice_name:'KFC', choice_description: 'sometimes i hate myself', poll_id: 1}),
        knex('choices').insert({choice_name:'Chipotle', choice_description: 'i hope i dont need chipotlaway', poll_id: 1}),
        knex('choices').insert({choice_name:'Applebees', choice_description: 'lolwut', poll_id: 2}),
        knex('choices').insert({choice_name:'Mickey Dees', choice_description: 'dumpster diving', poll_id: 2}),
        knex('choices').insert({choice_name:'Pizzaiolo', choice_description: 'big pies', poll_id: 2}),
        knex('choices').insert({choice_name:'KFC', choice_description: 'sometimes i hate myself', poll_id: 2}),
        knex('choices').insert({choice_name:'Chipotle', choice_description: 'i hope i dont need chipotlaway', poll_id: 2}),
        knex('choices').insert({choice_name:'Burrito Boyz', choice_description: 'gotta get that taco fix', poll_id: 2}),
        knex('choices').insert({choice_name:'Timmys', choice_description: 'i already thought i bottomed out', poll_id: 2}),
        knex('choices').insert({choice_name:'A dubs', choice_description: 'go beyond', poll_id: 2}),
        knex('choices').insert({choice_name:'Chipotle', choice_description: 'i hope i dont need chipotlaway', poll_id: 3}),
        knex('choices').insert({choice_name:'Burrito Boyz', choice_description: 'gotta get that taco fix', poll_id: 3}),
        knex('choices').insert({choice_name:'Timmys', choice_description: 'i already thought i bottomed out', poll_id: 3}),
        knex('choices').insert({choice_name:'A dubs', choice_description: 'go beyond', poll_id: 3}),
        knex('choices').insert({choice_name:'Pizzaiolo', choice_description: 'big pies', poll_id: 4}),
        knex('choices').insert({choice_name:'KFC', choice_description: 'sometimes i hate myself', poll_id: 4}),
        knex('choices').insert({choice_name:'Chipotle', choice_description: 'i hope i dont need chipotlaway', poll_id: 4}),
        knex('choices').insert({choice_name:'Applebees', choice_description: 'lolwut', poll_id: 4}),
        knex('choices').insert({choice_name:'Mickey Dees', choice_description: 'dumpster diving', poll_id: 4}),
        knex('choices').insert({choice_name:'Pizzaiolo', choice_description: 'big pies', poll_id: 5}),
        knex('choices').insert({choice_name:'KFC', choice_description: 'sometimes i hate myself', poll_id: 5}),
        knex('choices').insert({choice_name:'Chipotle', choice_description: 'i hope i dont need chipotlaway', poll_id: 5}),
        knex('choices').insert({choice_name:'Burrito Boyz', choice_description: 'gotta get that taco fix', poll_id: 5}),
        knex('choices').insert({choice_name:'Timmys', choice_description: 'i already thought i bottomed out', poll_id: 5}),
        knex('choices').insert({choice_name:'A dubs', choice_description: 'go beyond', poll_id: 5})






      ]);
    });
};
