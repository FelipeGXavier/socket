const knex = require('../config/connect');

const insert = async (message) => {
  try {
    return await knex('messages').insert(message);
  } catch (err) {
    return err;
  }
};

const lookForNewNotification = async () => {
  return await knex('messages').where({ scheduled: false }).select('*');
};

const markAsSchedule = async (id) => {
  return await knex('messages').where({ id }).update({ scheduled: true });
};

module.exports = {
  insert,
  lookForNewNotification,
  markAsSchedule,
};
