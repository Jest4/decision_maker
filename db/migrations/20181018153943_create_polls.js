
exports.up = function(knex, Promise) {
	return knex.schema.createTable('polls', function (table) {
    table.increments('poll_id').unsigned().primary();
    table.string('poll_title');
    table.string('admin_email');
    table.string('vote_link');
    table.string('result_link');
    table.string('final_result_link');
  });

};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('polls')

};
