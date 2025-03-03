"use client";

import { Calendar } from "primereact/calendar";
import { useContext, useEffect, useState } from "react";
import Categories from "../layout/Categories";
import TaskList from "../layout/TaskList";
import Tracking from "../layout/Tracking";
import GlobalContext, { useApi } from "../hooks/GlobalContext";
import { API_CONST } from "../constants/api.constant";
import TagsPage from "../layout/TagsPage";

export default function Dashboard() {
  const { isTaskUpdated, setIsTaskUpdated }: any = useContext(GlobalContext);
  const [date, setDate]: any = useState(null);
  const [month, setMonth] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [taskList, setTaskList] = useState([]);
  const { commonApiCall, toastRef } = useApi();

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
      getRecentTasks({ date: new Date(date).toISOString() }).then((res) => {
        // setTaskList(res.result);
      });
    }
  }, [date]);

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
    </>
  );
}
