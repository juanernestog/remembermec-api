const express = require('express');
const controller = require('./controller');

// eslint-disable-next-line new-cap
const router = express.Router();

/*
 * /api/machines GET -> LIST
 * /api/machines POST -> CREATE
 * /api/machines/:id GET -> READ
 * /api/machines/:id PUT -> UPDATE
 * /api/machines/:id DELETE -> DELETE
 */

router.route('/').get(controller.list).post(controller.create);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
