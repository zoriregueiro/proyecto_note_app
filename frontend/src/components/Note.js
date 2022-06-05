import "./css/note.css";

export const Note = () => {
  const noteMock = [
    {
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
    },
  ];

  const shareNote = async (id) => {};

  return (
    <article className="note">
      <h3>{noteMock.title}</h3>
      <p>{noteMock.content}</p>
      <p>
        By {noteMock.id_user} at {noteMock.created_at}
      </p>
      <section>
        <button
          onClick={() => {
            shareNote();
          }}
        >
          Share
        </button>
      </section>
    </article>
  );
};
