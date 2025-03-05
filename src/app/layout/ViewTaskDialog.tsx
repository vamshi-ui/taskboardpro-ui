"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { Task } from "../types/task";
import { Badge } from "primereact/badge";
import { DataView } from "primereact/dataview";
import TaskDialog from "../tasklist/TaskDialog";
import { Dialog } from "primereact/dialog";

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
      </div>
    </div>
    <DueDate date={task.dueDate} />
    <TaskTags tags={task.tags} />
  </div>
);

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

const ViewTaskDialog: React.FC<{
  taskRes: any[];
  visible: boolean;
  resetData: () => void;
  header: string
}> = ({
  taskRes,
  visible,
  resetData,
  header
}: {
  taskRes: any[];
  visible: boolean;
  resetData: () => void;
  header: string
}) => {
  const [selectedTask, setSelectedTask]: any = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setSelectedTask(null);
    setIsDialogOpen(false);
  }, []);

  return (
    <Dialog
      header={header}
      visible={visible}
      style={{ width: "95vw" }}
      onHide={resetData}
    >
      <div className="card">
        <div className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden">
          <TaskHeader taskCount={taskRes.length} />
          <div className="text-center my-2">
            <DataView
              value={taskRes}
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
            />
          </div>
        </div>

        <TaskDialog
          task={selectedTask}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </Dialog>
  );
};

export default ViewTaskDialog;
