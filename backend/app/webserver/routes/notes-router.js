"use strict";

const { Router } = require("express");

const {
  checkAccountSession,
} = require("../controllers/account/check-account-controller");

const { createNote } = require("../controllers/notes/add-note-controller");

const notesRouter = Router();

notesRouter.post("/", checkAccountSession, createNote);

module.exports = { notesRouter };
