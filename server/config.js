const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: `localhost`,
      user: `admin`,
      password: `notasecret`,
      database: `smartcal_mysqldb`
    },
    jwt: {
      saltRounds: 13,  // ~20 hashes/s
      secret: 'megaWorm' // key for signing outgoing tokens (In prod, this is an environment variable)
    }
  };
  module.exports = config;