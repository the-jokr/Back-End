const knex = require("knex");
const knexConfig = require("../knexfile");
const dbEnv = process.env.DB_ENV || "production";
const db = knex(knexConfig[dbEnv]);
module.exports = db;
