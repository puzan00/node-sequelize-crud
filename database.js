const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("crud", "postgres", "admin", {
  host: "localhost",
  dialect: "postgresql",
});

module.exports = sequelize;
