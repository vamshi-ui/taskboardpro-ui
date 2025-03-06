"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowUpDown,
} from "lucide-react";
import { Task } from "../types/task";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import TaskDialog from "./TaskDialog";
import { DataView } from "primereact/dataview";
import GlobalContext, { useApi } from "../hooks/GlobalContext";
import { API_CONST } from "../constants/api.constant";
import { Createtask } from "../layout/Createtask";
import { ConfirmDialog } from "primereact/confirmdialog";
import { usePathname, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const StatusIcon = ({ status }: { status: string }) => {
  const iconMap = {
    pending: <AlertCircle className="h-4 w-4 text-amber-500" />,
    "in-progress": <Clock className="h-4 w-4 text-blue-500" />,
    completed: <CheckCircle className="h-4 w-4 text-green-500" />,
  };

  return iconMap[status as keyof typeof iconMap] || null;
};


const TaskHeader = ({ taskCount }: { taskCount: number }) => (
  <div className="bg-amber-50 p-3 flex justify-between items-center border-b border-amber-200">
    <h2 className="font-medium text-amber-800">Tasks ({taskCount})</h2>
  </div>
);

const TaskItem = ({
  task,
  onTaskClick,
}: {
  task: Task;
  onTaskClick: (task: Task) => void;
}) => (
  <div
    className="p-4 hover:bg-amber-50 transition-colors cursor-pointer"
    onClick={() => onTaskClick(task)}
  >
    <div className="flex items-start flex-col justify-between mb-2 md:flex-row">
      <div className="flex items-center">
        <StatusIcon status={task.status} />
        <h3 className="font-medium ml-2">{task.taskName}</h3>
      </div>
      <div className="flex items-center space-x-2">
        <Badge
          severity={
            task.priority === "high"
              ? "danger"
              : task.priority === "medium"
              ? "warning"
              : "success"
          }
          value={`${task.priority} priority`}
        />
        <ActionButtons task={task} />
      </div>
    </div>
    <DueDate date={task.dueDate} />
    <TaskTags tags={task.tags} />
  </div>
);

const ActionButtons = ({ task }: { task: Task }) => {
  const { taskConfig, setTaskConfig }: any = useContext(GlobalContext);
  return (
    <>
    <div className="mx-2">

      <Button
        onClick={(e) => {
          {
            e.stopPropagation(),
              setTaskConfig({ taskData: task, action: "edit" });
          }
        }}
        icon="pi pi-file-edit"
        className="h-8 w-8 p-button-primary"
        text
        raised
      />
    </div>

      <Button
        onClick={(e) => {
          e.stopPropagation(),
            setTaskConfig({ taskData: task, action: "delete" });
        }}
        icon="pi pi-trash"
        text
        raised
        className="h-8 w-8 p-button-danger"
      />
    </>
  );
};

const DueDate = ({ date }: { date: string }) => (
  <div className="text-sm text-gray-500 flex items-center mb-3">
    <Calendar className="h-3 w-3 mr-1" />
    <span>Due: {new Date(date).toLocaleDateString()}</span>
  </div>
);

const TaskTags = ({ tags }: { tags: any[] }) => (
  <div className="flex flex-wrap gap-1">
    {tags.slice(0, 2).map((tag) => (
      <Badge severity="contrast" value={tag.tagName} key={tag._id} />
    ))}
    {tags.length > 2 && (
      <Badge severity="contrast" value={`+ ${tags.length - 2}`} />
    )}
  </div>
);

const Tasks: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { isTaskUpdated, setIsTaskUpdated }: any = useContext(GlobalContext);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const { taskConfig, setTaskConfig }: any = useContext(GlobalContext);
  const { commonApiCall } = useApi();
  const [selectedTask, setSelectedTask]: any = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [taskRes, setTaskRes] = useState<{
    totalPages: number;
    message: string;
    result: Task[];
    offset: number;
    totalTasks: number;
  }>({
    offset: 0,
    message: "",
    result: [],
    totalPages: 0,
    totalTasks: 0,
  });

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

  const fetchTasks = async (payload: any) => {
    try {
      const res = await commonApiCall({
        endPoint: API_CONST.GET_RECENT_TASKS,
        params: {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      });
      return res;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return {
        offset: 0,
        message: "",
        result: [],
        totalPages: 0,
        totalTasks: 0,
      };
    }
  };

  const deleteTask = async (id: any) => {
    try {
      const res = await commonApiCall({
        endPoint: `${API_CONST.DELETE_TASK}/${id}`,
        params: {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      });
      return res;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return {};
    }
  };

  const fetchTaskAsync = async (payload: any) => {
    const res: any = await fetchTasks(payload);
    setTaskRes(res);
  };

  useEffect(() => {
    setTaskConfig(null);
    setVisible(false);
    setSelectedTask(null);
    setConfirmVisible(false);
    setIsDialogOpen(false);
    fetchTaskAsync({ limit: 2 });
  }, []);

  useEffect(() => {
    if (taskConfig) {
      console.log(taskConfig);

      if (taskConfig.action == "edit") {
        setSelectedTask(JSON.parse(JSON.stringify(taskConfig.taskData)));
        setVisible(true);
      } else if (taskConfig.action == "delete") {
        setSelectedTask(JSON.parse(JSON.stringify(taskConfig.taskData)));
        setConfirmVisible(true);
      }
    }
  }, [taskConfig]);

  const accept = async () => {
    try {
      const res = await deleteTask(taskConfig.taskData._id);
      await fetchTaskAsync({ limit: 2, offset: 0 });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isTaskUpdated) {
      fetchTaskAsync({ limit: 2, offset: 0 });
      setIsTaskUpdated(false);
    }
  }, [isTaskUpdated]);

  // const filteredTasks = filterStatus
  //   ? taskRes.result.filter((task) => task.status === filterStatus)
  //   : taskRes.result;

  return (
    <div className="card">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-amber-800 mb-2">Task Board</h1>
        <p className="text-gray-600">Manage and track your tasks efficiently</p>
      </header>

      {/* <TaskFilters
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      /> */}

      <div className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden">
        <TaskHeader taskCount={taskRes.result.length} />
        <div className="text-center my-2">
          <DataView
            lazy={true}
            totalRecords={taskRes.totalTasks}
            onPage={(e) => {
              fetchTaskAsync({ limit: 2, offset: e.first }), console.log(e);
            }}
            value={taskRes.result}
            listTemplate={(items) =>
              items.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onTaskClick={(task) => {
                    setSelectedTask(JSON.parse(JSON.stringify(task))),
                      setIsDialogOpen(true);
                  }}
                />
              ))
            }
            paginator
            rows={2}
            emptyMessage="No Records found."
            first={taskRes.offset}
          />
        </div>
      </div>

      <TaskDialog
        task={selectedTask}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />

      <ConfirmDialog
        group="declarative"
        visible={confirmVisible}
        onHide={() => setConfirmVisible(false)}
        message="Are you sure you want to delete ?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={() => accept()}
        reject={() => setConfirmVisible(false)}
      />

      {visible && (
        <Createtask
          visible={visible}
          setVisible={setVisible}
          onClose={() => {
            fetchTaskAsync({ limit: 2, offset: 0 }),
              setVisible(false),
              setTaskConfig(null);
          }}
          isMobile={true}
          editTask={selectedTask}
        ></Createtask>
      )}
    </div>
  );
};

export default Tasks;
