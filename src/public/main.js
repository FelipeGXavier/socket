const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log(socket);
});

socket.on('hello', function (message) {
  console.log(message);
});
