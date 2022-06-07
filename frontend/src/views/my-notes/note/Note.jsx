import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/auth-context";
import "./note.css";

const noteMock = {
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
};

export const Note = () => {
  const params = useParams();
  console.log(params);
  const { user } = useAuth();
  console.log(user);

  //   const visibleNotes = async (noteId) => {
  //     try {
  //       await updateNoteVisibility({ id, visibility });
  //       if (visibilityNote) {
  //       }
  //     } catch (error) {}
  //   };

  return (
    <article className="note">
      <h3>{noteMock.title}</h3>
      <p>{noteMock.content}</p>
      <p>By {user.name}</p>
    </article>
  );
};
