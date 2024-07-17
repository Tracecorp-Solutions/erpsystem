import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Dropdown, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddTicketCategory from "./AddTicketCategory";

const TicketPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ticketCategories, setTicketCategories] = useState([]);

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
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <div>{text || "No description available"}</div>,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" onClick={() => handleEdit(record)}>
                Edit
              </Menu.Item>
              <Menu.Item key="delete">
                Delete
              </Menu.Item>
            </Menu>
          }
          placement="bottomLeft"
          trigger={['click']}
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

  const handleEdit = (record) => {
    console.log("Edit category:", record);
    // Handle edit action, e.g., show edit modal
  };

  return (
    <div className="flex flex-col flex-wrap justify-center content-start py-6 rounded-3xl bg-stone-100">
      <div className="flex gap-2 px-6 text-base leading-6 text-neutral-600 max-md:flex-wrap max-md:px-5">
        <div className="font-semibold">Configuration</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
          className="shrink-0 self-start w-6 aspect-square"
        />
        <div className="max-md:max-w-full">Ticket Categories</div>
      </div>
      <div className="flex flex-col self-center p-6 mt-6 w-full bg-white rounded-3xl max-md:px-5 w-full">
        <div className="flex gap-4 justify-between w-full font-semibold leading-[160%] max-md:flex-wrap max-md:max-w-full">
          <div className="text-4xl capitalize text-neutral-600">
            Ticket Categories
          </div>
          <Button
            type="primary"
            className="flex gap-2 justify-center px-6 py-5 my-auto bg-slate-500 text-base rounded-3xl max-md:px-5"
            onClick={showModal}
          >
           <PlusOutlined /> Add Category
          </Button>
        </div>
        <div className="mt-4">
          <Table
            columns={columns}
            dataSource={ticketCategories}
            rowKey={(record) => record.id}
            pagination={false}
          />
        </div>
      </div>
      <AddTicketCategory
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default TicketPage;
