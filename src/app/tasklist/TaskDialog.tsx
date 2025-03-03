import React from "react";
import {
  Calendar,
  Clock,
  Tag,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import { Task } from "../types/task";
import { Badge } from "primereact/badge";
import { formatDistanceToNow } from "date-fns";
import { Dialog } from "primereact/dialog";
import { Tag as PrimeTag } from "primereact/tag";

interface TaskDialogProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge value={priority} severity="danger"></Badge>;
    case "medium":
      return <Badge value={priority} severity="warning"></Badge>;
    case "low":
      return <Badge value={priority} severity="info"></Badge>;
    default:
      return <Badge value={priority} severity="secondary"></Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <PrimeTag
          value={status}
          icon={<AlertCircle className="w-3 h-3 mr-1" />}
        ></PrimeTag>
      );
    case "in-progress":
      return (
        <PrimeTag
          value={status}
          severity="info"
          icon={<Clock className="w-3 h-3 mr-1" />}
        ></PrimeTag>
      );
    case "completed":
      return (
        <PrimeTag
          value={status}
          severity="success"
          icon={<CheckCircle className="w-3 h-3 mr-1" />}
        ></PrimeTag>
      );
    default:
      return (
        <PrimeTag
          value={status}
          icon={<AlertCircle className="w-3 h-3 mr-1" />}
        ></PrimeTag>
      );
  }
};

const TaskDialog: React.FC<TaskDialogProps> = ({ task, isOpen, onClose }) => {
  if (!task) return null;

  const formattedDueDate = new Date(task.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeAgo = formatDistanceToNow(new Date(task.createdAt), {
    addSuffix: true,
  });

  return (
    <Dialog
      header={task.taskName}
      visible={isOpen}
      style={{ width: "95vw" }}
      onHide={() => {
        if (!isOpen) return;
        onClose();
      }}
    >
      <div className="space-y-6 mt-4">
        {/* Status and priority section */}
        <div className="flex flex-wrap gap-2 items-center">
          {getStatusBadge(task.status)}
          {getPriorityBadge(task.priority)}
          <div className="flex items-center text-sm text-gray-500 ml-auto">
            <Clock className="h-4 w-4 mr-1" />
            Created {timeAgo}
          </div>
        </div>

        {/* Description */}
        <div className="bg-amber-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-amber-900 mb-2">
            Description
          </h3>
          <p className="text-gray-700">{task.description}</p>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Due Date */}
          <div className="bg-amber-50 p-3 rounded-lg">
            <div className="flex items-center text-sm font-medium text-amber-900 mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              Due Date
            </div>
            <p className="text-gray-700">{formattedDueDate}</p>
          </div>

          {/* Assigned To */}
          <div className="bg-amber-50 p-3 rounded-lg">
            <div className="flex items-center text-sm font-medium text-amber-900 mb-2">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Assigned To
            </div>
            <p className="text-gray-700">
              {task.userId.firstName} {task.userId.lastName}
            </p>
            <p className="text-xs text-gray-500">{task.userId.emailId}</p>
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-sm font-medium text-amber-900 mb-2 flex items-center">
            <Tag className="h-4 w-4 mr-2" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {task.tags.map((tag) => (
              <PrimeTag key={tag._id} value={tag.tagName}></PrimeTag>
            ))}
          </div>
        </div>

        {/* Metadata */}
        <div className="border-t border-amber-100 pt-4 text-xs text-gray-500">
          <p>Last updated: {new Date(task.updatedAt).toLocaleString()}</p>
          <p>Task ID: {task._id}</p>
        </div>
      </div>
    </Dialog>
  );
};

export default TaskDialog;
