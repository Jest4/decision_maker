exports.seed = function(knex, Promise) {
  return knex('choices').del()
    .then(function () {
      return Promise.all([
        knex('choices').insert({choice_id: 1, choice_name:'Applebees', choice_description: 'lolwut', poll_id: 1}),
        knex('choices').insert({choice_id: 2, choice_name:'Mickey Dees', choice_description: 'dumpster diving', poll_id: 1}),
        knex('choices').insert({choice_id: 3, choice_name:'Pizzaiolo', choice_description: 'big pies', poll_id: 1}),
        knex('choices').insert({choice_id: 4, choice_name:'KFC', choice_description: 'sometimes i hate myself', poll_id: 1}),
        knex('choices').insert({choice_id: 5, choice_name:'Chipotle', choice_description: 'i hope i dont need chipotlaway', poll_id: 1}),
        knex('choices').insert({choice_id: 6, choice_name:'Applebees', choice_description: 'lolwut', poll_id: 2}),
        knex('choices').insert({choice_id: 7, choice_name:'Mickey Dees', choice_description: 'dumpster diving', poll_id: 2}),
        knex('choices').insert({choice_id: 8, choice_name:'Pizzaiolo', choice_description: 'big pies', poll_id: 2}),
        knex('choices').insert({choice_id: 9, choice_name:'KFC', choice_description: 'sometimes i hate myself', poll_id: 2}),
        knex('choices').insert({choice_id: 10, choice_name:'Chipotle', choice_description: 'i hope i dont need chipotlaway', poll_id: 2}),
        knex('choices').insert({choice_id: 11, choice_name:'Burrito Boyz', choice_description: 'gotta get that taco fix', poll_id: 2}),
        knex('choices').insert({choice_id: 12, choice_name:'Timmys', choice_description: 'i already thought i bottomed out', poll_id: 2}),
        knex('choices').insert({choice_id: 13, choice_name:'A dubs', choice_description: 'go beyond', poll_id: 2}),
        knex('choices').insert({choice_id: 14, choice_name:'Chipotle', choice_description: 'i hope i dont need chipotlaway', poll_id: 3}),
        knex('choices').insert({choice_id: 15, choice_name:'Burrito Boyz', choice_description: 'gotta get that taco fix', poll_id: 3}),
        knex('choices').insert({choice_id: 16, choice_name:'Timmys', choice_description: 'i already thought i bottomed out', poll_id: 3}),
        knex('choices').insert({choice_id: 17, choice_name:'A dubs', choice_description: 'go beyond', poll_id: 3}),
        knex('choices').insert({choice_id: 18, choice_name:'Pizzaiolo', choice_description: 'big pies', poll_id: 4}),
        knex('choices').insert({choice_id: 19, choice_name:'KFC', choice_description: 'sometimes i hate myself', poll_id: 4}),
        knex('choices').insert({choice_id: 20, choice_name:'Chipotle', choice_description: 'i hope i dont need chipotlaway', poll_id: 4}),
        knex('choices').insert({choice_id: 21, choice_name:'Applebees', choice_description: 'lolwut', poll_id: 4}),
        knex('choices').insert({choice_id: 22, choice_name:'Mickey Dees', choice_description: 'dumpster diving', poll_id: 4}),
        knex('choices').insert({choice_id: 23, choice_name:'Pizzaiolo', choice_description: 'big pies', poll_id: 5}),
        knex('choices').insert({choice_id: 24, choice_name:'KFC', choice_description: 'sometimes i hate myself', poll_id: 5}),
        knex('choices').insert({choice_id: 25, choice_name:'Chipotle', choice_description: 'i hope i dont need chipotlaway', poll_id: 5}),
        knex('choices').insert({choice_id: 26, choice_name:'Burrito Boyz', choice_description: 'gotta get that taco fix', poll_id: 5}),
        knex('choices').insert({choice_id: 27, choice_name:'Timmys', choice_description: 'i already thought i bottomed out', poll_id: 5}),
        knex('choices').insert({choice_id: 28, choice_name:'A dubs', choice_description: 'go beyond', poll_id: 5})






      ]);
    });
};
