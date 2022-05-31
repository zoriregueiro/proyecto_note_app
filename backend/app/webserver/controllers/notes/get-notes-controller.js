"use strict";

const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");

async function getNotes(req, res) {
  const { categoryId } = req.params;
  const { user_id } = req.claims;
  let connection;

  const noteData = { user_id, categoryId };

  try {
    const schema = Joi.object().keys({
      user_id: Joi.number().required(),
      categoryId: Joi.number().required(),
    });
    await schema.validateAsync(noteData);
  } catch (error) {
    return res.status(400).send(error);
  }
  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT * FROM notes WHERE id_category = '${noteData.categoryId}' AND id_user = '${noteData.user_id}' AND deleted_at IS NULL`;
    const [notes] = await connection.query(sqlQuery);

    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  getNotes,
};
