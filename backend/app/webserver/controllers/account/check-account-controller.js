"use strict";

const jsonwebtoken = require("jsonwebtoken");

async function checkAccountSession(req, res, next) {
  const { authorization } = req.headers;
  // Bearer eykufrkufhrkjvhc...
  console.log(authorization);
  if (!authorization) {
    res.status(401).send("user not registered");
  }

  const [prefix, token] = authorization.split(" ");

  if (prefix !== "Bearer") {
    res.status(401).send("user not registered");
  }
  if (!token) {
    res.status(401).send("user not registered");
  }
  try {
    const { user_id } = jsonwebtoken.verify(token, process.env.AUTH_JWT_SECRET);

    // Esto añade el user_id a la request que va a ser accesible para el siguiente controller
    req.claims = {
      user_id,
    };
    console.log("el token ha ido bien");

    return next();
  } catch (error) {
    res.status(401).send("user not registered");
  }
}

module.exports = {
  checkAccountSession,
};
