import React, { useState, useEffect } from "react";
import { Table, Button, Dropdown, Menu, Modal, Spin } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddTicket from "./AddTicket";
import EscalateTicket from "./EscalateTicket";
import UpdateStatus from "./UpdateStatus";
import ResolveTicket from "./ResolveTicket";

const Ticket = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [escalateModalVisible, setEscalateModalVisible] = useState(false);
  const [updateStatusModalVisible, setUpdateStatusModalVisible] =
    useState(false);
  const [resolveModalVisible, setResolveModalVisible] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const name = sessionStorage.getItem("fullname");

  useEffect(() => {
    fetchTickets();
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

  const fetchTickets = async () => {
    setLoadingTickets(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAllTickets`
      );
      const formattedTickets = response.data.map((ticket) => ({
        ...ticket,
        creationDate: new Date(ticket.creationDate).toLocaleDateString(),
      }));
      setTickets(formattedTickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoadingTickets(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleMenuClick = async (record, e) => {
    console.log("Clicked on menu item", e.key, "for record", record);
    switch (e.key) {
      case "1":
        setSelectedTicketId(record.id);
        navigate(`/crm`, {
          state: { screen: "update-ticket", record, ticketId: record.id },
        });
        break;
      case "2":
        setEscalateModalVisible(true);
        setSelectedTicketId(record.id);
        break;
      case "3":
        setUpdateStatusModalVisible(true);
        break;
      case "4":
        setResolveModalVisible(true);
        setSelectedTicketId(record.id);
        break;
      default:
        break;
    }
  };

  const handleEscalateCancel = () => {
    setEscalateModalVisible(false);
  };

  const handleUpdateStatusCancel = () => {
    setUpdateStatusModalVisible(false);
  };

  const handleResolveCancel = () => {
    setResolveModalVisible(false);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "SUBJECT", dataIndex: "customerName", key: "customerName" },
    {
      title: "COMPLAINT SUBJECT",
      dataIndex: "complaintSubject",
      key: "complaintSubject",
    },
    { title: "STATUS", dataIndex: "status", key: "status" },
    {
      title: "CREATION DATE",
      dataIndex: "creationDate",
      key: "creationDate",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "PRIORITY",
      dataIndex: ["priority", "priorityName"],
      key: "priority",
    },
    {
      title: "TICKET CATEGORY",
      dataIndex: ["ticketCategory", "name"],
      key: "ticketCategory",
    },
    {
      title: "ACTION",
      key: "actions",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu onClick={(e) => handleMenuClick(record, e)}>
              <Menu.Item key="1">Update Ticket</Menu.Item>
              <Menu.Item key="2">Escalate Ticket</Menu.Item>
              <Menu.Item key="4">Resolve Ticket</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
          placement="bottomRight"
        >
          <div className="flex flex-col justify-center px-9 py-3  max-md:px-5" onClick={(e) => e.preventDefault()}>
          <div className="flex justify-center items-center px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e208e19cb012f5bf1adcf62e6edbe433a5adc1a0f380b3a06e47e7ddfd71e8c?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
              className="w-5 aspect-square"
            />
          </div>
          </div>
        </Dropdown>
      ),
    },
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

      {loadingTickets ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
          className="w-full"
        >
          <Spin size="large" />
        </div>
      ) : (
        <Table dataSource={tickets} columns={columns} pagination={false} />
      )}

      <AddTicket isModalVisible={isModalVisible} handleCancel={handleCancel} recordedBy={name} fetchTickets={fetchTickets} />

      {/* Escalate Ticket Modal */}
      <Modal
        visible={escalateModalVisible}
        onCancel={handleEscalateCancel}
        closable={false}
        footer={null}
      >
        <EscalateTicket
          handleEscalateCancel={handleEscalateCancel}
          recordedBy={name}
          departments={departments}
          ticketId={selectedTicketId}
        />
      </Modal>

      {/* Update Status Modal */}
      <Modal
        visible={updateStatusModalVisible}
        onCancel={handleUpdateStatusCancel}
        closable={false}
        footer={null}
      >
        <UpdateStatus
          handleUpdateStatusCancel={handleUpdateStatusCancel}
          ticketId={selectedTicketId}
        />
      </Modal>

      {/* Resolve Ticket Modal */}
      <Modal
        visible={resolveModalVisible}
        onCancel={handleResolveCancel}
        closable={false}
        footer={null}
      >
        <ResolveTicket
          handleResolveCancel={handleResolveCancel}
          recordedBy={name}
          departments={departments}
          ticketId={selectedTicketId}
        />
      </Modal>
    </div>
  );
};

export default Ticket;
