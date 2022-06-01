export const Note = () => {
  const shareNote = async (id) => {};

  return (
    <article className="note">
      <h3>Note Title</h3>
      <p>Note Body</p>
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
