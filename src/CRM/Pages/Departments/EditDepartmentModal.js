import React, { useState, useEffect } from "react";
import { Modal, message, Input, Button, Select } from "antd";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

function EditDepartmentModal({ isUpdateModalVisible, handleCloseModalVisible, editingDepartment, fetchDepartments }) {
  const [departmentData, setDepartmentData] = useState({
    name: "",
    description: "",
    headDepactId: "",
  });

  const [users, setUsers] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (editingDepartment) {
      setDepartmentData({
        name: editingDepartment.name,
        description: editingDepartment.description,
        headDepactId: editingDepartment.headDepactId.toString(),
      });
    }
  }, [editingDepartment]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/GetAllUsers`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData({ ...departmentData, [name]: value });
  };

  const handleHeadDepactIdChange = (selectedId) => {
    setDepartmentData({ ...departmentData, headDepactId: selectedId });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/UpdateDepartment`, {
        id: editingDepartment.id,
        ...departmentData,
      });

      if (response.status === 200) {
        message.success("Department updated successfully");
        fetchDepartments();
        handleCloseModalVisible();
        // Reset any previous error message
        message.destroy(); // Destroy all previous messages
      } else {
        message.error("Failed to update department");
      }
    } catch (error) {
      message.error("Failed to update department");
    }
  };

  return (
    <Modal visible={isUpdateModalVisible} closable={false} footer={null}>
      <div className="flex flex-col justify-center items-start pt-4 text-base leading-6 bg-white rounded-3xl max-w-[720px]">
        <div className="text-2xl font-semibold text-neutral-600 max-md:max-w-full">
          Edit Department
        </div>
        <button type="button" className="absolute top-4 right-4 text-gray-500" onClick={handleCloseModalVisible}>
          <AiOutlineClose size={24} />
        </button>
        <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full">Department Name</div>
        <Input
          name="name"
          value={departmentData.name}
          onChange={handleChange}
          className="justify-center items-start px-4 py-4 mt-2 max-w-full bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:pr-5"
          placeholder="Enter Department Name"
        />
        <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full">Description</div>
        <Input.TextArea
          name="description"
          value={departmentData.description}
          onChange={handleChange}
          className="justify-center p-4 mt-2 max-w-full leading-7 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:max-w-full"
          placeholder="Describe the department ..."
          rows={2}
        />
        <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full">Assign head of department</div>
        <Select
          placeholder="Select head of department"
          onChange={handleHeadDepactIdChange}
          value={departmentData.headDepactId}
          className="w-[480px] h-[50px] mt-3 max-md:max-w-full"
        >
          {users.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.fullName}
            </Option>
          ))}
        </Select>
        <div className="flex justify-center items-center self-stretch px-6 py-6 mt-12 w-full bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <Button
            className="justify-center items-center px-8 py-4 mr-6 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
            onClick={handleCloseModalVisible}
          >
            Cancel
          </Button>
          <Button
            className="justify-center px-8 py-4 font-semibold text-white rounded-3xl bg-blue-500 max-md:px-5"
            onClick={handleSubmit}
          >
            Update Department
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default EditDepartmentModal;
