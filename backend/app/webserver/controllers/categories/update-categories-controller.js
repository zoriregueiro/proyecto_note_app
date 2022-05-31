"use strict";

const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");

async function updateCategory(req, res) {
  const categoryData = { ...req.body };

  try {
    const schema = Joi.object().keys({
      categoryId: Joi.number().required(),
      name: Joi.string().required(),
    });
    await schema.validateAsync(categoryData);
  } catch (error) {
    return res.status(400).send(error);
  }
  try {
    const now = new Date();
    const modifiedDate = now.toISOString().substring(0, 19).replace("T", " ");

    const connection = await mysqlPool.getConnection();
    const sqlQuery =
      "UPDATE categories SET name = ?, modified_at = ? WHERE id = ?;";

    await connection.query(sqlQuery, [
      categoryData.name,
      modifiedDate,
      categoryData.categoryId,
    ]);

    res.status(204).send("category update");
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  updateCategory,
};
