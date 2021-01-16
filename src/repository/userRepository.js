const knex = require('../config/connect');

const create = (user) => {
    try{
        return await knex('users').insert(user, 'ID');
    }catch(err){
        return err;
    }
}

module.exports = {
    create,
}