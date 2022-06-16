import "./home.css";
import React, { useState, useEffect } from "react";
import { NoteList } from "../../components/NoteList";
import { getLatestNotes } from "../../services";

// UseEffect que te pide las latestNotes

export const Home = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await getLatestNotes();

        setNotes(response.data);
      } catch (error) {
        console.error("error", error);
      }
    };
    loadNotes();
  });

  return (
    <section className="home-section">
      <h2>Latest Notes</h2>
      <NoteList notes={notes} />
    </section>
  );
};
