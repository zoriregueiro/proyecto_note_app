import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/auth-context";
import { useNavigate } from "react-router-dom";
import {
  deleteNote,
  getNote,
  updateNoteVisibility,
} from "../../../services/notesService";
import "./note.css";

export const Note = () => {
  const params = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [note, setNote] = useState();
  const [isReadOnly, setIsReadOnly] = useState(true);

  // Para editar
  // Creamos un estado para saber si está editando no (hecho)
  // Pasamos al botón el setIsReadOnly(!!isReadOnly)
  // Si está a true - Mostramos el contenido estático
  // Si está a false - Mostramps el contenido editable - TextArea
  // Dos estados, uno para el título y otro para el contenido
  // Al textArea en la función onChange le pasáis el e.current.value y vais seteándolo al estado
  // Creamos un botón Guardar que se muestre solo si el isReadOnly = false
  // Al hacer click en el botón hay que llamar al endpoint de editar nota y pasarle el contenido
  // Y además seteamos la nota con el nuevo title y content (como en la visibilidad)
  // Y seteamos el isReadOnly a true

  useEffect(() => {
    const getNoteData = async () => {
      try {
        const response = await getNote(params.id);
        // setNote(response.data);
        setNote({
          id: 6,
          id_user: 1,
          title: "Nota 1",
          content: "Esto es una nota para la categoría 1",
          created_at: "2022-05-31T18:35:53.000Z",
          modified_at: null,
          deleted_at: null,
          image_url: null,
          visibility: "public",
          id_category: 1,
        });
      } catch (error) {
        console.error(error);
      }
    };

    getNoteData();
  }, []);

  const changeVisibility = async () => {
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
        <button>
          <p>Editar</p>
        </button>
        <button onClick={handleDeleteNote}>
          <p>Borrar</p>
        </button>
        <button onClick={changeVisibility}>
          <p>Visibilidad</p>
          <small>{note.visibility}</small>
        </button>
      </div>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <p>By {user.name}</p>
    </div>
  );
};
