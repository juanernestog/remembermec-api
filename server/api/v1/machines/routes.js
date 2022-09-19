const express = require('express');
const controller = require('./controller');
const maintenancesRoutes = require('../maintenances/routes');
const { auth, owner } = require('../auth');

// eslint-disable-next-line new-cap
const router = express.Router();

/*
 * /api/machines GET -> LIST
 * /api/machines POST -> CREATE
 * /api/machines/:id GET -> READ
 * /api/machines/:id PUT -> UPDATE
 * /api/machines/:id DELETE -> DELETE
 */

router.route('/').get(controller.list).post(auth, controller.create);

router.param('id', controller.id);

router
  .route('/:id')
  .get(auth, owner, controller.read)
  .put(auth, owner, controller.update)
  .delete(auth, owner, controller.delete);

/*
 * /api/machines/maintenances GET -> LIST
 * /api/machines/:id/maintenances POST -> CREATE
 * /api/machines/:id/maintenances/:id GET -> READ
 * /api/machines/:id/maintenances/:id PUT -> UPDATE
 * /api/machines/:id/maintenances/:id DELETE -> DELETE
 */

router.use('/:machineId/maintenances', maintenancesRoutes);
module.exports = router;
