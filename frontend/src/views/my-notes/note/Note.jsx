import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  deleteNote,
  getNote,
  updateNoteVisibility,
  updateNote,
} from "../../../services/notesService";
import "./note.css";

export const Note = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState();
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  useEffect(() => {
    const getNoteData = async () => {
      try {
        const response = await getNote(params.id);
        setNote(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    getNoteData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditNote = () => setIsReadOnly(!isReadOnly);

  const handleUpdateNote = async () => {
    try {
      const titleData = title || note.title;
      const contentData = content || note.content;
      await updateNote(params.id, titleData, contentData);
      setIsReadOnly(true);
      setNote({ ...note, title, content });
    } catch (error) {
      console.log(error);
    }
  };

  const handleVisibilityNote = async () => {
    try {
      const visibility = note.visibility === "public" ? "private" : "public";
      await updateNoteVisibility(params.id, visibility);
      setNote({ ...note, visibility });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteNote = async () => {
    const confirm = window.confirm("Are you sure?");
    if (confirm === true) {
      await deleteNote(params.id);
      navigate("/my-notes");
    }
  };

  if (!note) return <></>;

  return (
    <div className="note">
      <div className="header-note">
        <button onClick={() => navigate(-1)}>
          <p>Atrás</p>
        </button>
        <button onClick={handleEditNote}>
          <p>Editar</p>
        </button>
        <button onClick={handleDeleteNote}>
          <p>Borrar</p>
        </button>
        <button onClick={handleVisibilityNote}>
          <p>Visibilidad</p>
          <small>{note.visibility}</small>
        </button>
      </div>

      {isReadOnly ? (
        <>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </>
      ) : (
        <div>
          <textarea
            id="titleNote"
            defaultValue={note.title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            id="bodyNote"
            defaultValue={note.content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleUpdateNote}>Save</button>
        </div>
      )}
    </div>
  );
};
