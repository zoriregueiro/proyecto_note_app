import "./home.css";
import { NoteList } from "../../components/NoteList";

export const Home = () => {
  return (
    <section>
      <h2>Latest Notes</h2>
      <NoteList />
    </section>
  );
};
