const knex = require('../config/connect');

const insertOrUpdate = async (payload) => {
  const { user_id, socket_id } = payload;
  const row = await knex('socket_data').where({ user_id }).select('socket_id');
  if (row.length > 0) {
    return await knex('socket_data').where({ user_id }).update({ socket_id });
  } else {
    return await knex('socket_data').insert(payload);
  }
};

const get = async (userId) => {
  return await knex('socket_data')
    .where({ user_id: userId })
    .select('socket_id');
};

module.exports = {
  get,
  insertOrUpdate,
};
