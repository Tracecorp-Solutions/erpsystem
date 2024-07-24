import React from "react";
import { Table, Space, Button, Dropdown, Menu } from "antd";
import {
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

const TicketSubcategory = () => {
  const data = [
    {
      key: "1",
      subcategoryName: "Billing Issue",
      description: "Issues related to customer billing",
      department: "Technical",
      parentCategory: "Billing Issue",
    },
    {
      key: "2",
      subcategoryName: "Service Request",
      description: "Requests for new services or upgrades",
      department: "Maintenance",
      parentCategory: "Service Request",
    },
    {
      key: "3",
      subcategoryName: "Maintenance",
      description: "Issues related to infrastructure",
      department: "Billing",
      parentCategory: "Maintenance",
    },
    {
      key: "4",
      subcategoryName: "IT Support",
      description: "Technical support for customers",
      department: "Technical",
      parentCategory: "IT Support",
    },
    {
      key: "5",
      subcategoryName: "General Inquiry",
      description: "General questions and information",
      department: "Payments",
      parentCategory: "General Inquiry",
    },
  ];

  const menu = (record) => (
    <Menu>
      <Menu.Item key="view">
        <Button type="text" onClick={() => handleView(record)}>
          Update Subcategory
        </Button>
      </Menu.Item>
      <Menu.Item key="edit">
        <Button type="text" onClick={() => handleEdit(record)}>
          Disable Subcategory
        </Button>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Subcategory Name",
      dataIndex: "subcategoryName",
      key: "subcategoryName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Parent Category",
      dataIndex: "parentCategory",
      key: "parentCategory",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Dropdown overlay={() => menu(record)} trigger={["click"]}>
            <Button type="text" icon={<EllipsisOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const handleView = (record) => {
    console.log("View action for:", record);
  };

  const handleEdit = (record) => {
    console.log("Edit action for:", record);
    // Implement edit action logic here
  };


  return (
    <div className="flex flex-col flex-wrap justify-center content-start py-6 rounded-3xl bg-stone-100">
      <div className="flex gap-2 px-6 text-base leading-6 text-neutral-600 max-md:flex-wrap max-md:px-5">
        <div className="font-semibold">Configuration</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
          className="shrink-0 self-start w-6 aspect-square"
          alt="Configuration Icon"
        />
        <div className="max-md:max-w-full">Ticket Subcategories</div>
      </div>
      <div className="flex flex-col self-center p-6 mt-6 w-full bg-white rounded-3xl max-w-[1088px] max-md:px-5 max-md:max-w-full">
        <div className="flex gap-4 justify-between w-full font-semibold leading-[160%] max-md:flex-wrap max-md:max-w-full">
          <div className="text-4xl capitalize text-neutral-600">
            Ticket Subcategories
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="flex gap-2 justify-center px-6 py-3 my-auto text-base text-white rounded-3xl bg-slate-500 max-md:px-5"
          >
            Add Subcategory
          </Button>
        </div>
        <div className="mt-4">
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </div>
  );
};

export default TicketSubcategory;
