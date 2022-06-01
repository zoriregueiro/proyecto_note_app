import { Note } from "./Note";

export const NoteList = () => {
  return (
    // Hacer map
    <ul className="note-list">
      <li>
        <Note />
      </li>
    </ul>
  );
};
