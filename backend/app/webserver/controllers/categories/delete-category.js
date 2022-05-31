"use strict";

const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");

async function deleteCategory(req, res) {
  const { categoryId } = req.params;
  let connection;

  const categoryData = { categoryId };

  try {
    const schema = Joi.object().keys({
      categoryId: Joi.number().required(),
    });
    await schema.validateAsync(categoryData);
  } catch (error) {
    return res.status(400).send(error);
  }
  const now = new Date();
  const deleteDate = now.toISOString().substring(0, 19).replace("T", " ");

  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `UPDATE categories SET deleted_at = '${deleteDate}' WHERE id = '${categoryData.categoryId}' AND deleted_at IS NULL`;
    await connection.query(sqlQuery);

    const sqlNotes = `UPDATE notes SET deleted_at = '${deleteDate}' WHERE id_category = '${categoryData.categoryId}' AND deleted_at IS NULL`;
    await connection.query(sqlNotes);
    res.status(204).send("category removed");
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  deleteCategory,
};
