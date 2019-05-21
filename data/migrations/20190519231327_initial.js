exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", field => {
      field.increments();
      field
        .string("username", 50)
        .notNullable()
        .unique();
      field.string("password", 1000);
      field
        .string("roles", 50)
        .defaultTo("Regular")
        .notNullable();
    })
    .createTable("jokes", field => {
      field.increments();
      field.string("category", 50);
      field.text("setup", 500).notNullable();
      field.text("punch_line", 500).notNullable();
      field.integer("likes").defaultTo(0);
      field.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("joke_wallet", field => {
      field
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      field
        .integer("joke_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("jokes")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      field
        .integer("author_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .defaultTo(1);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("joke_wallet")
    .dropTableIfExists("jokes")
    .dropTableIfExists("users");
};
