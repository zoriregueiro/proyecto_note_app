import { Link } from "react-router-dom";

export const ErrorMessage = () => {
  const message = "Not fooound!";
  return (
    <section className="error">
      <h1>Error</h1>
      <p>{message}</p>
      <Link to={"/"}>Go to home</Link>
    </section>
  );
};
