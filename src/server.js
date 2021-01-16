const express = require('express');
const routes = require('./rest/routes');

const app = express();

app.use(express.json());

app.use('/api/v1', routes);

app.listen(3000);
