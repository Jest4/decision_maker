
exports.up = function(knex, Promise) {
	return knex.schema.createTable('votes', function (table) {
    table.increments('vote_id').unsigned().primary();
    table.string('voter_name');
    table.integer('choice_id');
    table.integer('poll_id');
    table.integer('vote_weight');
  });
  
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('votes')
  
};