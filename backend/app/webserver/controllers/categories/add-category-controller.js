"use strict";

const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");

async function createCategory(req, res) {
  const { user_id } = req.claims;
  const categoryData = { ...req.body, user_id };

  try {
    const schema = Joi.object().keys({
      user_id: Joi.number().required(),
      name: Joi.string().required(),
    });
    await schema.validateAsync(categoryData);
  } catch (error) {
    return res.status(400).send(error);
  }
  const now = new Date();
  const createDate = now.toISOString().substring(0, 19).replace("T", " ");
  try {
    const connection = await mysqlPool.getConnection();
    const sqlQuery = "INSERT INTO categories SET ?";
    await connection.query(sqlQuery, {
      id_user: categoryData.user_id,
      name: categoryData.name,
      created_at: createDate,
    });
    connection.release();
    res.status(201).send("category created");
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  createCategory,
};
