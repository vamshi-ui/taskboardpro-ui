import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState, useEffect } from "react";

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  header,
  initialData = null,
  placeholders = { name: "Enter name", description: "Enter description" },
}: any) => {
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData(initialData);
    } else {
      resetForm();
    }
  }, [initialData, isOpen]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    onSubmit(formData);
  };

  const resetForm = () => {
    setFormData({ name: "", description: "" });
  };

  if (!isOpen) return null;

  return (
    <Dialog
      header={header}
      visible={isOpen}
      style={{ width: "95vw" }}
      onHide={() => {
        if (!isOpen) return;
        onClose();
      }}
      footer={footerContent(onClose, handleSubmit)}
    >
      <div className="mt-6">
        <FloatLabel className="w-full md:w-20rem">
          <InputText
            className="p-inputtext-sm w-full"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={placeholders.name}
          />
          <label htmlFor="taskName">{placeholders.name}</label>
        </FloatLabel>
      </div>
      <div className="mt-4">
        <InputTextarea
          className="w-full"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder={placeholders.description}
          rows={5}
          cols={30}
        />
      </div>
    </Dialog>
  );
};

const footerContent = (onClose: () => void, submit: () => void) => (
  <div className="py-2">
    <Button
      label="Close"
      icon="pi pi-times"
      onClick={() => onClose()}
      className="p-button-secondary py-2 px-4"
    />
    <Button
      label="Submit"
      icon="pi pi-check"
      onClick={() => submit()}
      autoFocus
    />
  </div>
);

export default Modal;


