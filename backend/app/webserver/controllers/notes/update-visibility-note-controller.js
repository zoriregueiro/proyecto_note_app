"use strict";

const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");

async function updateNoteVisibility(req, res) {
  const noteData = { ...req.body };
  try {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      visibility: Joi.string().required(),
    });
    await schema.validateAsync(noteData);
  } catch (error) {
    return res.status(400).send(error);
  }

  try {
    const connection = await mysqlPool.getConnection();
    const sqlQuery = "UPDATE notes SET visibility = ? WHERE id = ?;";

    await connection.query(sqlQuery, [noteData.visibility, noteData.id]);
    connection.release();
    res.status(204).send("note visibility updated");
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  updateNoteVisibility,
};
