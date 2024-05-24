import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu, Button, Pagination, Modal } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import BillsNavigationBar from "../components/BillsNavigationBar";
import FailureSlideInCard from "../components/FailureSlideInCard";
import SlideInCard from "../components/SlideInCard";
import VendorForm from "../components/VendorForm";
import BillsCard from "../components/BillsCard";
import BillsForm from "../components/BillsForm";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [showFailure, setShowFailure] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [messageInfo, setMessageInfo] = useState({ title: "", message: "" });
  const [toggleDisabled, setToggleDisabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectBillId, setSelectedBillId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [total, setTotalAmount] = useState(0);
  const [paidTotalAmount, setPaidTotalAmount] = useState(0);
  const [unpaidTotalAmount, setUnpaidTotalAmount] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  console.log("mark as paid form data", selectBillId);
  console.log("bills details", Bills);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/GetAllBills`
        );
        setBills(response.data);
        const total = response.data.reduce(
          (acc, bill) =>
            acc + bill.billTranItems.reduce((acc, item) => acc + item.amount, 0),
          0
        );
        setTotalAmount(total);

        // Calculate total amount for paid invoices
        const paidTotal = response.data
          .filter((bill) => bill.status === "Paid")
          .reduce(
            (acc, bill) =>
              acc +
              bill.billTranItems.reduce((acc, item) => acc + item.amount, 0),
            0
          );
        setPaidTotalAmount(paidTotal);

        const unpaidTotal = response.data
        .filter((bill) => bill.status !== "Paid")
        .reduce(
          (acc, bill) =>
            acc +
            bill.billTranItems.reduce((acc, item) => acc + item.amount, 0),
          0
        );
      setUnpaidTotalAmount(unpaidTotal);
      } catch (error) {
        setShowFailure(true);
        setMessageInfo({
          title: "Server Error!",
          message: "Failed to fetch bill details.",
        });
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateInvoice = () => {
    navigate("/create-bills");
  };

  const handleViewClick = () => {
    // Open the sidebar drawer when "View" is clicked
    setDrawerVisible(true);
  };

  const handleMarkAsPaid = async (id) => {
    console.log(id);
    setSelectedBillId(id);
    setShowConfirmationModal(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetBillById/${id}`
      );
      console.log("Fetched Invoice Data:", response.data);
    } catch (error) {
      console.error("Error fetching invoice data:", error);
      // Optionally, you can display an error message to the user
    }
  };

  const handleConfirmation = async () => {
    const id = selectBillId;

    setShowConfirmationModal(false);

    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/PayBill/${id}`);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAllBills`
      );
      setBills(response.data);
    } catch (error) {
      console.error("Error marking bill as paid:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      
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
          Bills
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
          + Create Bills
        </Button>
      </div>
      <BillsCard total={total} paidTotalAmount={paidTotalAmount} unpaidTotalAmount={unpaidTotalAmount} />
      <div
        style={{
          background: "#fff",
          padding: "15px",
          borderRadius: "24px",
          marginTop: "14px"
        }}
      >
        <BillsNavigationBar />

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
                  Vendor
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bills
                  .filter((bill) => bill.type === "Expense")
                  .map((bill, index) => (
                    <tr
                      key={index}
                      className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800"
                    >
                      <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                        <input type="checkbox" />
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                        {bill.status}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                        {bill.vendor.fullName}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                        {bill.billDate}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                        {bill.billNo}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                        {bill.billTranItems.reduce(
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
                                  <span>View Invoice</span>
                                </Menu.Item>
                                <Menu.Item
                                  key="2"
                                  // onClick={() => handleEditInvoice(bill.id)}
                                >
                                  Edit View
                                </Menu.Item>
                                {bill.status !== "Paid" && (
                                  <Menu.Item
                                    key="3"
                                    onClick={() => handleMarkAsPaid(bill.id)}
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
          // Style props for OK button
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
  );
};

export default Bills;
