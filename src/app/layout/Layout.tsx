"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import { Toast } from "primereact/toast";
import CustomLoader from "./CustomLoader";
import GlobalContext from "../hooks/GlobalContext";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTaskUpdated, setIsTaskUpdated] = useState(false);
  const [taskConfig, setTaskConfig] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("/");
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const pathname = usePathname();
  const noLayoutRoutes = ["/login", "/signup"];
  const shouldShowLayout = !noLayoutRoutes.includes(pathname);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarOpen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const handleMainContentClick = () => {
    if (isMobile && sidebarOpen) setSidebarOpen(false);
  };
  const toast: any = useRef(null);
  return (
    <div className="relative">
      <GlobalContext.Provider
        value={{
          toast,
          setisLoading,
          taskConfig,
          setTaskConfig,
          isTaskUpdated,
          setIsTaskUpdated,
        }}
      >
        <Toast ref={toast} />
        {shouldShowLayout ? (
          <div className="flex h-screen bg-gray-50 overflow-hidden">
            {isMobile && sidebarOpen && (
              <div
                className="fixed inset-0 bg-gray-900 bg-opacity-50 z-10"
                onClick={toggleSidebar}
              ></div>
            )}
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              activePage={activePage}
              setActivePage={setActivePage}
              isMobile={isMobile}
            />

            <div
              className="flex-1 flex flex-col w-full transition-all duration-300"
              onClick={handleMainContentClick}
            >
              <Header toggleSidebar={toggleSidebar} isMobile={isMobile} />

              <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">{children}</div>
              </main>
            </div>
          </div>
        ) : (
          <>
            <div>{children}</div>
          </>
        )}
        {isLoading && <CustomLoader />}
      </GlobalContext.Provider>
    </div>
  );
}
