exports.up = function (knex) {
  return knex.schema.createTable('socket_data', (table) => {
    table.string('socket_id');
    table.integer('user_id').references('id').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('socket_data');
};
