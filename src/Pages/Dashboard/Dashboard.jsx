import React from "react";

import "./Dashboard.css"; // Make sure to create this CSS file for styling
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className="flex fixed">
        <Sidebar />
        <div className="dashboardTopBar">
          <div className="dashboardTopTitle">
            <h6>
              <span>
                Hey <b>Admin</b> ,
              </span>{" "}
              Welcome to AAA - SWITCHGEAR Admin Panel
            </h6>
          </div>
        </div>

        <div className="flex items-center justify-center mt-16">
          {/* <img className="w-[300px]" src={progress} alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
