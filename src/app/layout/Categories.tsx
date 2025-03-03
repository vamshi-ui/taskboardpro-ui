import { MoreVertical, Briefcase } from "lucide-react";
import { Button } from "primereact/button";
import { useApi } from "../hooks/GlobalContext";
import { useEffect, useState } from "react";
import Modal from "./CommonModal";
import { API_CONST } from "../constants/api.constant";
import { ConfirmDialog } from "primereact/confirmdialog";
import { DataView } from "primereact/dataview";

const Categories = () => {
  const { commonApiCall, toastRef } = useApi();
  const [categoryRes, setCategoryList] = useState({
    message: '',
    result: [],
    totalRecords: 0,
    offset: 0,
  });  
  const [isModalOpen, setModalOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentCategory, setCurrentCategory]: any = useState(null);

  const handleEdit = (category: any) => {
    setCurrentCategory({ ...category, name: category.categoryName });
    setModalOpen(true);
  };

  const handleDelete = (category: any) => {
    setCurrentCategory(category);
    setVisible(true);
  };

  const handleAdd = () => {
    setCurrentCategory(null);
    setModalOpen(true);
  };

  const handleSubmit = async (data: any) => {
    try {
      const payload = { ...data, id: currentCategory?._id };
      const res = await submit(payload);

      toastRef.show({
        severity: "success",
        summary: "Success",
        detail: res.message,
      });
      getCategoriesList({ limit: 4, offset: 0 });
      setModalOpen(false);
    } catch (error: any) {
      toastRef.show({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong!",
      });
    }
  };

  async function submit(payload: any) {
    const res = await commonApiCall({
      endPoint: currentCategory
        ? API_CONST.UPDATE_CATEGORY
        : API_CONST.INSERT_CATEGORY,
      params: {
        method: currentCategory ? "PUT" : "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    });
    return res;
  }

  async function accept() {
    try {
      const res = await commonApiCall({
        endPoint: `${API_CONST.DELETE_CATEGORY}/${currentCategory?._id}`,
        params: {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      });
      toastRef.show({
        severity: "success",
        summary: "Success",
        detail: res.message,
      });
      getCategoriesList({ limit: 4, offset: 0 });
    } catch (error: any) {
      toastRef.show({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong!",
      });
    } finally {
      setVisible(false);
    }
  }

  async function getCategoriesList(payload: any) {
    const res = await commonApiCall({
      endPoint: API_CONST.GET_CATEGORY,
      params: {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    });
    setCategoryList(res || { message: '', result: [], totalRecords: 0, offset: 0 });

  }

  useEffect(() => {
    getCategoriesList({ limit: 4, offset: 0 });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">My categories</h3>
        <button className="p-1 rounded-full hover:bg-gray-100">
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="space-y-4">
        <DataView
          value={categoryRes?.result}
          lazy={true}
          totalRecords={categoryRes?.totalRecords}
          onPage={(e) => {
            getCategoriesList({ limit: 4, offset: e.first });
          }}
          itemTemplate={(category) => (
            <Category
            key={category._id}
              category={category}
              handleEdit={(item: any) => handleEdit(item)}
              handleDelete={(item: any) => handleDelete(item)}
            />
          )}
          
          paginator
          rows={4}
          emptyMessage="No Records found."
          first={categoryRes?.offset}
        />

        <button
          onClick={handleAdd}
          className="w-full flex items-center cursor-pointer justify-center py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <span className="mr-1">+</span>
          <span>Add more</span>
        </button>
      </div>

      <ConfirmDialog
        group="declarative"
        visible={visible}
        onHide={() => setVisible(false)}
        message="Are you sure you want to delete ?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        reject={() => setVisible(false)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        header={currentCategory ? "Edit Category" : "Add Category"}
        initialData={currentCategory}
        placeholders={{
          name: "Category Name",
          description: "Category Description",
        }}
      />
    </div>
  );
};

const Category = ({ category, handleEdit, handleDelete }: any) => {
  return (
    <div
      key={category._id}
      className="flex items-center justify-between border-b border-gray-100 pb-3"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
          <Briefcase className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium">{category.categoryName}</span>
      </div>

      <div className="flex -space-x-2 gap-2">
        <Button
          icon="pi pi-pencil"
          onClick={() => handleEdit(category)}
          size="small"
          rounded
          text
          raised
        />
        <Button
          icon="pi pi-trash"
          size="small"
          onClick={() => handleDelete(category)}
          className="p-button-danger"
          rounded
          text
          raised
        />
      </div>
    </div>
  );
};

export default Categories;
