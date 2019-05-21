const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "Anonymous",
          password: bcrypt.hashSync("password", 10),
          roles: "admin"
        },
        {
          username: "admin",
          password: bcrypt.hashSync("password", 10),
          roles: "admin"
        },
        {
          username: "test2",
          password: bcrypt.hashSync("password", 10),
          roles: "admin"
        }
      ]);
    });
};
