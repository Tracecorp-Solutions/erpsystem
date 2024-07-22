import React, { useState } from "react";
import { Table, Button, Modal } from "antd";
import AddTicket from "./AddTicket";

const Ticket = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const data = [
    {
      key: "1",
      ticket: "TICKET-001",
      title: "Sample Ticket 1",
      category: "Bug",
      priority: "High",
      status: "Open",
      created: "2023-07-22",
    },
    {
      key: "2",
      ticket: "TICKET-002",
      title: "Sample Ticket 2",
      category: "Feature Request",
      priority: "Medium",
      status: "In Progress",
      created: "2023-07-23",
    },
    {
      key: "3",
      ticket: "TICKET-003",
      title: "Sample Ticket 3",
      category: "Enhancement",
      priority: "Low",
      status: "Closed",
      created: "2023-07-24",
    },
    {
      key: "4",
      ticket: "TICKET-004",
      title: "Sample Ticket 4",
      category: "Bug",
      priority: "High",
      status: "Open",
      created: "2023-07-25",
    },
    {
      key: "5",
      ticket: "TICKET-005",
      title: "Sample Ticket 5",
      category: "Feature Request",
      priority: "Low",
      status: "Closed",
      created: "2023-07-26",
    },
    {
      key: "6",
      ticket: "TICKET-006",
      title: "Sample Ticket 6",
      category: "Enhancement",
      priority: "Medium",
      status: "In Progress",
      created: "2023-07-27",
    },
  ];

  const columns = [
    { title: "Ticket", dataIndex: "ticket", key: "ticket" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Priority", dataIndex: "priority", key: "priority" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Date Created", dataIndex: "created", key: "created" },
  ];

  return (
    <div>
      <div className="flex gap-4 justify-between items-center mb-6 font-semibold leading-[160%] max-md:flex-wrap max-md:max-w-full">
        <div className="text-4xl capitalize text-neutral-600">Ticket</div>
        <Button
          type="primary"
          onClick={showModal}
          className="flex gap-2 justify-center items-center bg-slate-500 px-6 py-5 text-base rounded-3xl max-md:px-5"
        >
          Create Ticket
        </Button>
      </div>
      <Table dataSource={data} columns={columns} pagination={false} />
      <AddTicket isModalVisible={isModalVisible} handleCancel={handleCancel} />
    </div>
  );
};

export default Ticket;
