const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const users = require('./users/routes');

router.use('/users', users);

module.exports = router;
