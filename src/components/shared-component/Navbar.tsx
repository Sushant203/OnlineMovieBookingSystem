import { useEffect, useState } from "react";
import { NavData } from "../../data/navdata";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosArrowDropdownCircle, IoMdMenu, IoMdClose } from "react-icons/io";
import { IUserDetail } from "@/types/UserDetail";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "../../../public/logo.jpg";
const Navbar = () => {
  const [userData, setUserData] = useState<IUserDetail | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <nav className="flex flex-col md:flex-row justify-between items-center  shadow-md py-3 px-4 relative">
      <div className="flex items-center justify-between w-full md:w-auto">
        <img src={logo} alt="Logo" className=" rounded-full w-10 h-10" />
        <button
          className="text-3xl md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      <div
        className={`md:flex flex-col md:flex-row md:items-center md:gap-6 w-full md:w-auto md:bg-transparent transition-transform  duration-300 ease-in-out ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <section className="flex flex-col md:flex-row md:gap-6 md:mx-10 md:justify-normal p-4 md:p-0">
          {NavData.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-xl font-semibold py-2 px-4 rounded hover:bg-gray-700 hover:text-white transition-colors duration-300"
            >
              {item.title}
            </Link>
          ))}
        </section>

        <section className="flex flex-col md:flex-row items-center md:mx-10 mt-4 md:mt-0 text-xl font-semibold">
          {userData ? (
            <div className="flex items-center gap-4 cursor-pointer">
              <div className="flex flex-col text-sm text-center">
                <p className="text-gray-400">Welcome</p>
                <h1>{userData.fullname}</h1>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <IoIosArrowDropdownCircle className="text-2xl" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="bg-gray-700 text-white">
                    Hey, whatsup
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
            <Link
              to="/login"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Login
            </Link>
          )}
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
