import "./css/newNote.css";
import React, { useState } from "react";
import { createNote } from "../services/notesService";
import { useNavigate, useParams } from "react-router-dom";

export const NewNote = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const handleCreateNote = async () => {
    try {
      await createNote(params.id_category, title, content);
      navigate("/my-notes");
    } catch (error) {
      console.error(Error);
    }
  };

  return (
    <div className="new-note">
      <h2>New note</h2>
      <textarea
        id="titleNewNote"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        id="bodyNewNote"
        placeholder="Description"
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="save-new-note-button" onClick={handleCreateNote}>
        Save
      </button>
    </div>
  );
};
