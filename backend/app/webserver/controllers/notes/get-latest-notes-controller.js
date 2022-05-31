"use strict";

const mysqlPool = require("../../../database/mysql-pool");

async function getLatestNotes(_, res) {
  let connection;

  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT * FROM notes WHERE deleted_at IS NULL AND visibility = "public" LIMIT 20`;
    const [notes] = await connection.query(sqlQuery);

    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  getLatestNotes,
};
