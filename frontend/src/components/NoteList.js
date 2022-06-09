import "./css/noteList.css";
import { useNavigate } from "react-router-dom";

export const NoteList = ({ notes, hasToRedirect }) => {
  const navigate = useNavigate();

  function redirect(id) {
    hasToRedirect && navigate("/my-notes/" + id);
  }

  return (
    <div className="note">
      {notes.map((note) => (
        <div
          className="container"
          onClick={() => redirect(note.id)}
          key={note.id}
        >
          <p>{note.title}</p> <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};
