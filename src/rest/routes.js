const express = require('express');
const User = require('../entities/user');
const userRepository = require('../repository/userRepository');
const socketPayloadRepository = require('../repository/socketPayloadRepository');
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

router.get('/notify', async (req, res) => {
  const io = req.app.get('socket').get();
  const result = await socketPayloadRepository.get(2);
  const socketId = result[0].socket_id;
  io.to(socketId).emit('hello', 'Teste');
  res.json({ socket_id: socketId });
});

router.get('/send', (req, res) => {
  const socket = req.app.get('socket');
  socket.emit('hello', 'Hello World!');
  res.send('Ok!');
});

module.exports = router;
