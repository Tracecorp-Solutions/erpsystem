import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Button, Pagination } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import InvoiceCard from "../components/InvoiceCard";

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

  console.log("invoice details", invoice);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/GetAllBills`
        );
        setInvoice(response.data);
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

  const handleModal = () => {
    setShowModal(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <InvoiceCard />
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
        >
          + Create Invoice
        </Button>
      </div>
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
                  TOTAL
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  AMOUNT DUE
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoice
                .filter((inv) => inv.type === "INVOICE")
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
                      {inv.customer}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                      {inv.billDate}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                      {inv.billNo}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                      {inv.totalAmount}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                      {inv.amountDue}
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
                              <Menu.Item key="1">
                                <EyeOutlined style={{ marginRight: "5px" }} />
                                <span>View</span>
                              </Menu.Item>
                              <Menu.Item key="2">Action 2</Menu.Item>
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
  );
};

export default Invoice;
