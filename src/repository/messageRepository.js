const knex = require('../config/connect');

const insert = async (message) => {
  try {
    return await knex('messages').insert(message);
  } catch (err) {
    return err;
  }
};

module.exports = {
  insert,
};
