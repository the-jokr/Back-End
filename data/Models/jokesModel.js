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
  return Db("jokes as j")
    .leftJoin("joke_wallet as jw", "j.id", "=", "jw.joke_id")
    .leftJoin("users as u", "u.id", "=", "jw.author_id")
    .select(
      "j.id",
      "j.category",
      "j.setup",
      "j.punch_line as punch_line",
      "j.likes",
      "u.id as author_id",
      "u.username as author"
    )
    .distinct("j.id")
    .orderBy("j.id");
}
function getById(id) {
  return Db("jokes as j")
    .join("joke_wallet as jw", "j.id", "=", "jw.joke_id")
    .join("users as u", "u.id", "=", "jw.author_id")
    .select(
      "j.id",
      "j.category",
      "j.setup",
      "j.punch_line as punchLine",
      "j.likes",
      "u.id as author_id",
      "u.username as author"
    )
    .where({ "j.id": id })
    .first();
}
// function getTopTen(){
//   return Db('jokes').orderBy('upvotes')
// }
function getBy(filter) {
  return Db("jokes")
    .where(filter)
    .first();
}
function insert(joke) {
  return Db("jokes")
    .insert(joke, "id")
    .then(ids => ids[0]);
}
function update(id, joke) {
  return Db("jokes")
    .where({ id })
    .update(joke);
}
function remove(id) {
  return Db("jokes")
    .where({ id })
    .del();
}
