const express = require('express');
const controller = require('./controller');
const { auth, owner } = require('../auth');

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

router.route('/').get(controller.parentId, controller.list);

router.param('id', controller.id);

router.route('/').post(controller.parentId, auth, owner, controller.create);

router
  .route('/:id')
  .get(controller.parentId, auth, owner, controller.read)
  .put(controller.parentId, auth, owner, controller.update)
  .delete(controller.parentId, auth, owner, controller.delete);

module.exports = router;
