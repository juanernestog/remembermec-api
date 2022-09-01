const Model = require('./model');

exports.list = (req, res) => {
  res.json({
    users: [{ name: 'John1', email: 'John@example.com' }],
  });
};

exports.create = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const model = new Model(body);
    const doc = await model.save();
    res.status(201).json({
      data: doc,
    });
  } catch (err) {
    next(err);
  }
};

exports.read = (req, res) => {
  const { params = {} } = req;
  const { id } = params;
  res.json({
    user: id,
  });
};

exports.update = (req, res) => {
  res.json({});
};

exports.delete = (req, res) => {
  res.json({});
};
