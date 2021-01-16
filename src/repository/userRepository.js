const knex = require('../config/connect');

const create = async (user) => {
  try {
    const id = await knex('users').insert(user, 'id');
    return { ...user, id };
  } catch (err) {
    return err;
  }
};

const findById = async (id) => {
  try {
    return await knex('users').where({ id }).first().select('*');
  } catch (err) {
    return err;
  }
};

module.exports = {
  create,
  findById,
};
