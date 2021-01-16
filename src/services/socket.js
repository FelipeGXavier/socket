const io = require('socket.io');

class SocketService {
  constructor(server) {
    this.io = io(server);
    this.io.on('connection', (socket) => {
      console.log(socket.id);
    });
  }

  emit(event, message) {
    if (message) this.io.emit(event, message);
  }
}

module.exports = SocketService;
