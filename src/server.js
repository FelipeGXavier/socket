const express = require('express');
const routes = require('./rest/routes');
const path = require('path');
const app = express();
const SocketService = require('./services/socket');
const server = require('http').createServer(app);

app.use(express.json());

app.use('/api/v1', routes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index.html');
});

server.listen(3000);

app.set('socket', new SocketService(server));

module.exports = app;

const outside = require('./outside');
