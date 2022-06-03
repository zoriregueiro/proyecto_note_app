const bcrypt = require("bcrypt");
const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");
const PASSWORD_REGEX = require("../../../constants").PASSWORD_REGEX;
const jsonWebToken = require("jsonwebtoken");

const HASH = 10;

async function createAccount(req, res) {
  const accountData = { ...req.body };
  let connection;

  try {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWORD_REGEX).required(),
    });
    await schema.validateAsync(accountData);
  } catch (error) {
    return res.status(400).send(error);
  }

  const now = new Date();
  const createDate = now.toISOString().substring(0, 19).replace("T", " ");
  const securePassword = await bcrypt.hash(accountData.password, HASH);
  try {
    connection = await mysqlPool.getConnection();

    const sqlUserVerification = `SELECT * FROM users WHERE email = '${accountData.email}'`;
    const [userVerification] = await connection.query(sqlUserVerification);
    if (userVerification.length > 0) {
      throw new Error(
        "Ya existe un usuario en la base de datos con ese email",
        409
      );
    }

    const sqlQuery = "INSERT INTO users SET ?";
    await connection.query(sqlQuery, {
      name: accountData.name,
      email: accountData.email,
      password: securePassword,
      created_at: createDate,
    });
    const sqlUser = `SELECT * FROM users WHERE email = '${accountData.email}'`;
    const [user] = await connection.query(sqlUser);
    const payloadJwt = { user_id: user.id };
    const jwtExpiresIn = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL);

    const token = jsonWebToken.sign(payloadJwt, process.env.AUTH_JWT_SECRET, {
      expiresIn: jwtExpiresIn,
    });

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { createAccount };
