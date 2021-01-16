const knex = require('../config/connect');

const create = async (user) => {
  try {
    const id = await knex('users').insert(user, 'id');
    return { ...user, id };
  } catch (err) {
    return err;
  }
};

module.exports = {
  create,
};
