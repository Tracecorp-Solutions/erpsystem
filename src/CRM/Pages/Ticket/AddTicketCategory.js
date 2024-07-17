import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Select, message } from "antd";
import axios from "axios";

const { Option } = Select;

const AddTicketCategory = ({ isModalVisible, handleCancel }) => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAllDepartments`
      );
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleSaveCategory = async () => {
    const formData = {
      name: name,
      departmentId: selectedDepartment,
      description: description,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/AddTicketCategory`,
        formData
      );
      message.success("Category saved successfully");
      handleCancel();
    } catch (error) {
      message.error("Error saving category:", error);
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      closable={false}
      footer={null}
      width={700}
      bodyStyle={{ padding: 0 }}
    >
      <div className="flex flex-col justify-center items-center pt-8 text-base leading-6 bg-white rounded-3xl w-full">
        <div className="flex w-full justify-between">
          <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full">
            New Ticket Category
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ca01bd141ef3c6838d235f4d5f39236da6fb968e5e8a926fc57ed376a1cf296?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
            className="z-10 self-end w-8 aspect-square max-md:mr-2.5 cursor-pointer"
            onClick={handleCancel}
            alt="Close modal"
          />
        </div>
        <div className="mt-4 w-[500px] text-start font-semibold text-neutral-600 max-md:max-w-full">
          Category Name
        </div>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="justify-start items-start px-4 py-4 mt-2 max-w-full bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:pr-5"
          placeholder="Enter Category Name"
        />
        <div className="mt-4 w-[500px] text-start font-semibold text-neutral-600 max-md:max-w-full">
          Department
        </div>
        <Select
          value={selectedDepartment}
          onChange={(value) => setSelectedDepartment(value)}
          className="mt-2 w-[500px] max-w-full max-md:max-w-full h-14"
          placeholder="Select Department"
        >
          {departments.map((dept) => (
            <Option key={dept.id} value={dept.id}>
              {dept.name}
            </Option>
          ))}
        </Select>
        <div className="mt-4 w-[500px] text-start font-semibold text-neutral-600 max-md:max-w-full">
          Description
        </div>
        <Input.TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="justify-start p-4 mt-2 max-w-full leading-7 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:max-w-full"
          placeholder="Describe the priority ..."
          rows={4}
        />
        <div className="self-stretch py-6 mt-20 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex justify-between max-w-full max-md:flex-wrap">
            <Button
              type="button"
              className="justify-center h-12 items-center px-8 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleSaveCategory}
              className="justify-center px-8 h-12 font-semibold rounded-3xl max-md:pr-7 bg-slate-500 max-md:pl-7"
            >
              Save Category
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddTicketCategory;
