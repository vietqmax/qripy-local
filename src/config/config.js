require('dotenv').config()
module.exports = {
  defaultLanguage: ['en', 'ja', 'vi', 'ko'],
  development: {
    username: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    // dialectOptions: {
    //     socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
    // },
    timezone: '+00:00',
    appUrl: process.env.APP_URL,
    appTitle: process.env.APP_TITLE,
  },
  test: {
    username: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    timezone: '+00:00',
    appUrl: process.env.APP_URL,
    appTitle: process.env.APP_TITLE,
  },
  production: {
    username: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    timezone: '+00:00',
    appUrl: process.env.APP_URL,
    appTitle: process.env.APP_TITLE,
  },
}
