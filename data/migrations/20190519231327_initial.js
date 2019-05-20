exports.up = function(knex, Promise) {
  return (
    knex.schema
      // .createTable("roles", field => {
      //   field.increments();
      //   field.string("name", 50);
      // })
      .createTable("users", field => {
        field.increments();
        field.string("username", 50);
        field.string("password", 256);
        // field
        //   .integer("roles_id")
        //   .references("id")
        //   .inTable("roles")
        //   .onDelete("RESTRICT")
        //   .onUpdate("CASCADE");
      })
      .createTable("jokes", field => {
        field.increments();
        field.string("category", 50);
        field.text("setup", 500);
        field.text("punch_line", 500);
      })
      .createTable("joke_wallet", field => {
        field.increments();
        field
          .integer("user_id")
          .references("id")
          .inTable("users")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
        field
          .integer("joke_id")
          .references("id")
          .inTable("users")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      })
  );
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("joke_wallet")
    .dropTableIfExists("jokes")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
