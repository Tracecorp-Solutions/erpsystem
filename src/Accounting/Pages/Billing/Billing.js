import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu, Button, Pagination, Drawer, Modal } from "antd"; // Import Modal from antd
import { EllipsisOutlined } from "@ant-design/icons";
import axios from "axios";
import BillsNavigationBar from "./BillsNavigationBar";
import BillsCard from "./BillsCard";
import ViewBill from "./ViewBill";

const Billing = () => {
  const [bills, setBills] = useState([]);
  const [showFailure, setShowFailure] = useState(false);
  const [messageInfo, setMessageInfo] = useState({ title: "", message: "" });
  const [toggleDisabled, setToggleDisabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedBillId, setSelectedBillId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [total, setTotalAmount] = useState(0);
  const [paidTotalAmount, setPaidTotalAmount] = useState(0);
  const [unpaidTotalAmount, setUnpaidTotalAmount] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showBillDetailsModal, setShowBillDetailsModal] = useState(false);

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
            acc +
            bill.billTranItems.reduce((acc, item) => acc + item.amount, 0),
          0
        );
        setTotalAmount(total);

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

  const handleViewBill = (id) => {
    setSelectedBillId(id);
    setDrawerVisible(true);
  };

  const handleMarkAsPaid = async (id) => {
    setSelectedBillId(id);
    setShowConfirmationModal(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetBillById/${id}`
      );
      console.log("Fetched Invoice Data:", response.data);
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const filteredBills = bills.filter((bill) => {
    const matchesSearchQuery = bill.billNo.includes(searchQuery);
    if (toggleDisabled) {
      return bill.status !== "Paid" && matchesSearchQuery;
    }
    return matchesSearchQuery;
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBills = filteredBills.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedBillId(null);
  };

  const handleConfirmation = async () => {
    const id = selectedBillId;
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

  return (
    <>
      <div className="content">
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
              borderRadius: "24px",
              marginTop: "15px",
            }}
            onClick={handleCreateInvoice}
          >
            + Create Bills
          </Button>
        </div>
        <BillsCard
          total={total}
          paidTotalAmount={paidTotalAmount}
          unpaidTotalAmount={unpaidTotalAmount}
        />
        <div
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "24px",
            marginTop: "14px",
          }}
        >
          <BillsNavigationBar
            toggleDisabled={toggleDisabled}
            setToggleDisabled={setToggleDisabled}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
          />

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
                    <th
                      scope="col"
                      className="relative px-6 py-3"
                      style={{
                        marginRight: "50px",
                        marginLeft: "20px",
                        marginTop: "15px",
                      }}
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentBills.map((bill) => (
                    <tr key={bill.id} className="hover:bg-gray-100">
                      <input
                        type="checkbox"
                        style={{ marginLeft: "10px" }}
                      />
                      <td className="px-3 py-4 whitespace-nowrap">
                        {bill.status}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        {bill.vendor.fullName}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        {formatDate(bill.billDate)}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        {bill.billNo}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        {bill.billTranItems.reduce(
                          (total, item) => total + item.amount,
                          0
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item
                                key="1"
                                onClick={() => handleViewBill(bill.id)}
                              >
                                View
                              </Menu.Item>
                              <Menu.Item
                                key="2"
                                onClick={() => handleMarkAsPaid(bill.id)}
                              >
                                Mark as Paid
                              </Menu.Item>
                            </Menu>
                          }
                          trigger={["click"]}
                        >
                          <EllipsisOutlined
                            className="text-gray-500 cursor-pointer"
                            style={{ fontSize: "24px" }}
                          />
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            current={currentPage}
            total={filteredBills.length}
            pageSize={itemsPerPage}
            onChange={paginate}
          />
        </div>
      </div>

      <Drawer
        title="View Bill"
        placement="right"
        closable={true}
        onClose={onCloseDrawer}
        visible={drawerVisible}
        width={0}
        destroyOnClose={true}
      >
        {selectedBillId && (
          <ViewBill
            billId={selectedBillId}
            onClose={() => setDrawerVisible(false)}
          />
        )}
      </Drawer>

      <Modal
        title="Mark Bill as Paid"
        visible={showConfirmationModal}
        onCancel={() => setShowConfirmationModal(false)}
        onOk={handleConfirmation}
      >
        <p>Are you sure you want to mark this bill as paid?</p>
      </Modal>
    </>
  );
};

export default Billing;
