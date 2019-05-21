const express = require("express");
const route = express.Router();
const Db = require("../../data/Models/jokesModel");
const { protected } = require("../middleware/auth");
const rngGenerator = require("../middleware/rngGenerator");
route.get("/", async (req, res, next) => {
  try {
    const jokes = await Db.get();
    res.status(200).json(jokes);
  } catch (err) {
    next(err);
  }
});

route.get("/random", rngGenerator, async (req, res, next) => {
  try {
    const joke = await Db.getById(req.rng);
    res.status(200).json(joke);
  } catch (err) {
    next(err);
  }
});

route.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const joke = await Db.getById(id);
    if (joke) {
      res.status(200).json(joke);
    } else {
      next({ code: 404 });
    }
  } catch (err) {
    next(err);
  }
});
route.post("/", protected, async (req, res, next) => {
  try {
    const { setup, punch_line } = req.body;
    if (setup && punch_line) {
      const joke = Db.insert(req.body);
      res.status(201).json({ created: true, joke });
    } else {
      next({ code: 400 });
    }
  } catch (err) {
    next(err);
  }
});

route.put("/:id", protected, async (req, res, next) => {
  try {
    const { id } = req.params;
    const change = req.body;
    const update = await Db.update(id, change);
    res.status(200).json(update);
  } catch (err) {
    next(err);
  }
});
route.delete("/:id", protected, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Db.remove(id);
    if (deleted) {
      res.status(200).json({ msg: "delete success" });
    } else {
      next({ code: 404 });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = route;
