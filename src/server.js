const express = require('express');
const routes = require('./rest/routes');
const path = require('path');

const app = express();

app.use(express.json());

app.use('/api/v1', routes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.listen(3000);
