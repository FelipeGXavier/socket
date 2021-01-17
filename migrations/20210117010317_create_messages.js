exports.up = function (knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments();
    table.string('message').notNullable();
    table.timestamp('push_timestamp');
    table.boolean('scheduled').defaultTo(false);
    table.integer('user_id').references('id').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('messages');
};
