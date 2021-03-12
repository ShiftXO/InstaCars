const config = {
    development: {
        PORT: 5000,
        DB_CONNECTION: '',
        SALT_ROUNDS: 10,
        SECRET: 'samobmw',
        COOKIE_NAME: 'USER_SESSION',
    },
    production: {
        PORT: 80,
        DB_CONNECTION: 'insert mongodb atlas connection here',
        SALT_ROUNDS: 10,
        SECRET: 'samobmw',
        COOKIE_NAME: 'USER_SESSION',
    }
};

module.exports = config