"use strict";

const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");

async function deleteNote(req, res) {
  const { noteId } = req.params;

  const noteData = { noteId };

  try {
    const schema = Joi.object().keys({
      noteId: Joi.number().required(),
    });
    await schema.validateAsync(noteData);
  } catch (error) {
    return res.status(400).send(error);
  }
  const now = new Date();
  const deleteDate = now.toISOString().substring(0, 19).replace("T", " ");
  try {
    const connection = await mysqlPool.getConnection();
    const sqlQuery = `UPDATE notes SET deleted_at = '${deleteDate}' WHERE id = '${noteData.noteId}' AND deleted_at IS NULL`;
    await connection.query(sqlQuery);
    connection.release();
    res.status(204).send("removed");
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  deleteNote,
};
