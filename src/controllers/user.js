const bcrypt = require('bcrypt');
const { verifyMasterKey } = require('../auth');
const User = require('../models/user');

exports.createUser = async ({ headers, body }, res) => {
  if (verifyMasterKey(headers.master_key)) {
    const user = {
      username: body.username,
      password: bcrypt.hashSync(body.password, 8),
      name: body.name
    }

    try {
      await User.create(user);
    } catch (e) {
      console.error(e)
      return res.status(500).json({ message: e.message });
    }

    return res.json({ message: "success" });
  } else {
    return res.status(403).json({ message: "INVALID MASTER KEY" })
  }
}

exports.getUsers = async ({ body }, res) => {
  const users = await User.scan().all().exec();
  return res.json(users);
}