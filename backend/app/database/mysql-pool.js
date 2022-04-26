"use strict";
const mysql = require("mysql2/promise");

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_DATABASE } =
  process.env;

const CONNECTION_LIMIT = 10;

let pool = null;

// Accdedemos a mysql con nuestras credenciales y probamos si conecta
async function connect() {
  const options = {
    connectionLimit: CONNECTION_LIMIT,
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: MYSQL_PORT,
    timezone: "Z",
  };

  pool = mysql.createPool(options);

  try {
    const connection = await pool.getConnection();
    if (connection) {
      connection.release();
    }
  } catch (e) {
    console.error("error stablishing connection", e);
    throw e;
  }
}

// Para coger la conexión ya iniciada y pedir los datos
async function getConnection() {
  if (pool === null) {
    throw new Error("MYSQL connection is not stablished");
  }
  const connection = await pool.getConnection();
  return connection;
}

module.exports = {
  connect,
  getConnection,
};
