const env = require('../env');
const yup = require('yup');
const jwt = require('jsonwebtoken');

const schema = yup.object().shape({
  login: yup
    .string()
    .required({
      message: 'O Login deve ser informado',
    })
    .min(4, {
      message: 'O Login deve ter pelo menos 4 caracteres',
    }),
  password: yup
    .string()
    .required({
      message: 'A Senha deve ser informada',
    })
    .min(4, {
      message: 'A Senha deve possuir pelo menos 4 caracteres',
    }),
});

class User {
  static async create(login, password) {
    const userInput = { login, password };
    try {
      await schema.validate(userInput, { abortEarly: false });
      const user = Object.assign(new User(), userInput);
      return { valid: true, user };
    } catch (err) {
      return err;
    }
  }

  static getToken(id) {
    return jwt.sign({ id }, env.get('SECRET_KEY'));
  }
}
