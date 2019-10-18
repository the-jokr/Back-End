// Update with your config settings.

module.exports = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "./data/dadJokes.sqlite3"
        },
        migrations: {
            directory: "./data/migrations"
        },
        seeds: {
            directory: "./data/seeds"
        },
        useNullAsDefault: true,
        pool: {
            afterCreate: (connection, done) => {
                connection.run("PRAGMA foreign_keys = ON", done);
            }
        }
    },

    testing: {
        client: "sqlite3",
        connection: {
            filename: "./data/test.sqlite3"
        },
        migrations: {
            directory: "./data/migrations"
        },
        seeds: {
            directory: "./data/seeds"
        },
        useNullAsDefault: true,
        pool: {
            afterCreate: (connection, done) => {
                connection.run("PRAGMA foreign_keys = ON", done);
            }
        }
    },

    production: {
        client: "postgresql",
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: "./data/migrations"
        },
        seeds: {
            directory: "./data/seeds"
        }
    }
};
