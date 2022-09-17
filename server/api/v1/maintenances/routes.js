const express = require('express');
const controller = require('./controller');
const { auth } = require('../auth');

// eslint-disable-next-line new-cap
const router = express.Router({
  // needed for Nested Routes
  mergeParams: true,
});

/*
 * /api/maintenances GET -> LIST
 * /api/maintenances POST -> CREATE
 * /api/maintenances/:id GET -> READ
 * /api/maintenances/:id PUT -> UPDATE
 * /api/maintenances/:id DELETE -> DELETE
 */

router
  .route('/')
  .get(controller.parentId, controller.list)
  .post(controller.parentId, auth, controller.create);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.parentId, auth, controller.read)
  .put(controller.parentId, auth, controller.update)
  .delete(controller.parentId, auth, controller.delete);

module.exports = router;
