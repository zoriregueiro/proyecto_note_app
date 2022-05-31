"use strict";

const { Router } = require("express");

const {
  checkAccountSession,
} = require("../controllers/account/check-account-controller");

const { createNote } = require("../controllers/notes/add-note-controller");
const { updateNote } = require("../controllers/notes/update-note-controller");
const {
  updateNoteVisibility,
} = require("../controllers/notes/update-visibility-note-controller");
const { getNotes } = require("../controllers/notes/get-notes-controller");
const { getNote } = require("../controllers/notes/get-note-controller");
const { deleteNote } = require("../controllers/notes/delete-note");
const {
  getLatestNotes,
} = require("../controllers/notes/get-latest-notes-controller");
const notesRouter = Router();

notesRouter.get("/latest", getLatestNotes);
notesRouter.post("/", checkAccountSession, createNote);
notesRouter.put("/update", checkAccountSession, updateNote);
notesRouter.put("/visibility", checkAccountSession, updateNoteVisibility);
notesRouter.get("/:categoryId", checkAccountSession, getNotes);
notesRouter.get("/note/:noteId", checkAccountSession, getNote);
notesRouter.put("/delete/:noteId", checkAccountSession, deleteNote);

module.exports = { notesRouter };
