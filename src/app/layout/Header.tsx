import React, { useRef, useState } from "react";
import { Search, Plus, Bell, ChevronDown, Menu, LogIn } from "lucide-react";
import { Createtask } from "./Createtask";
import Link from "next/link";
import { OverlayPanel } from "primereact/overlaypanel";
import { Menu as PrimeMenu } from "primereact/menu";
import { useRouter } from "next/navigation";
import { API_CONST } from "../constants/api.constant";
import { useApi } from "../hooks/GlobalContext";
interface HeaderProps {
  toggleSidebar: () => void;
  isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isMobile }) => {
  const op: any = useRef(null);
  const { commonApiCall, toastRef } = useApi();

  const route = useRouter();
  let items = [
    {
      label: "My Profile",
      icon: "pi pi-user",
      command: () => {
        route.push("/userinfo");
      },
    },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        logOut();
      },
    },
  ];

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

  function getCookie(cname: any) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  const [visible, setVisible] = useState(false);
  const userName = () => {
    const userData: string = localStorage.getItem("userData") as string;
    return JSON.parse(userData)?.userName || null;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm w-full">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile menu button - only visible on mobile */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Menu size={24} />
          </button>

          {/* TB logo that toggles sidebar on click */}
          {isMobile && (
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-amber-900 font-bold shadow-sm">
                TB
              </div>
            </div>
          )}
        </div>
        <div className="hidden md:block flex-grow max-w-xl px-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for tasks, categories, or tags"
              className="w-full bg-gray-50 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-300 border border-gray-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {getCookie("auth-key") && (
            <button
              onClick={() => setVisible(true)}
              className="bg-amber-500 cursor-pointer p-2 md:px-4 md:py-2 rounded-lg flex items-center gap-1 md:gap-2 transition-all text-sm font-medium shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Task</span>
            </button>
          )}

          <div className="flex items-center">
            {userName() ? (
              <button
                onClick={(e) => op.current.toggle(e)}
                className="flex items-center gap-1 md:gap-2 hover:bg-gray-100 p-1 md:p-2 rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-amber-900 font-bold shadow-sm">
                  {userName().substring(0, 1)}
                </div>
                <span className="hidden md:inline text-sm font-medium">
                  {userName().toLowerCase()}
                </span>
                <ChevronDown className="hidden md:block w-4 h-4 text-gray-500" />
              </button>
            ) : (
              <Link href="/login">
                <button className="bg-amber-500 cursor-pointer p-2 md:px-4 md:py-2 rounded-lg flex items-center gap-1 md:gap-2 transition-all text-sm font-medium shadow-sm">
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </button>
              </Link>
            )}
            <OverlayPanel ref={op}>
              <PrimeMenu model={items} />
            </OverlayPanel>
          </div>
        </div>
      </div>

      <div className="px-4 md:hidden py-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-50 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-300 border border-gray-200"
          />
        </div>
      </div>

      {visible && (
        <Createtask
          onClose={() => {
            setVisible(false);
          }}
          visible={visible}
          setVisible={setVisible}
          isMobile={isMobile}
        ></Createtask>
      )}
    </header>
  );
};

export default Header;
