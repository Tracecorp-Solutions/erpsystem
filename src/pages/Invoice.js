import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Button, Pagination } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InvoiceCard from "../components/InvoiceCard";
import InvoiceNavigationbar from "../components/InvoicesNavigationbar";
import InvoiceSidebar from "../components/InvoiceSidebar";

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

  console.log("invoice details", invoice);

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

        // Calculate total amount for paid invoices
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

  const handleCreateInvoice = () => {
    navigate("/create-invoice");
  };

  const handleEditInvoice = (id) => {
    navigate(`/edit-invoice/${id}`)
  }

  const handleViewClick = () => {
    // Open the sidebar drawer when "View" is clicked
    setDrawerVisible(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <InvoiceCard total={total} paidTotalAmount={paidTotalAmount} unpaidTotalAmount={unpaidTotalAmount} />
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
                        {inv.billDate}
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
                                <Menu.Item key="1" onClick={handleViewClick}>
                                  <EyeOutlined style={{ marginRight: "5px" }} />
                                  <span>View</span>
                                </Menu.Item>
                                <Menu.Item key="2" onClick={() => handleEditInvoice(inv.id)}>Edit View</Menu.Item>
                                <Menu.Item key="3">Action 3</Menu.Item>
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
      <InvoiceSidebar
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
      />
    </div>
  );
};

export default Invoice;
