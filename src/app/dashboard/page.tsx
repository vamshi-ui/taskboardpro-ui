"use client";

import { Calendar } from "primereact/calendar";
import { useContext, useEffect, useState } from "react";
import Categories from "../layout/Categories";
import TaskList from "../layout/TaskList";
import Tracking from "../layout/Tracking";
import GlobalContext, { useApi } from "../hooks/GlobalContext";
import { API_CONST } from "../constants/api.constant";
import TagsPage from "../layout/TagsPage";
import ViewTaskDialog from "../layout/ViewTaskDialog";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const { isTaskUpdated, setIsTaskUpdated }: any = useContext(GlobalContext);
  const [date, setDate]: any = useState(null);
  const [taskRes, setTaskRes]: any = useState(null);
  const [isViewTask, setIsViewTask]: any = useState(false);
  const [month, setMonth] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [taskList, setTaskList] = useState([]);
  const { commonApiCall, toastRef } = useApi();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/login") return;

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth-key="))
      ?.split("=")[1];
    if (token) {
      const decoded : any= jwtDecode(token);
      if (!decoded.isEmailVerified || !decoded.isActive) {
        router.push("/login?unauthorized=true");
      }
    } else {
      router.push("/login?unauthorized=true");
    }
  }, [router, pathname]);

  const dateTemplate = (date: any) => {
    const hasEvent = taskList.find(
      (data: any) =>
        new Date(data.dueDate).getDate() == date.day &&
        new Date(data.dueDate).getMonth() == date.month
    );

    return (
      <div className="relative flex flex-col items-center">
        <span>{date.day}</span>
        {hasEvent && (
          <span className="w-2 h-2 mt-1 bg-green-500 rounded-full"></span>
        )}
      </div>
    );
  };

  async function getRecentTasks(payload: any) {
    const res = await commonApiCall({
      endPoint: API_CONST.GET_RECENT_TASKS,
      params: {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    });
    return res;
  }

  useEffect(() => {
    if (isTaskUpdated) {
      getRecentTasks({
        month: date ? new Date(date).getMonth() : new Date().getMonth(),
        year: date ? new Date(date).getFullYear() : new Date().getFullYear(),
      }).then((res) => {
        setTaskList(res.result);
      });
      setIsTaskUpdated(false);
    }
  }, [isTaskUpdated]);

  useEffect(() => {
    getRecentTasks(month).then((res) => {
      setTaskList(res.result);
    });
  }, [month]);

  useEffect(() => {
    if (date) {
      getRecentTasks({ date:format(new Date(date), 'yyyy-MM-dd') }).then((res) => {
        setTaskRes(res.result);
        setIsViewTask(true);
      });
    }
  }, [date]);

  function resetData() {
    setIsViewTask(false);
    setTaskRes(null);
  }

  return (
    <>
      {/* Main content area */}
      <div className="flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Calendar */}
          <Calendar
            inline
            value={date}
            onMonthChange={(e) =>
              setMonth({ month: e.month, year: e.year } as any)
            }
            onSelect={(e) => setDate(e.value as any)}
            dateTemplate={dateTemplate}
          />

          {/* Task list */}
          <TaskList />

          {/* Categories */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 ">
            <Categories />
          </div>
          {/* Tracking */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 relative">
            <Tracking />
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-amber-400 opacity-50">
              <span className="text-black font-bold text-lg">
                Coming Soon...
              </span>
            </div>
          </div>

          {/* TagsPage */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 ">
            <TagsPage />
          </div>

          {/* Widget section */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 flex items-center justify-center">
            <button className="flex flex-col items-center text-gray-500 hover:text-gray-700 transition-colors">
              <span className="text-2xl mb-2">+</span>
              <span>Add widget</span>
            </button>
          </div>
        </div>
      </div>

      {isViewTask && (
        <ViewTaskDialog
        header={`Tasks of selected date ${format(new Date(date), "dd MMM yyyy, hh:mm a")}`}
          taskRes={taskRes}
          visible={isViewTask}
          resetData={resetData}
        />
      )}
    </>
  );
}
