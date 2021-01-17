const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6WzJdLCJpYXQiOjE2MTA5MDcxODR9.XgRz3L4FM6zJwSoxajpCkALetZBgJpxe5_QL0r4Oj9M';
const socket = io.connect('http://localhost:3000', {
  query: `token=${jwt}`,
});

socket.on('hello', function (message) {
  console.log(message);
});
