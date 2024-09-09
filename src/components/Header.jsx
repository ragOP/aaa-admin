import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header
      className="bg-[#fa2929] text-white p-4 flex items-center justify-between h-[70px]  w-full "
      style={{
        position: "sticky",
        top: "0",
      }}
    >
      <h4 className="ml-4">
        <Link to="/dashboard" className="text-white no-underline">
          AAA-SWITCHGEAR
        </Link>{" "}
      </h4>
      <nav>
        <ul className="flex items-center gap-3">
          <button className="bg-[#fa2929] p-3 text-xl" onClick={handleLogout}>
            <ArrowRightEndOnRectangleIcon className="h-8 w-8 mr-5" />
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
