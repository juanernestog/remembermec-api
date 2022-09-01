const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Server runs',
  });
});

module.exports = app;
