const bcrypt = require('bcrypt');
const User = require('../models/user');
const { MASTER_KEY, JWT_SECRET } = require('../config');
const jwt = require("jsonwebtoken");

exports.verifyMasterKey = (masterKey) => {
    return masterKey === MASTER_KEY;
}

exports.signin = async (req, res, next) => {
    const user = await exports.verifyUser(req.body);

    if (! user) {
      return res.status(403).json({ message: "Username or Password invalid"})
    }

    const token = jwt.sign({id: user.username}, JWT_SECRET);

    delete user.password;
    user.token = token;
    req.user = user;
    next();
}

exports.verifyUser = async ({ username, password }) => {
    if (!username || !password) {
        return false;
    }

    const [ user ] = await User.scan("username").eq(username).limit(1).exec();

    if (! user) {
        return false;
    }

    if (! bcrypt.compareSync(password, user.password)) {
        return false;
    }

    return user.toJSON();
}

exports.middlewareToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (! token) {
      return res.status(403).json({
        message: "No token provided!"
      });
    }
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({
          message: "Unauthorized!"
        });
      }

      req.user = user;
      next();
    });
};

module.exports = exports;