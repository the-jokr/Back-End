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
  return Db("jokes");
}
function getById(id) {
  return Db("jokes")
    .where({ id })
    .first();
}
function getBy(filter) {
  return Db("jokes")
    .where(filter)
    .first();
}

function insert(user) {
  return Db("jokes")
    .insert(user, "id")
    .then(ids => getById(ids[0]));
}

function update(id, user) {
  return Db("jokes")
    .where({ id })
    .update(user);
}
function remove(id) {
  return Db("jokes")
    .where({ id })
    .del();
}
