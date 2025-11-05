import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg 
      transition-all duration-300 ease-out
      ${isScrolled ? "bg-base-100/95 shadow-lg" : "bg-base-100/80"}`}
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all duration-300 group">
              <div
                className="size-9 rounded-lg bg-primary/10 flex items-center justify-center 
                transition-all duration-300 ease-out
                group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-3"
              >
                <MessageSquare className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h1 className="text-lg font-bold transition-all duration-300 group-hover:text-primary">Chat Yuk!</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 transition-all duration-300 ease-out 
              hover:scale-105 hover:shadow-md active:scale-95"
            >
              <Settings className="w-4 h-4 transition-transform duration-300 hover:rotate-90" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className="btn btn-sm gap-2 transition-all duration-300 ease-out 
                  hover:scale-105 hover:shadow-md active:scale-95"
                >
                  <User className="size-5 transition-transform duration-300 hover:scale-110" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="btn btn-sm gap-2 transition-all duration-300 ease-out 
                  hover:scale-105 hover:shadow-md active:scale-95"
                  onClick={logout}
                >
                  <LogOut className="size-5 transition-transform duration-300 hover:translate-x-1" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
