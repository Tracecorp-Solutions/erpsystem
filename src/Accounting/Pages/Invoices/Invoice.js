import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Button, Pagination, Modal } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { EyeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InvoiceCard from "./InvoiceCard";
import InvoiceNavigationbar from "./InvoicesNavigationbar";
import ViewInvoice from "./ViewInvoice"; // Import ViewInvoice component

const Invoice = () => {
  const [invoice, setInvoice] = useState([]);
  const [showFailure, setShowFailure] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [messageInfo, setMessageInfo] = useState({ title: "", message: "" });
  const [toggleDisabled, setToggleDisabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [total, setTotalAmount] = useState(0);
  const [paidTotalAmount, setPaidTotalAmount] = useState(0);
  const [unpaidTotalAmount, setUnpaidTotalAmount] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectInvoiceId, setSelectedInvoiceId] = useState(null);
  const [viewInvoiceId, setViewInvoiceId] = useState(null); // State to track which invoice to view

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/GetAllBills`
        );
        setInvoice(response.data);
        const total = response.data.reduce(
          (acc, inv) =>
            acc + inv.billTranItems.reduce((acc, item) => acc + item.amount, 0),
          0
        );
        setTotalAmount(total);

        const paidTotal = response.data
          .filter((inv) => inv.status === "Paid")
          .reduce(
            (acc, inv) =>
              acc +
              inv.billTranItems.reduce((acc, item) => acc + item.amount, 0),
            0
          );
        setPaidTotalAmount(paidTotal);

        const unpaidTotal = response.data
          .filter((inv) => inv.status !== "Paid")
          .reduce(
            (acc, inv) =>
              acc +
              inv.billTranItems.reduce((acc, item) => acc + item.amount, 0),
            0
          );
        setUnpaidTotalAmount(unpaidTotal);
      } catch (error) {
        setShowFailure(true);
        setMessageInfo({
          title: "Server Error!",
          message: "Failed to fetch invoice details.",
        });
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleCreateInvoice = () => {
    navigate(`/Dashboardlayout`, { state: { screen: "invoiceform" } }); 
  };

  const handleEditInvoice = (id) => {
    navigate(`/edit-invoice/${id}`);
  };

  const handleViewInvoice = (id) => {
    setViewInvoiceId(id); // Set the invoice ID to view
    setDrawerVisible(true); // Open the drawer
  };

  const handleMarkAsPaid = async (id) => {
    setSelectedInvoiceId(id);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = async () => {
    const id = selectInvoiceId;

    setShowConfirmationModal(false);

    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/PayBill/${id}`);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAllBills`
      );
      setInvoice(response.data);
    } catch (error) {
      console.error("Error marking invoice as paid:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="content">
        <InvoiceCard
          total={total}
          paidTotalAmount={paidTotalAmount}
          unpaidTotalAmount={unpaidTotalAmount}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <h2
            style={{
              fontSize: "36px",
              fontFamily: "Sans-serif",
              color: "#505050",
              fontWeight: "600",
            }}
          >
            Invoice
          </h2>
          <Button
            type="button"
            style={{
              background: "#4467a1",
              fontFamily: "outFit, Sans-serif",
              color: "#fff",
              padding: "",
              borderRadius: "24px",
              marginTop: "15px",
            }}
            onClick={handleCreateInvoice}
          >
            + Create Invoice
          </Button>
        </div>
        <div
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "24px",
          }}
        >
          <InvoiceNavigationbar />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div style={{ overflowY: "auto", width: "100%" }}>
              <table className="table-auto min-w-full divide-gray-200">
                <thead className="bg-gray-50">
                  <tr style={{ borderRadius: "50px" }}>
                    <input
                      type="checkbox"
                      style={{ marginLeft: "10px", marginTop: "15px" }}
                    />
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      STATUS
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      CUSTOMER
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      DATE
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      NUMBER
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount Due
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoice
                    .filter((inv) => inv.type === "Income")
                    .map((inv, index) => (
                      <tr
                        key={index}
                        className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800"
                      >
                        <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                          <input type="checkbox" />
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                          {inv.status}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                          {inv.vendor.fullName}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                        {formatDate(inv.billDate)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                          {inv.billNo}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                          {inv.billTranItems.reduce(
                            (total, item) => total + item.amount,
                            0
                          )}
                        </td>

                        <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                          <div
                            style={{
                              width: "100px",
                              display: "flex",
                              justifyContent: "center",
                              marginTop: "10px",
                            }}
                          >
                            <Dropdown
                              overlay={
                                <Menu style={{ width: "250px" }}>
                                  <Menu.Item
                                    key="1"
                                    onClick={() => handleViewInvoice(inv.id)}
                                  >
                                    <span>View Invoice</span>
                                  </Menu.Item>
                                  <Menu.Item
                                    key="2"
                                    onClick={() => handleEditInvoice(inv.id)}
                                  >
                                    Edit View
                                  </Menu.Item>
                                  {inv.status !== "Paid" && (
                                    <Menu.Item
                                      key="3"
                                      onClick={() => handleMarkAsPaid(inv.id)}
                                    >
                                      Mark as Paid
                                    </Menu.Item>
                                  )}
                                  <Menu.Item key="4">
                                    Send payment reminder
                                  </Menu.Item>
                                </Menu>
                              }
                              trigger={["click"]}
                            >
                              <EllipsisVerticalIcon
                                className="h-5 w-5 mt-3"
                                aria-hidden="true"
                              />
                            </Dropdown>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Modal
          title="Mark Invoice as Paid"
          visible={showConfirmationModal}
          onOk={handleConfirmation}
          onCancel={() => setShowConfirmationModal(false)}
          okButtonProps={{
            style: {
              backgroundColor: "#4467a1",
              color: "#fff",
              borderRadius: "4px",
              borderColor: "#4467a1",
              marginRight: "8px",
            },
          }}
          cancelButtonProps={{
            style: {
              backgroundColor: "#fff",
              color: "#4467a1",
              borderRadius: "4px",
              borderColor: "#4467a1",
            },
          }}
        >
          <p>Are you sure you want to mark this invoice as paid?</p>
        </Modal>
      </div>
      <ViewInvoice
        billId={viewInvoiceId} // Pass the invoice ID to view
        onClose={() => setDrawerVisible(false)} // Close the drawer
        visible={drawerVisible} // Control drawer visibility
      />
    </>
  );
};

export default Invoice;
