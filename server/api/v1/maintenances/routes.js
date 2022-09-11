const express = require('express');
const controller = require('./controller');

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

router.route('/').get(controller.list).post(controller.create);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
