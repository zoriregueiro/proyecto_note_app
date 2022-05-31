"use strict";

const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");

async function updateNote(req, res) {
  const noteData = { ...req.body };
  try {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
    });
    await schema.validateAsync(noteData);
  } catch (error) {
    return res.status(400).send(error);
  }

  try {
    const now = new Date();
    const modifiedDate = now.toISOString().substring(0, 19).replace("T", " ");

    const connection = await mysqlPool.getConnection();
    const sqlQuery =
      "UPDATE notes SET title = ?, content = ?, modified_at = ? WHERE id = ? ;";

    await connection.query(sqlQuery, [
      noteData.title,
      noteData.content,
      modifiedDate,
      noteData.id,
    ]);

    res.status(204).send("note update");
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  updateNote,
};
