import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    // withCredentials is used to determine whether or not cross-origin requests (requests to a different domain) should include cookies, authorization headers, or other credentials.
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post("http://localhost:8800/api/auth/logout", {}, {
      withCredentials: true,
    });
    setCurrentUser(null);
  };

  const updateUser = (newUser) => {
    console.log(newUser)
    setCurrentUser((prevUser) => ({
      ...prevUser,
      ...newUser,
    }));
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
