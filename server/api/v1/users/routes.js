const express = require('express');
const controller = require('./controller');

// eslint-disable-next-line new-cap
const router = express.Router();

/*
 * /api/users GET -> LIST
 * /api/users/signup POST -> CREATE
 * /api/users/signin POST -> CREATE
 * /api/users POST -> CREATE
 * /api/users/:id GET -> READ
 * /api/users/:id PUT -> UPDATE
 * /api/users/:id DELETE -> DELETE
 */

// router.route('/').get(controller.list).post(controller.create);

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
