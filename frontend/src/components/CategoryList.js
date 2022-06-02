export const CategoryList = () => {
  const categoryMock = [
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
    {
      id: 7,
      id_user: 1,
      title: "Nota 2",
      content: "Esto es una nota para la categoría 2",
      created_at: "2022-07-31T18:35:53.000Z",
      modified_at: null,
      deleted_at: null,
      image_url: null,
      visibility: "public",
      id_category: 1,
    },
    {
      id: 8,
      id_user: 1,
      title: "Nota 3",
      content: "Esto es una nota para la categoría 3",
      created_at: "2022-04-31T18:35:53.000Z",
      modified_at: null,
      deleted_at: null,
      image_url: null,
      visibility: "public",
      id_category: 1,
    },
    {
      id: 9,
      id_user: 1,
      title: "Nota 4",
      content: "Esto es una nota para la categoría 4",
      created_at: "2022-05-31T18:35:53.000Z",
      modified_at: null,
      deleted_at: null,
      image_url: null,
      visibility: "public",
      id_category: 1,
    },
  ];

  return categoryMock.length ? (
    <ul className="category-list">
      {categoryMock.map((category) => {
        return (
          <li key={category.id}>
            <Category />
          </li>
        );
      })}
    </ul>
  ) : (
    <p>There are no categories...</p>
  );
};
