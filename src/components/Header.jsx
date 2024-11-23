import {
  ArrowLeftEndOnRectangleIcon,
  BellIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white border-b p-4 flex items-center justify-between w-full overflow-hidden">
      <div className="flex items-center">
        <h4 className="text-lg  text-gray-800 font-semibold whitespace-nowrap">
         Good Morning !
        </h4>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="p-2  mb-0  rounded-full bg-slate-100 hover:bg-gray-200 "
          aria-label="Notifications"
        >
          <BellIcon className="h-6 w-6 text-black" />
        </button>

        {/* Logout Icon */}
        <button
          onClick={handleLogout}
          className="p-2 mb-0 rounded-full bg-slate-100 hover:bg-gray-200 focus:outline-none focus:ring"
          aria-label="Logout"
        >
          <ArrowLeftEndOnRectangleIcon className="h-6 w-6 text-black" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="p-2 mb-0  rounded-full bg-slate-100 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300"
            aria-label="Logout"
          >
            <UserIcon className="h-6 w-6 text-black" />
          </button>
          <h5 className="text-md font-medium text-gray-800">Rahul</h5>
        </div>
      </div>
    </header>
  );
};

export default Header;
