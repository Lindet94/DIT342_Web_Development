const jwt = require("jsonwebtoken");
const User = require("../models/user");
const blacklistedToken = require("../models/blacklistedToken");

function verifyUser (req, res, next) {
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(401)
    res.end()
  }
}

module.exports = {
  verifyUser,
  signToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.JWT_SECRET;
      const options = {
        expiresIn: "360s",
        audience: "" + userId,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject();
          return;
        }
        resolve(token);
      });
    });
  },

  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_JWT_SECRET;
      const options = {
        expiresIn: "2678400s",
        audience: "" + userId,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject();
          return;
        }
        resolve(token);
      });
    });
  },

  verifyToken: async (token) => {
    if (!token) return false;

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return false;

    return true;
  },

  verifyRefreshToken: async (refreshToken) => {
    if (!refreshToken) return false

    const verified = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
    if (!verified) return false

    const blacklisted = await blacklistedToken.findOne({ token: refreshToken });
    if (blacklisted) return false

    return true;
  },

  invalidateToken: async (token) => {
    const invalidToken = await new blacklistedToken({
      token: token,
    });

    const invalidatedToken = await invalidToken.save();
    return invalidatedToken;
  },
};
