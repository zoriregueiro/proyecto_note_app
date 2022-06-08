import React from "react";
import { CategoryList } from "../../components/CategoryList";
import { NoteList } from "../../components/NoteList";
import { getNotes } from "../../services";
import { useState, useEffect } from "react";

// Hacer botón que nos lleve a una nota vacía

export const MyNotes = () => {
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

  return (
    <>
      <CategoryList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {notes.length > 0 ? <NoteList notes={notes} /> : <p>No hay notas</p>}
    </>
  );
};
