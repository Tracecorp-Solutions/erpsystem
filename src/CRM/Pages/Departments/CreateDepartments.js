import React, { useState, useEffect } from "react";
import { Modal, message, Input, Button, Select } from "antd";
import axios from "axios";

function CreateDepartments({
  isUpdateModalVisible,
  handleCloseModalVisible,
}) {
  const [departmentData, setDepartmentData] = useState({
    name: "",
    description: "",
    headDepactId: "", // Updated to store selected headDepactId
  });

  const [users, setUsers] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://3.216.182.63:8095/TestApi/GetAllUsers"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData({ ...departmentData, [name]: value });
  };

  const handleHeadDepactIdChange = (value) => {
    setDepartmentData({ ...departmentData, headDepactId: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://3.216.182.63:8095/TestApi/AddDepartments",
        departmentData
      );
      message.success("Department added successfully");
      handleCloseModalVisible();
      // Optionally, you can refresh the department list in the parent component
    } catch (error) {
      console.error("Error adding department:", error);
      message.error("Failed to add department");
    }
  };

  return (
    <Modal visible={isUpdateModalVisible} closable={false} footer={null}>
      <div className="flex flex-col justify-center items-center pt-8 text-base leading-6 bg-white rounded-3xl max-w-[820px]">
        <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full">
          New Department
        </div>
        <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full">
          Department Name
        </div>
        <Input
          name="name"
          value={departmentData.name}
          onChange={handleChange}
          className="justify-center items-start px-4 py-4 mt-2 max-w-full bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:pr-5"
          placeholder="Enter Department Name"
        />
        <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full">
          Description
        </div>
        <Input.TextArea
          name="description"
          value={departmentData.description}
          onChange={handleChange}
          className="justify-center p-4 mt-2 max-w-full leading-7 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:max-w-full"
          placeholder="Describe the department ..."
          rows={4}
        />
        <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full">
          Assign head of department
        </div>
        <Select
          placeholder="Select head of department"
          onChange={handleHeadDepactIdChange}
          className="w-[500px] max-md:max-w-full"
        >
          {users.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        </Select>
        <div className="flex justify-center items-center self-stretch px-16 py-6 mt-32 w-full bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <Button
            className="justify-center items-center px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
            onClick={handleCloseModalVisible}
          >
            Cancel
          </Button>
          <Button
            className="justify-center px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5"
            onClick={handleSubmit}
          >
            Add Department
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CreateDepartments;
