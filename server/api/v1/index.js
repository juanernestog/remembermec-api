const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/users').get((req, res) => {
  res.json({
    users: [{ name: 'John', email: 'John@example.com' }],
  });
});

module.exports = router;
