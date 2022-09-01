const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

const users = require('./users/routes');
const machines = require('./machines/routes');
const maintenances = require('./maintenances/routes');

router.use('/users', users);
router.use('/machines', machines);
router.use('/maintenances', maintenances);

module.exports = router;
