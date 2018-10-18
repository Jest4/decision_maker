exports.up = function(knex, Promise) {
	return knex.schema.createTable('choices', function (table) {
    table.increments('choice_id').unsigned().primary();
    table.string('choice_name');
    table.string('choice_description');
    table.integer('poll_id');
  });
  
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('choices')
  
};