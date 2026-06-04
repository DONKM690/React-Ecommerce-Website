import {
  createContext,
  useState,
  useEffect
} from "react";

export const AuthContext =
  createContext();

export function AuthProvider({
  children
}) {

  const [user, setUser] =
    useState(null);

  const [authLoaded, setAuthLoaded] =
    useState(false);

  // LOAD USER
  useEffect(() => {

    try {

      const savedUser =
        localStorage.getItem("user");

      if (savedUser) {

        setUser(
          JSON.parse(savedUser)
        );

      }

    } catch (err) {

      console.log(
        "Error loading user:",
        err
      );

      localStorage.removeItem("user");

    }

    setAuthLoaded(true);

  }, []);

  // LOGIN
  const login = (data) => {

    localStorage.setItem(
      "user",
      JSON.stringify(data)
    );

    setUser(data);
  };

  // LOGOUT
  const logout = () => {

    // REMOVE ONLY CURRENT SESSION
    localStorage.removeItem("user");

    // CLEAR SESSION STORAGE
    sessionStorage.clear();

    // CLEAR REACT STATE
    setUser(null);
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        authLoaded
      }}
    >

      {children}

    </AuthContext.Provider>

  );
}