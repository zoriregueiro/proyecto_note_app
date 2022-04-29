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
    const connection = await mysqlPool.getConnection();
    const sqlQuery = "UPDATE categories SET name = ? WHERE id = ?;";

    await connection.query(sqlQuery, [
      categoryData.name,
      categoryData.categoryId,
    ]);
    connection.release();
    res.status(204).send("category update");
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  updateCategory,
};
