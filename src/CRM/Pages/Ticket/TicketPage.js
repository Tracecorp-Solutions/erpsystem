import React, { useState, useEffect } from "react";
import { Table, Button, Dropdown, Menu, message, Pagination } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import AddTicketCategory from "./AddTicketCategory";
import UpdateTicketCategory from "./UpdateTicketCategory";

const TicketPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ticketCategories, setTicketCategories] = useState([]);
  const [showUpdateTicketCategory, setShowUpdateTicketCategory] =
    useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchTicketCategories();
  }, []);

  const fetchTicketCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetTicketCategories`
      );
      setTicketCategories(response.data);
    } catch (error) {
      console.error("Error fetching ticket categories:", error);
      message.error("Failed to fetch ticket categories.");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showUpdateModal = (record) => {
    setSelectedCategory(record);
    setShowUpdateTicketCategory(true);
  };

  const handleCancelTicketCategory = () => {
    setShowUpdateTicketCategory(false);
    setSelectedCategory(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddCategory = async (formData) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/AddTicketCategory`,
        formData
      );
      message.success("Category added successfully");
      setIsModalVisible(false);
      fetchTicketCategories();
    } catch (error) {
      message.error("Error adding category:", error);
    }
  };

  const handleUpdateCategory = async (formData) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/UpdateTicketCategory`,
        formData
      );
      message.success("Category updated successfully");
      setShowUpdateTicketCategory(false);
      fetchTicketCategories();
    } catch (error) {
      message.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/DeleteTicketCategory/${categoryId}`,
        {
          headers: { accept: "*/*" }
        }
      );
      message.success("Category deleted successfully");
      fetchTicketCategories();
    } catch (error) {
      message.error("Error deleting category:", error);
    }
  };

  // Filter categories to exclude deleted ones
  const filteredCategories = ticketCategories.filter(
    (category) => !category.isDeleted
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalItems = filteredCategories.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: "CATEGORY NAME",
      dataIndex: "name",
      key: "name",
      render: (text) => <div className="text-base">{text}</div>,
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "description",
      render: (text) => <div className="text-sm text-gray-500">{text || "No description available"}</div>,
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" onClick={() => showUpdateModal(record)}>
                Update Category
              </Menu.Item>
              <Menu.Item key="delete" onClick={() => handleDeleteCategory(record.id)}>
                 Delete Category
              </Menu.Item>
            </Menu>
          }
          placement="bottomLeft"
          trigger={["click"]}
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

  return (
    <div className="flex flex-col py-6 px-4 bg-stone-100 rounded-3xl">
      <div className="flex items-center gap-2 text-base text-neutral-600">
        <div className="font-semibold">Configuration</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
          className="w-6 aspect-square"
        />
        <div>Ticket Categories</div>
      </div>
      <div className="flex flex-col mt-6 p-6 bg-white rounded-3xl">
        <div className="flex justify-between items-center mb-4">
          <div className="text-4xl font-semibold text-neutral-600">Ticket Categories</div>
          <Button
            type="primary"
            className="bg-slate-500 text-base rounded-3xl"
            onClick={showModal}
          >
            <PlusOutlined /> Add Category
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={currentItems}
          pagination={false}
          scroll={{ x: true }}
        />
        <div className="flex justify-end mt-4">
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
      <AddTicketCategory
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleAddCategory={handleAddCategory}
      />
      <UpdateTicketCategory
        showUpdateTicketCategory={showUpdateTicketCategory}
        handleCancel={handleCancelTicketCategory}
        handleUpdateCategory={handleUpdateCategory}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default TicketPage;
