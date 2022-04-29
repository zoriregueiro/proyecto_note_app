"use strict";
const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");

async function login(req, res) {
  const authData = { ...req.body };

  try {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    await schema.validateAsync(authData);
  } catch (error) {
    return res.status(400).send(error);
  }

  try {
    const connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT * FROM users WHERE email = '${authData.email}'`;
    const [response] = await connection.query(sqlQuery);

    connection.release();

    if (response.length === 0) {
      return res.status(401).send("Account not registered");
    }
    const user = response[0];
    const isPasswordOk = await bcrypt.compare(authData.password, user.password);

    if (!isPasswordOk) {
      return res.status(401).send("Password or email incorrect");
    }

    const payloadJwt = { user_id: user.id };
    const jwtExpiresIn = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL);

    const token = jsonWebToken.sign(payloadJwt, process.env.AUTH_JWT_SECRET, {
      expiresIn: jwtExpiresIn,
    });
    

    res.status(200).send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  login,
};
