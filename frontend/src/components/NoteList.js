import "./css/noteList.css";
import { useNavigate } from "react-router-dom";

export const NoteList = ({ notes, hasToRedirect }) => {
  const navigate = useNavigate();

  function redirect(id) {
    hasToRedirect && navigate("/my-notes/" + id);
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <div className="note" onClick={() => redirect(note.id)} key={note.id}>
          <p className="note-title">{note.title}</p>{" "}
          <p className="note-content">{note.content}</p>
        </div>
      ))}
    </div>
  );
};
