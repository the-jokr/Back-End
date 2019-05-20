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
  return Db("joke_wallet");
}
function getById(id) {
  return Db("joke_wallet")
    .where({ id })
    .first();
}
function getBy(filter) {
  return Db("joke_wallet")
    .where(filter)
    .first();
}

function insert(joke) {
  return Db("joke_wallet")
    .insert(joke, "id")
    .then(ids => getById(ids[0]));
}

function update(id, user) {
  return Db("joke_wallet")
    .where({ id })
    .update(user);
}
function remove(id) {
  return Db("joke_wallet")
    .where({ id })
    .del();
}
