const express = require('express');
const controller = require('./controller');
const { auth, me } = require('../auth');

// eslint-disable-next-line new-cap
const router = express.Router();

/*
 * /api/users/signup POST -> CREATE
 * /api/users/signin POST -> LOGIN
 * /api/users/:id GET -> READ
 * /api/users/:id PUT -> UPDATE
 * /api/users/:id DELETE -> DELETE
 */

// router.route('/').get(controller.list).post(controller.create);

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);

router.param('id', controller.id);

router
  .route('/')
  .get(controller.read)
  .put(auth, me, controller.update)
  .delete(auth, me, controller.delete);

module.exports = router;
