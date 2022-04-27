"use strict";
const { Router } = require("express");
const { login } = require("../controllers/auth/login-controller");

const authRouter = Router();

authRouter.post("/", login);

module.exports = { authRouter };
