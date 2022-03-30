//require('.env').config({path:__dirname+'/server/.env'});

const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: `localhost`,
      user: `admin`,
      password: `notasecret`,
      database: `smartcal_mysqldb`
    },
  };
  module.exports = config;