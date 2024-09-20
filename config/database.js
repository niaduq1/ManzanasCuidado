const {Sequelize} = require("sequelize");
const isSSL = process.env.DB_USE_SSL === "true";

const sequelize = new Sequelize(
  process.env.DB_NAME || "test",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "password",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: console.log,
    port: process.env.DB_PORT || 3306,

    dialectOptions: isSSL
    ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
    : {},
  }
);

async function connection() {
  try {
    await sequelize.authenticate();
    console.log("The connection has been established successfully")
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = {sequelize, connection};