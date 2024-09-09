import React from "react";
import { Link } from "react-router-dom";
import { UserGroupIcon } from "@heroicons/react/24/solid";

function Sidebar() {
  return (
    <div className="bg-[#fa2929] text-white w-46 p-4 flex flex-col h-screen fixed">
      <Link
        to="/dashboard/addCustomer"
        className="text-white no-underline mb-4 flex items-center hover:bg-[#d61f1f] p-2 rounded"
      >
        <UserGroupIcon className="h-6 w-6 mr-2" /> Add Customer
      </Link>
      <Link
        to="/dashboard/addEngineer"
        className="text-white no-underline mb-4 flex items-center hover:bg-[#d61f1f] p-2 rounded"
      >
        <UserGroupIcon className="h-6 w-6 mr-2" /> Add Engineer
      </Link>
    </div>
  );
}

export default Sidebar;
