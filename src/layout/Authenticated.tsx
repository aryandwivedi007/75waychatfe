import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { useLogoutMutation } from "../service/api";
import { useAppSelector } from "../store/store";

export default function AuthenticatedLayout() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const navigation = useNavigate();
  const [logoutUser] = useLogoutMutation();

  
  const handleMenu: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget); 
  };
  
  
  const handleClose = (route?:"profile" | "logout" | "allUsers") => {
    return () => {
      if (route) {
        if (route === "logout") {
          logoutUser();
        } else {
          navigation("/" + route);
        }
      }
      setAnchorEl(null);
    };
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigation("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex-grow">
      {/* Header */}
      <header className="bg-black text-white py-3">
        <div className="flex items-center px-6">
          {/* Menu Button (disabled) */}
          <button className="bg-transparent border-none text-white" disabled>
            <FaBars size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex gap-2 items-center text-white text-xl ml-4">
            <h1>My Chat App</h1>
          </Link>

          {/* User Profile Icon (only if authenticated) */}
          {isAuthenticated && (
            <div className="ml-auto relative">
              <button
                className="bg-transparent border-none text-white"
                onClick={handleMenu}
                aria-haspopup="true"
              >
                <FaUserCircle size={24} />
              </button>
              {/* Menu */}
              {anchorEl && (
                <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md w-40 z-10">
                  <div
                    onClick={handleClose("profile")}
                    className="py-2 px-4 cursor-pointer text-black"
                  >
                    Profile
                  </div>
                  <div
                    onClick={handleClose("allUsers")}
                    className="py-2 px-4 cursor-pointer text-black"
                  >
                    Create Room
                  </div>
                  <div
                    onClick={handleClose("logout")}
                    className="py-2 px-4 cursor-pointer text-black"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      
      <Outlet />
    </div>
  );
}
