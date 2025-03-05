import React from "react";
import {
  Home,
  CheckSquare,
  Calendar,
  Users,
  Settings,
  X,
  LogOut,
  LayoutDashboardIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApi } from "../hooks/GlobalContext";
import { API_CONST } from "../constants/api.constant";
import { usePathname } from "next/navigation";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  isMobile,
}) => {
  const { commonApiCall, toastRef } = useApi();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const route = useRouter();
  
  function logOut() {
    commonApiCall({
      endPoint: API_CONST.LOG_OUT,
      params: {
        method: "GET",
        credentials: "include",
      },
    }).then((data) => {
      localStorage.clear();
      toastRef.show({
        severity: "success",
        summary: "success",
        detail: data.message,
      });
      route.push("/login");
    });
  }

  return (
    <div
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } 
      ${sidebarOpen ? "md:w-64" : "md:w-20"} 
      w-64 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out 
      flex flex-col h-full fixed md:relative top-0 z-20`}
    >
      <div
        className={`flex items-center ${
          sidebarOpen ? "justify-between" : "justify-center"
        } p-4 border-b border-gray-200`}
      >
        {(sidebarOpen || !isMobile) && (
          <div className="flex items-center gap-3">
            <div
              onClick={() => !sidebarOpen && toggleSidebar()}
              className="w-10 h-10 rounded-lg cursor-pointer bg-amber-500 flex items-center justify-center text-amber-900 font-bold shadow-sm"
            >
              TB
            </div>
            {sidebarOpen && (
              <h2 className="text-xl font-bold text-gray-800 tracking-tight">
                TaskBoard Pro
              </h2>
            )}
          </div>
        )}
        {sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="text-gray-500 cursor-pointer hover:text-gray-700 focus:outline-none"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="flex-grow overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {[
            { name: "Home", icon: Home, url: "/" },
            { name: "Dashboard", icon: LayoutDashboardIcon, url: "/dashboard" },
            { name: "My Tasks", icon: CheckSquare, url: "/tasklist" },
            { name: "Notifications", icon: Calendar, url: "/notifications" },
            { name: "My Info", icon: Users, url: "/userinfo" },
          ].map((item) => (
            <Link href={item.url} key={item.url}>
              <button
                onClick={() => {
                  if (isMobile) setSidebarOpen(false);
                }}
                className={`${
                  usePathname() === item.url
                    ? "bg-amber-50 text-amber-800"
                    : "text-gray-600 hover:bg-gray-100"
                } group flex items-center ${
                  sidebarOpen
                    ? "px-3 py-3 text-sm font-medium w-full"
                    : "p-3 justify-center w-full"
                } rounded-lg transition-all cursor-pointer`}
              >
                <item.icon
                  className={`${
                    usePathname() === item.url
                      ? "text-amber-600"
                      : "text-gray-500 group-hover:text-gray-600"
                  } ${sidebarOpen ? "mr-3" : ""} h-5 w-5 flex-shrink-0`}
                />
                {sidebarOpen && <span>{item.name}</span>}
              </button>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        {[
          { name: "Settings", icon: Settings, callBack: () => null },
          { name: "Logout", icon: LogOut, callBack: () => logOut() },
        ].map((item, index) => (
          <button
            onClick={item.callBack}
            key={index}
            className={`${
              sidebarOpen
                ? "px-3 py-2 text-sm font-medium w-full"
                : "p-3 justify-center w-full"
            } text-gray-600 hover:bg-gray-100 rounded-lg transition-all flex items-center ${
              sidebarOpen ? "" : "justify-center"
            } mb-1  cursor-pointer`}
          >
            <item.icon className={`h-5 w-5 ${sidebarOpen ? "mr-3" : ""}`} />
            {sidebarOpen && <span>{item.name}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
