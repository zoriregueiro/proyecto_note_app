export const UserProfile = () => {
  const notesMock = [
    {
      id: 6,
      name: "Manolito",
      email: "manolito@gmail.com",
    },
  ];
  return (
    <section className="user-data">
      <p>Email: {notesMock.email}</p>
      <p>Name: {notesMock.name}</p>
      <button>Log out</button>
    </section>
  );
};
