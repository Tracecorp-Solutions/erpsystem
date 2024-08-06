import React, { useState, useEffect } from "react";
import { Table, Button, message, Dropdown, Menu, Pagination } from "antd";
import axios from "axios";
import AddProrityLevel from "./AddProrityLevel";
import EditPriorityForm from "./UpdateProrityLevel";

const PrioritySetting = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/GetPriorities`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const showEditModal = (priority) => {
    setSelectedPriority(priority);
    setEditModalVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setEditModalVisible(false);
  };

  const handleUpdatePriority = () => {
    fetchData();
  };

  const onFinish = async (values, handleCancel, reloadData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/AddPriority`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
          body: JSON.stringify({
            priorityName: values.priorityLevelName,
            colorCode: values.colorCode,
            priorityDescription: values.description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      message.success("Priority added successfully!");
      reloadData();
      handleCancel();
    } catch (error) {
      console.error("Error:", error);
      message.error("Error:", error.message);
    }
  };

  const handleAction = async (action, id) => {
    try {
      if (action === "delete") {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/DeletePriority/${id}`
        );
        if (response.status === 200) {
          message.success("Priority deleted successfully!");
          fetchData();
        } else {
          message.error("Failed to delete priority");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Error:", error.message);
    }
  };

  const columns = [
    {
      title: "PRORITY LEVEL",
      dataIndex: "priorityName",
      key: "priorityName",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "priorityDescription",
      key: "priorityDescription",
    },
    {
      title: "COLOR CODE",
      dataIndex: "colorCode",
      key: "colorCode",
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={() => showEditModal(record)}>
                Update Priority Level
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => handleAction("delete", record.id)}
              >
                Disable Priority Level
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button type="link">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7dbf8806e95bce2fbed7ce7b2f5db807a8837b3f5d8b859cf52ff980db0ec52c?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
              className="w-5 aspect-square"
            />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = data.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col justify-center content-start py-6 rounded-3xl bg-stone-100">
      <div className="flex gap-2 px-6 text-base leading-6 text-neutral-600 max-md:flex-wrap max-md:px-5">
        <div className="font-semibold">Configuration</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
          className="shrink-0 self-start w-6 aspect-square"
          alt="Configuration Image"
        />
        <div className="max-md:max-w-full">Priority Settings</div>
      </div>
      <div className="flex flex-col self-center p-6 mt-6 bg-white rounded-3xl max-md:px-5 w-full">
        <div className="flex gap-4 justify-between items-center mb-6 font-semibold leading-[160%] max-md:flex-wrap max-md:max-w-full">
          <div className="text-4xl capitalize text-neutral-600">
            Priority Levels
          </div>
          <Button
            type="primary"
            onClick={showModal}
            className="flex gap-2 justify-center items-center bg-slate-500 px-6 py-5 text-base rounded-3xl max-md:px-5"
          >
            Add Priority Level
          </Button>
        </div>
        <Table
          dataSource={currentItems}
          columns={columns}
          pagination={false}
          scroll={{ x: true }}
        />
        <div className="flex justify-end">
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
            style={{ marginTop: 16, textAlign: "center" }}
          />
        </div>
      </div>
      <AddProrityLevel
        visible={visible}
        handleCancel={handleCancel}
        onFinish={onFinish}
        reloadData={fetchData}
      />
      <EditPriorityForm
        isModalVisible={editModalVisible}
        handleCancel={handleCancel}
        handleUpdatePriority={handleUpdatePriority}
        priorityData={selectedPriority}
      />
    </div>
  );
};

export default PrioritySetting;
