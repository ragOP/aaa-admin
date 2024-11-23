import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Header from "../../components/Header";
import CustomVerticalTabs from "../../components/CustomVerticalTabs";
import {
  ExclamationCircleIcon,
  Squares2X2Icon,
  UserGroupIcon,
  FolderOpenIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  CalendarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentMenu, setCurrentMenu] = useState("general");

  const mapUrls = {
    dashboard: "/admin/dashboard",
    complaints: "/admin/complaints",
    customers: "/admin/customers",
    projects: "/admin/projects",
    technicians: "/admin/technicians",
    warranty: "/admin/warranty",
    amc: "/admin/amc",
    reports: "/admin/reports",
  };

  const onClickMenu = (value, access) => {
    navigate(mapUrls?.[value]);
  };

  function getPlatformFromUrl(url) {
    const validPlatforms = [
      "dashboard",
      "complaints",
      "customers",
      "projects",
      "technicians",
      "warranty",
      "amc",
      "reports",
    ];
    const pathSegments = url.pathname.split("/").filter(Boolean);

    let platform = "";
    if (pathSegments.length > 1 && validPlatforms.includes(pathSegments[1])) {
      platform = pathSegments[1];
    }
    return platform;
  }

  useEffect(() => {
    const platform = getPlatformFromUrl(location);
    if (platform === "") {
      setCurrentMenu("general");
    } else {
      setCurrentMenu(platform || "");
    }
  }, [location.pathname]);

  const menuLists = [
    {
      value: "dashboard",
      label: "Dashboard",
      access: true,
      icon: <Squares2X2Icon className="h-5 w-5 text-gray-600" />,
    },
    {
      value: "complaints",
      label: "Complaints",
      access: true,
      icon: <ExclamationCircleIcon className="h-5 w-5 text-gray-600" />,
    },
    {
      value: "customers",
      label: "Customers",
      access: true,
      icon: <UserGroupIcon className="h-5 w-5 text-gray-600" />,
    },
    {
      value: "projects",
      label: "Projects",
      access: true,
      icon: <FolderOpenIcon className="h-5 w-5 text-gray-600" />,
    },
    {
      value: "technicians",
      label: "Technicians",
      access: true,
      icon: <WrenchScrewdriverIcon className="h-5 w-5 text-gray-600" />,
    },
    {
      value: "warranty",
      label: "Warranty",
      access: true,
      icon: <ShieldCheckIcon className="h-5 w-5 text-gray-600" />,
    },
    {
      value: "amc",
      label: "AMC",
      access: true,
      icon: <CalendarIcon className="h-5 w-5 text-gray-600" />,
    },
    {
      value: "reports",
      label: "Reports",
      access: true,
      icon: <ChartBarIcon className="h-5 w-5 text-gray-600" />,
    },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <div className="min-w-[15rem] w-fit min-h-screen border-r border-gray-200">
        <CustomVerticalTabs
          currentMenu={currentMenu}
          menuLists={menuLists}
          onClick={onClickMenu}
          title="AAA"
          boxSx={{
            minWidth: "100%",
            width: "fit-content",
            minHeight: "100vh",
          }}
          titleBoxSx={{
            fontWeight: 600,
            fontSize: "1.5rem",
            padding: "1.5rem 3rem 1.5rem 1rem",
            borderBottom: `none`,
          }}
          listSx={{
            padding: "0 1rem 0rem 1rem",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header - Fixed on top */}
        <div className="sticky top-0 z-10">
          <Header />
        </div>

        {/* Main content container - scrollable */}
        <div className="flex-1 overflow-auto bg-slate-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
