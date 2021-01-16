const dotenv = require('dotenv').config({ path: '../../.env' });

const get = (namespace) => {
  return process.env[namespace];
};

module.exports = {
  get,
};
