// Función para decirle a mysql que nos añada una cuenta
// A esta función le tenemos que pasar desde el frontal los datos (nombre, password...)
// Tenemos que validar los datos de entrada
// Tenemos que crear un objeto con todo lo que queremos pasar a la query
// Creamos conexión con mysql
// Creamos la query
// Enviamos la query
// Soltamos conexión
// Retornamos datos a frontal
const webToken = require("jsonwebtoken");
const hash = require("bcrypt").hash();
const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");
const { date } = require("@hapi/joi");
const PASSWORD_REGEX = require("../../../constants").PASSWORD_REGEX;

const HASH = 10;

async function validateSchema(payload) {
  const { object, string, assert } = joi;
  const schema = object({
    name: string().required(),
    email: string().email().required(),
    password: string().regex(PASSWORD_REGEX).required(),
  });

  //verificar que se cumplen los requistos a la hora de meter los datos del usuario, comparando el esquma con los datos de entrada
  assert(payload, schema);
}

async function createAccount(req, res) {
  const accountData = { ...req.body };
  try {
    await validateSchema(accountData);
  } catch (error) {
    return res.status(400).send(error);
  }
  const now = new date();
  const createDate = now.toISOString().substring(0, 19).replace("T", " ");
  const securePassword = await hash(accountData.password, HASH);
  try {
    const connection = await mysqlPool.getConnection();
    const sqlQuery = "INSERT INTO users SET ?";
    await connection.query(sqlQuery, {
      name: accountData.name,
      email: accountData.email,
      password: securePassword,
      created_at: createDate,
    });
    const sqlUser = `SELECT * FROM users WHERE email = '${accountData.email}'`;
    const user = connection.query(sqlUser);
    console.log(user);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = { createAccount };
