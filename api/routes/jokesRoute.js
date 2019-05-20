const express = require("express");
const route = express.Router();
const Db = require("../../data/Models/jokesModel");

route.get("/", async (req, res, next) => {
  try {
    const jokes = await Db.get();
    res.status(200).json(jokes);
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
route.post("/", async (req, res, next) => {
  try {
    const { setup, punchline } = req.body;
    if (setup && punchline) {
      const joke = Db.insert(req.body);
      res.status(201).json({ created: true, joke });
    } else {
      next({ code: 400 });
    }
  } catch (err) {
    next(err);
  }
});
route.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const change = req.body;
    const update = await Db.update(id, change);
    res.status(200).json(update);
  } catch (err) {
    next(err);
  }
});
route.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Db.remove(id);
    if (deleted) {
      res.status(204).json({ msg: "delete success" });
    } else {
      next({ code: 404 });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = route;
