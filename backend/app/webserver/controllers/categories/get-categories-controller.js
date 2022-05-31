"use strict";

const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");

async function getCategories(req, res) {
  const { user_id } = req.claims;
  const categoryData = { user_id };
  let connection;

  try {
    const schema = Joi.object().keys({
      user_id: Joi.number().required(),
    });
    await schema.validateAsync(categoryData);
  } catch (error) {
    return res.status(400).send(error);
  }
  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT * FROM categories WHERE id_user = '${categoryData.user_id}' AND deleted_at IS NULL`;
    const [categories] = await connection.query(sqlQuery);

    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  getCategories,
};
