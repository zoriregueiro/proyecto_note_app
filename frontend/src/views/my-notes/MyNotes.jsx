import React from "react";
import { CategoryList } from "../../components/CategoryList";
import { NoteList } from "../../components/NoteList";
import { getNotes } from "../../services";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Hacer botón que nos lleve a una nota vacía

export const MyNotes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await getNotes(selectedCategory);

        setNotes(response.data);
      } catch (error) {
        console.error("error", error);
      }
    };

    selectedCategory && loadNotes();
  }, [selectedCategory]);

  function redirect() {
    navigate("/my-notes/new/" + selectedCategory);
  }

  // Hacer nueva ruta my-notes/new
  // Nuevo componente NewNote
  // Mostramos los dos textAreas y no tiene defaultValue
  // Y al escribir también los cogemos con los dos estados title y content
  // Cuando le damos a guardar creamos la nota y redirigimos a my-notes

  return (
    <>
      <CategoryList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {notes.length > 0 ? (
        <NoteList notes={notes} hasToRedirect />
      ) : (
        <p>No hay notas</p>
      )}
      <button onClick={redirect}>Add note</button>
    </>
  );
};
