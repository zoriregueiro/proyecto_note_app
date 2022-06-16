import "./my-notes.css";
import React from "react";
import { CategoryList } from "../../components/CategoryList";
import { NoteList } from "../../components/NoteList";
import { getNotes } from "../../services";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="my-notes">
      <div className="category-container">
        <CategoryList
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="note-container">
        <button className="add-note-button" onClick={redirect}>
          Add note
        </button>
        {notes.length > 0 ? (
          <NoteList notes={notes} hasToRedirect />
        ) : (
          <p>There are no notes</p>
        )}
      </div>
    </div>
  );
};
