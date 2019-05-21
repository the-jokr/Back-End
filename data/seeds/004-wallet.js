exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("joke_wallet")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("joke_wallet").insert([
        { user_id: 1, joke_id: 1 },
        { user_id: 1, joke_id: 2 },
        { user_id: 1, joke_id: 3 }
      ]);
    });
};
