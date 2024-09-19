import { createContext, useState, useMemo, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.status === 200) {
          const currentUser = await response.json();
          setUser(currentUser);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getCurrentUser();
  }, []);

  const auth = useMemo(
    () => ({ user, setUser, isLoading, setIsLoading }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default AuthContext;
export { AuthProvider };
