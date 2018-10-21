exports.seed = function(knex, Promise) {
  return knex('polls').del()
    .then(function () {
      return Promise.all([
        knex('polls').insert({poll_id: 10001, poll_title: 'test1', admin_email: 'jestany@live.ca', vote_link: '1abcdefg', result_link: '2abcdefg', final_result_link: '3abcdefg' }),
        knex('polls').insert({poll_id: 10002, poll_title: 'test2', admin_email: 'jestany@live.ca', vote_link: '21abcdef', result_link: '22abcdef', final_result_link: '23abcdef' }),
        knex('polls').insert({poll_id: 10003, poll_title: 'test3', admin_email: 'jestany@live.ca', vote_link: '31abcdef', result_link: '32abcdef', final_result_link: '33abcdef' }),
        knex('polls').insert({poll_id: 10004, poll_title: 'test4', admin_email: 'jestany@live.ca', vote_link: '41abcdef', result_link: '42abcdef', final_result_link: '43abcdef' }),
        knex('polls').insert({poll_id: 10005, poll_title: 'test5', admin_email: 'jestany@live.ca', vote_link: '51abcdef', result_link: '52abcdef', final_result_link: '53abcdef' })
      ]);
    });
};
