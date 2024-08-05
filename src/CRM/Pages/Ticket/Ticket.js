import React, { useState, useEffect } from "react";
import { Table, Button, Dropdown, Menu, Modal, Spin, Pagination } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddTicket from "./AddTicket";
import EscalateTicket from "./EscalateTicket";
import UpdateStatus from "./UpdateStatus";
import ResolveTicket from "./ResolveTicket";
import UpdateTicketForm from "./UpdateTicketForm";

const Ticket = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [escalateModalVisible, setEscalateModalVisible] = useState(false);
  const [updateStatusModalVisible, setUpdateStatusModalVisible] = useState(false);
  const [resolveModalVisible, setResolveModalVisible] = useState(false);
  const [updateTicketForm, setUpdateTicketForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null); // Track selected ticket details
  const [departments, setDepartments] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(false);

  const name = sessionStorage.getItem("fullname");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchTickets();
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/GetAllDepartments`);
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchTickets = async () => {
    setLoadingTickets(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/GetAllTickets`);
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

  const showEscalateModal = () => {
    setEscalateModalVisible(true);
  };

  const handleCancelEscalateModal = () => {
    setEscalateModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleMenuClick = async (record, e) => {
    switch (e.key) {
      case "1":
        setSelectedTicket(record);
        navigate(`/crm`, {
          state: { screen: "update-ticket", record, ticketId: record.id },
        });
        break;
      case "2":
        setSelectedTicket(record);
        showEscalateModal();
        break;
      case "3":
        setSelectedTicket(record);
        setUpdateStatusModalVisible(true);
        break;
      case "4":
        setSelectedTicket(record);
        setResolveModalVisible(true);
        break;
      case "5":
        setSelectedTicket(record); // Set selected ticket details
        setUpdateTicketForm(true);
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

  const handleUpdateTicketCancel = () => {
    setUpdateTicketForm(false);
    setSelectedTicket(null); // Clear selected ticket details
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
              <Menu.Item key="1">View Ticket</Menu.Item>
              <Menu.Item key="2">Escalate Ticket</Menu.Item>
              <Menu.Item key="4">Resolve Ticket</Menu.Item>
              <Menu.Item key="5">Update Ticket</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
          placement="bottomRight"
        >
          <div
            className="flex flex-col justify-center px-9 py-3 max-md:px-5"
            onClick={(e) => e.preventDefault()}
          >
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentItems = tickets.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = tickets.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
        <>
          <Table
            dataSource={currentItems}
            columns={columns}
            pagination={false}
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
        </>
      )}

      <AddTicket
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        recordedBy={name}
        fetchTickets={fetchTickets}
      />

      <Modal
        visible={escalateModalVisible}
        onCancel={handleCancelEscalateModal}
        closable={false}
        footer={null}
      >
        <EscalateTicket
          handleEscalateCancel={handleCancelEscalateModal}
          recordedBy={name}
          departments={departments}
          ticketId={selectedTicket?.id}
        />
      </Modal>

      <UpdateTicketForm
        updateTicketForm={updateTicketForm}
        handleUpdateTicketCancel={handleUpdateTicketCancel}
        ticketDetails={selectedTicket} // Pass selected ticket details
        recordedBy={name}
      />

      <Modal
        visible={updateStatusModalVisible}
        onCancel={handleUpdateStatusCancel}
        closable={false}
        footer={null}
      >
        <UpdateStatus
          handleUpdateStatusCancel={handleUpdateStatusCancel}
          ticketId={selectedTicket?.id}
        />
      </Modal>

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
          ticketId={selectedTicket?.id}
        />
      </Modal>
    </div>
  );
};

export default Ticket;
