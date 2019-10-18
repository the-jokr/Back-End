exports.up = function(knex, Promise) {
    return knex.schema.alterTable("joke_wallet", field => {
        field.unique(["user_id", "joke_id"], "user_joke"); // uses an index with 2 combination
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable("joke_wallet", field => {
        field.dropUnique(["user_id", "joke_id"], "user_joke"); // uses an index with 2 combination
    });
};
