const express = require('express');
const User = require('../entities/user');
const userRepository = require('../repository/userRepository');
const authMiddleware = require('../auth/auth');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { login, password } = req.body;
  const validatedUser = await User.create(login, password);
  const result = await userRepository.create(validatedUser.user);
  const token = User.getToken(result.id);
  return res.json({ login: result.login, id: result.id, token });
});

router.get('/current', authMiddleware, async (req, res) => {
  return res.json(req.user);
});

module.exports = router;
