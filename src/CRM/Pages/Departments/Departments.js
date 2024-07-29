import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";
import CreateDepartments from "./CreateDepartments";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

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
      message.error("Failed to fetch departments");
    }
  };

  const handleUpdateModalVisible = () => {
    setIsUpdateModalVisible(true);
  };

  const handleCloseModalVisible = () => {
    setIsUpdateModalVisible(false);
    setEditingDepartment(null);
  };

  const handleEdit = async (record) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetDepartmentById/${record.id}`
      );
      setEditingDepartment(response.data); // Assuming response.data contains department details
      setIsUpdateModalVisible(true);
    } catch (error) {
      console.error("Error fetching department:", error);
      message.error("Failed to fetch department details");
    }
  };
  
  const handleSave = async (values) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/UpdateDepartment/${editingDepartment.id}`,
        values
      );
      fetchDepartments(); // Refresh departments after update
      handleCloseModalVisible();
      message.success("Department updated successfully");
    } catch (error) {
      console.error("Error updating department:", error);
      message.error("Failed to update department");
    }
  };

  const columns = [
    {
      title: <span className="text-gray-500">Department Name</span>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <span className="text-gray-500">Description</span>,
      dataIndex: "description",
      key: "description",
    },
    {
      title: <span className="text-gray-500">Head of Department</span>,
      dataIndex: "headDepactId",
      key: "headDepactId",
      render: (headDepactId) => {
        const department = departments.find((dept) => dept.id === headDepactId);
        return department ? department.name : "N/A";
      },
    },
    {
      title: <span className="text-gray-500">Actions</span>,
      render: (text, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          ...
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col flex-wrap justify-center content-start ml-4 py-6 rounded-3xl bg-stone-100">
        <div className="flex gap-2 px-6 text-base leading-6 whitespace-nowrap text-neutral-600 max-md:flex-wrap max-md:px-5">
          <div className="font-semibold">Configuration</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
            className="shrink-0 self-start w-6 aspect-square"
          />
          <div className="max-md:max-w-full">Departments</div>
        </div>
        <div className="flex flex-col self-center p-6 mt-6 w-full bg-white rounded-3xl max-w-[1088px] max-md:px-5 max-md:max-w-full">
          <div className="flex gap-4 justify-between w-full font-semibold leading-[160%] max-md:flex-wrap max-md:max-w-full">
            <div className="text-3xl capitalize text-neutral-600">Departments</div>
            <div className="flex gap-2 justify-center px-6 py-3 my-auto text-base text-white rounded-3xl max-md:px-5">
              <button
                className="justify-center self-start px-3 py-3 mt-2.5 text-sm font-semibold text-white whitespace-nowrap rounded-3xl bg-blue-400 max-md:px-5"
                onClick={handleUpdateModalVisible}
              >
                + Add department
              </button>
            </div>
          </div>
          <Table
            dataSource={departments}
            columns={columns}
            pagination={false}
            className="mt-4"
          />
        </div>
      </div>
      <CreateDepartments
        isUpdateModalVisible={isUpdateModalVisible}
        editingDepartment={editingDepartment}
        handleSave={handleSave}
        handleCloseModalVisible={handleCloseModalVisible}
      />
    </>
  );
};

export default Departments;
