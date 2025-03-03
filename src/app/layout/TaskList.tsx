"use client";
import React, { useContext, useEffect, useState } from "react";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import GlobalContext, { useApi } from "../hooks/GlobalContext";
import { API_CONST, status_const } from "../constants/api.constant";
import { formatDistanceToNow } from "date-fns";
import TaskDialog from "../tasklist/TaskDialog";

const TaskList: React.FC = () => {
  const { isTaskUpdated, setIsTaskUpdated }: any = useContext(GlobalContext);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const statusList: string[] = status_const;
  const { commonApiCall, toastRef } = useApi();
  const [status, setStatus] = useState(null);
  const [recentTasks, setRecentTasks]: any[] = useState([]);
  const [checkBoxValue, setCheckBoxValue]: any[] = useState({});


  useEffect(() => {
    if (isTaskUpdated) {
      const payload = status ? { status } : {};
      getRecentTasks(payload).then((data) => {
        setRecentTasks(data.result);
      });
      setIsTaskUpdated(false);
    }
  }, [isTaskUpdated]);
  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
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

  async function updateTask(payload: any) {
    const res = await commonApiCall({
      endPoint: `${API_CONST.UPDATE_TASK}/${payload._id}`,
      params: {
        method: "PUT",
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
    const payload = status ? { status } : {};
    getRecentTasks(payload).then((data) => {
      setRecentTasks(data.result);
    });
  }, [status]);

  useEffect(() => {
    if (checkBoxValue._id) {
      updateTask({
        _id: checkBoxValue._id,
        status: checkBoxValue.status == "completed" ? "pending" : "completed",
      }).then((data) => {
        toastRef.show({
          severity: "success",
          summary: "success",
          detail: data.message,
        });
        getRecentTasks({}).then((res) => {
          setRecentTasks(res.result);
        });
      });
    }
  }, [checkBoxValue]);

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
        <h2 className="text-lg font-semibold text-gray-800">Recent Tasks(5)</h2>
        <div>
          <Dropdown
            options={statusList}
            filter
            value={status}
            onChange={(e) => setStatus(e.value)}
            checkmark
            showClear
            className="w-full  md:w-14rem "
            placeholder="Filter by Status"
          />
        </div>
      </div>

      <div className="space-y-3">
        {(recentTasks ?? []).map((task: any, index: number) => (
          <div
            key={index}
            onClick={() => handleTaskClick(task)}
            className="border cursor-pointer border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="flex items-start gap-3">
                <Checkbox
                  inputId={task._id}
                  name="status"
                  value={task}
                  onClick={(e)=>e.stopPropagation()}
                  onChange={(e) => setCheckBoxValue(e.value)}
                  checked={task.status === "completed"}
                />

                <div>
                  <p
                    className={
                      task.status === "completed"
                        ? "line-through opacity-70 font-medium text-gray-800"
                        : "font-medium text-gray-800"
                    }
                  >
                    {task.taskName.substring(0, 20) + "..."}
                  </p>
                  <p
                    className={
                      task.status === "completed"
                        ? "line-through opacity-70 text-xs text-gray-500"
                        : "text-xs text-gray-500"
                    }
                  >
                    {task.description.substring(0, 20) + "..."}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 ml-7 md:ml-0">
                <span className="text-xs text-gray-500">
                  {" "}
                  Due{" "}
                  {formatDistanceToNow(new Date(task.dueDate), {
                    addSuffix: true,
                  })}
                </span>
                <Tag
                  severity={
                    task.status === "completed"
                      ? "success"
                      : task.status === "in-Progress"
                      ? "info"
                      : "danger"
                  }
                  value={task.status}
                ></Tag>
              </div>
            </div>
          </div>
        ))}
      </div>
    {isDialogOpen && <TaskDialog
        task={selectedTask}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />}  
    </div>
  );
};

export default TaskList;
