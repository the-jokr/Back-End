exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", field => {
      field.increments();
      field.string("username", 50);
      field.string("password", 1000);
      field.string("roles", 50);
    })
    .createTable("jokes", field => {
      field.increments();
      field.string("category", 50);
      field.text("setup", 500);
      field.text("punch_line", 500);
      field.integer("likes").defaultTo(0);
    })
    .createTable("joke_wallet", field => {
      field.increments();
      field
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      field
        .integer("joke_id")
        .references("id")
        .inTable("jokes")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      field
        .integer("author_id")
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("joke_wallet")
    .dropTableIfExists("jokes")
    .dropTableIfExists("users");
};
