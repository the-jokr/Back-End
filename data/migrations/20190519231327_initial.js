exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("roles", field => {
      field.increments();
      field.string("name", 50);
    })
    .createTable("users", field => {
      field.increments();
      field.string("username", 50);
      field.string("password", 50);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("roles");
};
