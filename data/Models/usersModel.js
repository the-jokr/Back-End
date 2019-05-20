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
  return Db("users");
}
function getById(id) {
  return Db("users")
    .where({ id })
    .first();
}
function getBy(filter) {
  return Db("users")
    .where({ username: filter })
    .first();
}

function insert(user) {
  return Db("users")
    .insert(user, "id")
    .then(ids => getById(ids[0]));
}

function update(id, user) {
  return Db("users")
    .where({ id })
    .update(user);
}
function remove(id) {
  return Db("users")
    .where({ id })
    .del();
}
