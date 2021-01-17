const express = require('express');
const routes = require('./rest/routes');
const path = require('path');
const socketioJwt = require('socketio-jwt');
const app = express();
const server = require('http').createServer(app);
const SocketService = require('./services/socket');
const LookNotificationJob = require('./jobs/lookNotification');
const socketPayloadRepository = require('./repository/socketPayloadRepository');
const env = require('./env');

app.use(express.json());

app.use('/api/v1', routes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index.html');
});

server.listen(3000);

const socketService = new SocketService(server);
app.set('socket', socketService);

const io = socketService.get();

io.use(
  socketioJwt.authorize({
    secret: env.get('SECRET_KEY'),
    handshake: true,
  })
);

io.on('connection', (socket) => {
  const userId = socket.decoded_token.id;
  const socketId = socket.id;
  socketPayloadRepository.insertOrUpdate({
    user_id: userId[0],
    socket_id: socketId,
  });
});

new LookNotificationJob(socketService).run();
