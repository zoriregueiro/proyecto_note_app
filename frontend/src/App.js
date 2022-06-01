import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { Home } from "./views/home/Home";
import { Register } from "./views/register/Register";
import { Login } from "./views/login/Login";
import { Footer } from "./components/Footer";

function App() {
  return (
    <main className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/*<Route path="*" element={<NotFound />} />  */}
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
