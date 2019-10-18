exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("joke_wallet")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("joke_wallet").insert([
                { user_id: 1, joke_id: 1, author_id: 1 },
                { user_id: 1, joke_id: 2, author_id: 2 },
                { user_id: 2, joke_id: 1, author_id: 1 },
                { user_id: 2, joke_id: 2, author_id: 2 },
                { user_id: 2, joke_id: 3, author_id: 1 }
            ]);
        });
};
