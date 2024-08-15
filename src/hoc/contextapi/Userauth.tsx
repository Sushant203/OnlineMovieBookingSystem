import { createContext, useEffect, useState, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Define the shape of the context's value
interface UserAuthContextProps {
  name: string;
  token: string | null;
}

// Create the context with the defined shape
export const UserAuthContext = createContext<UserAuthContextProps | undefined>(
  undefined
);

interface UserAuthContextApiProps {
  children: ReactNode;
}

function UserAuthContextApi({ children }: UserAuthContextApiProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);

  console.log(token);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      if (
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/landing"
      ) {
        navigate(
          "/seat/movie/:movieId/theater/:theaterId/showtime/:showtimeId"
        );
      }
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [localStorage]);

  return (
    <UserAuthContext.Provider
      value={{ name: "himal", token: localStorage.getItem("token") }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export default UserAuthContextApi;
