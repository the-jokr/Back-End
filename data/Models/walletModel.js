const Db = require("../dbConfig");

module.exports = {
  get,
  getById,
  getBy,
  insert,
  update,
  remove
};

function get() {
  return Db("joke_wallet as jw");
}

async function getById(id) {
  const wallet = await Db("joke_wallet as jw")
    .join("users as u", "u.id", "=", "jw.user_id")
    .where({ "u.id": id })
    .select("jw.user_id as userId", "u.username")
    .first();
  const savedJokes = await Db("jokes as j")
    .join("joke_wallet as jw", "j.id", "=", "jw.joke_id")
    .join("users as u", "u.id", "=", "jw.user_id")
    .select(
      "jw.id as saved_id",
      "j.id as joke_id",
      "j.category",
      "j.setup",
      "j.punch_line",
      "j.likes",
      "jw.author_id as author_id"
    )
    .where("u.id", id);
  const submittedJokes = await Db("jokes as j")
    .leftJoin("joke_wallet as jw", "j.id", "=", "jw.joke_id")
    .leftJoin("users as u", "u.id", "=", "jw.user_id")
    .select("j.id", "j.category", "j.setup", "j.punch_line", "j.likes")
    .where("jw.author_id", id)
    .distinct("jw.author_id");
  return {
    ...wallet,
    savedJokes: [...savedJokes],
    submittedJokes: [...submittedJokes]
  };
}
function getBy(filter) {
  return Db("joke_wallet")
    .where(filter)
    .first();
}

function insert(joke) {
  return Db("joke_wallet")
    .insert(joke, "id")
    .then(ids => ids[0]);
}

function update(id, changes) {
  return Db("joke_wallet")
    .where({ id })
    .update(changes)
    .then(count => getById(id));
}
function remove(id) {
  return Db("joke_wallet")
    .where({ id })
    .del();
}
