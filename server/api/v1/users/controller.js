exports.list = (req, res) => {
  res.json({
    users: [{ name: 'John1', email: 'John@example.com' }],
  });
};

exports.create = (req, res) => {
  res.json({});
};

exports.read = (req, res) => {
  res.json({});
};

exports.update = (req, res) => {
  res.json({});
};

exports.delete = (req, res) => {
  res.json({});
};
