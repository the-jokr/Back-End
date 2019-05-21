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
