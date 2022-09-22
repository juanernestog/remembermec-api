const { sign, verify } = require('jsonwebtoken');
const {
  token: { secret, expires },
} = require('../../config');

const signToken = (payload, expiresIn = expires) =>
  sign(payload, secret, { expiresIn });

const auth = async (req, res, next) => {
  let { headers: { authorization: token = '' } = {} } = req;

  if (token.startsWith('Bearer')) {
    token = token.substring(7);
  }

  if (!token) {
    return next({
      message: 'Unauthorized',
      statusCode: 401,
    });
  }

  verify(token, secret, function (err, decoded) {
    if (err) {
      next({
        message: 'Unauthorized',
        statusCode: 401,
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

const owner = (req, res, next) => {
  const { decoded = {}, doc = {} } = req;
  const { _id: authId } = decoded;
  const {
    userId: { _id: userId },
  } = doc;
  console.log(userId, authId, userId.equals(authId));

  if (userId.equals(authId)) {
    next();
  } else {
    next({
      message: `Forbidden`,
      statusCode: 403,
    });
  }
};

const me = (req, res, next) => {
  const { decoded = {}, doc = {} } = req;
  const { id: authId } = decoded;
  const { id: userId } = doc;

  if (userId.equals(authId)) {
    next();
  } else {
    next({
      message: `Forbidden me`,
      statusCode: 403,
    });
  }
};

module.exports = {
  signToken,
  auth,
  owner,
  me,
};
