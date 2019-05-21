exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("jokes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("jokes").insert([
        {
          category: "Animal",
          setup: "What is smarter than a talking bird?",
          punch_line: "A spelling bee",
          likes: 999
        },
        {
          category: "Pirate",
          setup: "Why couldn't the kid see the pirate movie?",
          punch_line: "Because it was rated arrr!",
          likes: 100
        },
        {
          category: "Body Part",
          setup: "I used to hate facial hair",
          punch_line: "but then it grew on me",
          likes: 5
        }
      ]);
    });
};
