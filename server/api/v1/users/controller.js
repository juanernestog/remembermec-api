const Model = require('./model');

exports.list = async (req, res) => {
  try {
    const docs = await Model.find({}).exec();
    res.json({
      data: docs,
    });
  } catch (err) {
    next(err);
  }
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
