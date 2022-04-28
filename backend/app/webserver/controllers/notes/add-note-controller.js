"use strict";

const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");

async function createNote(req, res) {
  const { user_id } = req.claims;

  console.log(user_id);

  const noteData = { ...req.body, user_id };

  try {
    const schema = Joi.object().keys({
      user_id: Joi.number().required(),
      id_category: Joi.number().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
    });
    await schema.validateAsync(noteData);
  } catch (error) {
    return res.status(400).send(error);
  }
  
  const now = new Date();
  const createDate = now.toISOString().substring(0, 19).replace("T", " ");

  try {
    const connection = await mysqlPool.getConnection();
    const sqlQuery = "INSERT INTO notes SET ?";
    await connection.query(sqlQuery, {
      id_user: noteData.user_id,
      id_category: noteData.id_category,
      title: noteData.title,
      content: noteData.content,
      visibility: "private",
      created_at: createDate,
    });
    connection.release();
    res.status(201).send("note created");
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  createNote,
};
