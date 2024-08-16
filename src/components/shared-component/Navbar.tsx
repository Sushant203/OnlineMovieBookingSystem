import { useEffect, useState } from "react";
import { NavData } from "../../data/navdata";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IUserDetail } from "@/types/UserDetail";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [userData, setUserData] = useState<IUserDetail | null>(null);
  const navigate = useNavigate();

  const fetchUser = async (userId: string | null) => {
    if (!userId) return;
    try {
      const response = await axios.get(
        `http://localhost:4000/register/${userId}`
      );
      setUserData(response.data);
      console.log(response.data, "data users");
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    fetchUser(userId);
  }, []); // Only run once when the component mounts

  const handleLogout = () => {
    localStorage.clear();
    setUserData(null); // Clear the user data to trigger a re-render
    navigate("/"); // Redirect to the home page
  };

  return (
    <nav className="flex justify-between border-none border-slate-200 shadow-md py-3 px-2 items-center">
      <section className="mx-10 flex justify-normal gap-6">
        <img src="movie logo.png" alt="Logo" className="h-8" />
        {NavData.map((item, index) => (
          <div key={index}>
            <Link to={item.path}>
              <h2 className="flex justify-between text-2xl text-slate-700 font-semibold p-1 cursor-pointer hover:border-b-2 border-blue-800 transition-all ease-in-out delay-300">
                {item.title}
              </h2>
            </Link>
          </div>
        ))}
      </section>
      <section className="mx-10 text-2xl font-semibold">
        {userData ? (
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <p className="text-sm text-center">Welcome</p>{" "}
              <h1 className="text-sm text-center"> {userData.fullname}</h1>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <IoIosArrowDropdownCircle />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {" "}
                  Hey, I'm {userData.fullname}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <button>
            <Link to="/login">Login</Link>
          </button>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
