const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../entities/user');
const authMiddleware = require('../auth/auth');

const router = express.Router();
