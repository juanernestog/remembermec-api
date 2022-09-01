exports.list = (req, res) => {
  res.json({
    users: [{ name: 'John1', email: 'John@example.com' }],
  });
};

exports.create = (req, res) => {
  res.json({});
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
