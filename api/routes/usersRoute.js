const express = require("express");
const route = express.Router();
const Db = require("../../data/Models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
function generateToken(user) {
  const payload = {
    subject: user.id, //what the token is describing,
    username: user.username
  };
  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
}
route.get("/", async (req, res, next) => {
  try {
    const users = await Db.get();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});
route.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await Db.getById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      next({ code: 404 });
    }
  } catch (err) {
    next(err);
  }
});
route.post("/register", async (req, res, next) => {
  try {
    const creds = req.body;
    creds.password = bcrypt.hashSync(creds.password, 10);
    const user = await Db.insert(creds);
    const token = generateToken(user);
    res.status(201).json({ id: user.id, token });
  } catch (err) {
    next(err);
  }
});
route.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Db.getBy(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ id: user.id, token });
    } else {
      next({ code: 404 });
    }
  } catch (err) {
    next(err);
  }
});
module.exports = route;
