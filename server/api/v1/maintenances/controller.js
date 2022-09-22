const { Model, fields, refereces } = require('./model');
const { Model: Machine } = require('../machines/model');

const {
  paginationParams,
  sortParams,
  //  populateToObject,
  filterByNested,
} = require('../../../utils');
const referencesNames = [...Object.getOwnPropertyNames(refereces)];

exports.parentId = async (req, res, next) => {
  const { params = {} } = req;
  const { machineId = null } = params;

  if (machineId) {
    const doc = await Machine.findById(machineId);
    if (doc) {
      next();
    } else {
      const message = 'Machine not found';

      next({
        message,
        statusCode: 404,
      });
    }
  } else {
    next();
  }
};

exports.id = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    const doc = await Model.findById(id);
    if (!doc) {
      const message = `${Model.name} not found`;
      next({ message, statsCode: 404 });
    } else {
      req.doc = doc;
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  const { query = {}, params = {} } = req;
  const { limit, skip, page } = paginationParams(query);
  const { sortBy, direction } = sortParams(query, fields);
  const sort = {
    [sortBy]: direction,
  };
  // const populate = populateToObject(referencesNames);
  // const filters = params.machineId ? params.machineId : {};
  const { filters, populate } = filterByNested(params, referencesNames); // TODO: revisit funcionality

  try {
    console.log(populate);
    const data = await Promise.all([
      Model.find({ filters })
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .populate(populate)
        .exec(),
      Model.countDocuments(filters),
    ]);
    const [docs, total] = data;

    const pages = Math.ceil(total / limit);

    res.json({
      data: docs,
      meta: {
        pages,
        page,
        skip,
        limit,
        sortBy,
        direction,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  console.log('Creating');
  const { body = {}, params = {}, decoded = {} } = req;
  const { id } = decoded;
  const { machineId } = params;
  console.log(body);
  try {
    const model = new Model(Object.assign(body, { userId: id }, { machineId }));
    const doc = await model.save();
    res.status(201).json({
      data: doc,
    });
  } catch (err) {
    next(err);
  }
};

exports.read = async (req, res, next) => {
  const { doc = {} } = req;

  res.json({
    data: doc,
  });
};

exports.update = async (req, res, next) => {
  const { doc = {}, body = {} } = req;

  Object.assign(doc, body);

  try {
    const updated = await doc.save();

    res.json({
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const { doc = {} } = req;

  Object.assign(doc, body);

  try {
    const deleted = await doc.remove();

    res.json({
      data: deleted,
    });
  } catch (err) {
    next(err);
  }
};
