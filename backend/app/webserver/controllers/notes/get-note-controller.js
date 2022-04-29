"use strict";

const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");

async function getNote(req, res) {
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
  try {
    const connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT * FROM notes WHERE id = '${noteData.noteId}'`;
    const [note] = await connection.query(sqlQuery);
    connection.release();
    res.status(200).send(note);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getNote,
};
