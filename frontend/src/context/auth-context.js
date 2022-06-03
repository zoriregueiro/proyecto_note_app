import React, { useContext, createContext, useState } from "react";
import { login, register } from "../services/index";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

export function AuthProvider({ children }) {
  const [user, setUser] = useState(currentUser?.user);
  const [isAuthenticated, setIsAuthenticated] = useState(!!currentUser);
  const navigate = useNavigate();

  const signIn = async ({ email, password }) => {
    try {
      const {
        data: { user, token },
      } = await login(email, password);
      setUser(user[0]);
      setIsAuthenticated(true);
      if (token) {
        navigate("/");
      }
    } catch (error) {
      return Promise.reject(Error);
    }
  };

  const signUp = async ({ name, email, password }) => {
    try {
      const {
        data: { user, token },
      } = await register(name, email, password);
      setUser(user[0]);
      setIsAuthenticated(true);
      if (token) {
        navigate("/");
      }
    } catch (error) {
      return Promise.reject(Error);
    }
  };

  const logOut = () => {
    localStorage.clear("currentUser");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        logOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
