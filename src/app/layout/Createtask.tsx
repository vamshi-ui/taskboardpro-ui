import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { useContext, useEffect, useState } from "react";
import GlobalContext, { useApi } from "../hooks/GlobalContext";
import {
  API_CONST,
  priority_const,
  status_const,
} from "../constants/api.constant";

interface IForm {
  taskName: string;
  dueDate: any;
  priority: string;
  tags: any[];
  description: string;
  status: string;
  category: string;
}

export function Createtask({
  visible,
  setVisible,
  onClose,
  isMobile,
  editTask,
}: {
  visible: boolean;
  isMobile: boolean;
  setVisible: (visible: boolean) => void;
  onClose: () => void;
  editTask?: IForm | null;
}) {
  const statusList = status_const;
  const priorityList = priority_const;
  const { isTaskUpdated, setIsTaskUpdated }: any = useContext(GlobalContext);
  const { commonApiCall, toastRef } = useApi();

  const initialFormValues: IForm = {
    taskName: "",
    dueDate: new Date(),
    priority: "medium",
    tags: [],
    description: "",
    status: "pending",
    category: "",
  };

  const [formValues, setFormValues] = useState<IForm>(
    editTask || initialFormValues
  );
  const [tagList, setTagList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tags, categories] = await Promise.all([
          getTagList(),
          getCategoryList(),
        ]);
        setTagList(tags.result);
        setCategoryList(categories.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [visible]);

  useEffect(() => {
    if (editTask) {
      setFormValues({
        ...editTask,
        tags: editTask.tags.map((data: any) => data._id),
        dueDate: new Date(editTask.dueDate),
      });
    }
  }, [editTask]);

  async function getTagList() {
    const res = await commonApiCall({
      endPoint: API_CONST.GET_TAG,
      params: {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    });
    return res;
  }

  async function getCategoryList() {
    const res = await commonApiCall({
      endPoint: API_CONST.GET_CATEGORY,
      params: {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    });
    return res;
  }

  async function saveTask(payload: any) {
    const endPoint = editTask ? API_CONST.UPDATE_TASK : API_CONST.INSERT_TASKS;
    const method = editTask ? "PUT" : "POST";
    const res = await commonApiCall({
      endPoint,
      params: {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    });
    return res;
  }

  function resetForm() {
    setFormValues(initialFormValues);
    setVisible(false);
    setIsTaskUpdated(true);
    onClose();
  }

  function submit() {
    saveTask(formValues).then((data) => {
      toastRef.show({
        severity: "success",
        summary: "Success",
        detail: data.message,
      });
      resetForm();
    });
  }

  return (
    <Dialog
      header={editTask ? "Edit Task" : "Add New Task"}
      visible={visible}
      style={{ width: isMobile ? "95vw" : "75vw" }}
      onHide={resetForm}
      footer={footerContent(setVisible, submit, resetForm)}
    >
      <div className="mt-6">
        <FloatLabel className="w-full md:w-20rem">
          <InputText
            className="p-inputtext-sm w-full"
            placeholder="Name of Task"
            value={formValues.taskName}
            onChange={(e) =>
              setFormValues({ ...formValues, taskName: e.target.value })
            }
          />
          <label htmlFor="taskName">Name of Task</label>
        </FloatLabel>
      </div>
      <div className="grid md:grid-cols-2">
        <div className="mt-6  md:mr-2">
          <FloatLabel className="w-full md:w-20rem">
            <Calendar
              placeholder="Select due date"
              className="w-full"
              value={formValues.dueDate}
              onSelect={(e) =>
                setFormValues({ ...formValues, dueDate: e.value })
              }
              showIcon
              showButtonBar
            />
            <label htmlFor="date">Select Due Date</label>
          </FloatLabel>
        </div>
        <div className="mt-6">
          <FloatLabel className="w-full md:w-20rem">
            <Dropdown
              value={formValues.priority}
              onChange={(e) =>
                setFormValues({ ...formValues, priority: e.value })
              }
              options={priorityList}
              filter
              checkmark
              showClear
              placeholder="Select a City"
              className="w-full md:w-14rem "
            />
            <label htmlFor="priority">Set Priority</label>
          </FloatLabel>
        </div>
      </div>

      <div className="mt-6">
        <FloatLabel className="w-full md:w-20rem">
          <MultiSelect
            value={formValues.tags}
            onChange={(e) => setFormValues({ ...formValues, tags: e.value })}
            display="chip"
            filter
            options={tagList}
            optionLabel="tagName"
            showClear
            optionValue="_id"
            placeholder="Select Cities"
            maxSelectedLabels={3}
            className="w-full md:w-20rem"
          />
          <label htmlFor="tags">Select Tag</label>
        </FloatLabel>
      </div>

      <div className="grid md:grid-cols-2">
        <div className="mt-6 md:mr-2">
          <FloatLabel className="w-full md:w-20rem">
            <Dropdown
              value={formValues.status}
              onChange={(e) =>
                setFormValues({ ...formValues, status: e.value })
              }
              options={statusList}
              filter
              checkmark
              showClear
              placeholder="Select a City"
              className="w-full md:w-14rem "
            />
            <label htmlFor="status">Set status</label>
          </FloatLabel>
        </div>
        <div className="mt-6 ">
          <FloatLabel className="w-full md:w-20rem">
            <Dropdown
              value={formValues.category}
              onChange={(e) =>
                setFormValues({ ...formValues, category: e.value })
              }
              options={categoryList}
              filter
              optionLabel="categoryName"
              checkmark
              showClear
              optionValue="_id"
              placeholder="Select a City"
              className="w-full md:w-14rem "
            />
            <label htmlFor="category">Select category</label>
          </FloatLabel>
        </div>
      </div>

      <div className="mt-4">
        <InputTextarea
          className="w-full"
          placeholder="Description"
          value={formValues.description}
          onChange={(e) =>
            setFormValues({ ...formValues, description: e.target.value })
          }
          rows={5}
          cols={30}
        />
      </div>
    </Dialog>
  );
}

const footerContent = (
  setVisible: (visible: boolean) => void,
  submit: () => void,
  resetForm: () => void
) => (
  <div className="py-2">
    <Button
      label="Close"
      icon="pi pi-times"
      onClick={resetForm}
      className="p-button-secondary py-2 px-4"
    />
    <Button label="Submit" icon="pi pi-check" onClick={submit} autoFocus />
  </div>
);
