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

exports.read = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    const doc = await Model.findById({ _id: id });
    if (!doc) {
      const message = 'User not found';
      next({ message, statsCode: 404 });
    } else {
      res.json({
        data: doc,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.update = (req, res) => {
  res.json({});
};

exports.delete = (req, res) => {
  res.json({});
};
