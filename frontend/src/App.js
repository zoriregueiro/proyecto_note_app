import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { Home } from "./views/home/Home";
import { Register } from "./views/register/Register";
import { Login } from "./views/login/Login";
import { UserProfile } from "./views/profile/Profile";
import { MyNotes } from "./views/my-notes/MyNotes";
import { Footer } from "./components/Footer";
import { NotFound } from "./views/not-found/NotFound";


function App() {
  return (
    <main className="app">
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/my-notes" element={<MyNotes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
