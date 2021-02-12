const { User } = require("../models");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");

async function createUser(req, res) {
  const { name, lastname, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      lastname,
      email,
      password: bcrypt.hashSync(password, 8),
    });
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error });
  }
}

function userSignin(req, res) {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      var validPassword = bcrypt.compareSync(req.body.password, user.password);

      if (!validPassword) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid email or password!",
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

async function updateUser(req, res) {
  const id = req.params.id;
  const { name, email, password, lastname } = req.body;

  try {
    const user = await User.findOne({
      where: { id },
    });

    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.password = bcrypt.hashSync(password, 8);
    await user.save();

    return res.json(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

async function getUser(req, res) {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      where: { id },
    });

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error });
  }
}

async function deleteUser(req, res) {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      where: { id },
    });

    await user.destroy();

    return res.json({ message: "The user was deleted!" });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error });
  }
}

module.exports = {
  createUser,
  getUser,
  userSignin,
  updateUser,
  deleteUser,
};
