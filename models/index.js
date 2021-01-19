const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  logging: false,
  timezone: '+08:00',

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },


  define: {
    timestamps: true,
    createdAt:'created_at',
    updatedAt:'updated_at',
    underscored: true
  },
  dialectOptions: {
    dateStrings: true,
    typeCast: true,

  }

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// todos
db.todos = require("./todo.model")(sequelize, Sequelize);

module.exports = db;
