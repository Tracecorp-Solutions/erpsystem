import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Dropdown, Menu, Pagination } from "antd";
import { EyeOutlined, EditOutlined, DownloadOutlined } from "@ant-design/icons";

import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import TranAccountComponentSidebar from "./TranAccountComponentSidebar";
import TransactionNavigationFilter from "./TranAccountNavigationFilter";
// import "../styles/AccountCreation.css";
import EmptyData from "../../components/Shared/EmptyData";
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Transactions = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [subGroupAccounts, setSubGroupAccounts] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    accountFromId: 0,
    accountToId: 0,
    transactionDate: "",
    amount: 0,
    narration: "",
    tranReference: "",
  });
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [editedAccount, setEditedAccount] = useState(null);
  const [accountNameFilter, setAccountNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [noDataFound, setNoDataFound] = useState(false);

  console.log("Date range", selectedAccount);

  useEffect(() => {
    fetchAccounts();
    fetchTransactions();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAccounts`
      );
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      setError("Failed to fetch accounts");
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/RetrieveTransactions`
      );
      setTransactions(response.data);
      console.log("", response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/RecordTransaction`,
        newTransaction
      );
      console.log(response.data);
      setShowModal(false);
      // Refresh transactions after successful submission
      fetchTransactions();

      if (response?.data) {
        setSuccessMessage("Transaction was successful.");
        setErrorMessage(""); // Reset error message
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } else {
        setErrorMessage("Failed to record transaction");
        console.error(
          "Error creating group account: Response data is undefined"
        );
      }
    } catch (error) {
      console.error("Failed to record transaction:", error);
      setErrorMessage("Failed to record transaction");
      setSuccessMessage(""); // Reset success message
    }
  };

  const handleBehaviorChange = (e) => {
    const { value } = e.target;
    setEditedAccount({ ...editedAccount, behaviour: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/UpdateAccountDetails`,
        editedAccount
      );
      console.log("Account updated:", response.data);
      setShowEditForm(false);
      // Refresh accounts after successful submission
      fetchAccounts();
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const handleViewDetails = async (accountId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetTransactionsByAccountId?accountid=${accountId}`
      );
      setSelectedAccount(response.data);
      setDrawerVisible(true);
    } catch (error) {
      console.error("Error fetching account details:", error);
    }
  };

  const handleDropdownVisibleChange = (visible, accountId) => {
    console.log("transacyaiaiiia", accountId);
    setDropdownVisible({ ...dropdownVisible, [accountId]: visible });
  };

  const generatePDF = () => {
    const htmlContent = document.getElementById("transactionsContent").innerHTML;
    html2pdf().from(htmlContent).save(`Transactions.pdf`);
  };

  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(transactions); // replace billData with your actual data
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, `Data.xlsx`);
  };

  const handleDownload = ({ key }) => {
    switch (key) {
      case "pdf":
        generatePDF();
        break;
      case "excel":
        generateExcel();
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleDownload}>
      {/* <Menu.Item key="pdf">Download PDF</Menu.Item> */}
      <Menu.Item key="excel">Download Excel</Menu.Item>
    </Menu>
  );


  // const handleEdit = async (accountId) => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/GetTransactionsByAccountId?accountid=${accountId}`
  //     );
  //     setEditedAccount(response.data);
  //     setShowEditForm(true);
  //   } catch (error) {
  //     console.error("Error fetching account details for edit:", error);
  //   }
  // };

  const CancelEdit = () => {
    setShowEditForm(false);
  };

  const handleFilter = async () => {
    try {
      const fromDate = dateRange[0].format("YYYY-MM-DD");
      const toDate = dateRange[1].format("YYYY-MM-DD");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetTransactionsByDateRange/${fromDate}&${toDate}`
      );
      const filteredTransactions = response.data;

      if (filteredTransactions.length === 0) {
        setNoDataFound(true);
      } else {
        setNoDataFound(false);
      }

      setTransactions(filteredTransactions);
      console.log("Filtered transactions:", filteredTransactions);
    } catch (error) {
      console.error("Error filtering transactions:", error);
      setError("Failed to filter transactions");
    }
  };

  const renderMenu = (accountId) => (
    <Menu style={{ width: "200px" }}>
      <Menu.Item
        key="1"
        onClick={() => handleViewDetails(accountId)}
        icon={<EyeOutlined />}
      >
        View
      </Menu.Item>
      {/* <Menu.Item
        key="2"
        onClick={() => handleEdit(accountId)}
        icon={<EditOutlined />}
      >
        Reverse
      </Menu.Item> */}
    </Menu>
  );

  const filteredAccounts = accounts.filter(
    (account) =>
      account.name.toLowerCase().includes(accountNameFilter.toLowerCase()) ||
      account.accountType
        .toLowerCase()
        .includes(accountNameFilter.toLowerCase()) ||
      account.accountNumber.includes(accountNameFilter.toLowerCase()) ||
      subGroupAccounts
        .find(
          (subGroup) =>
            subGroup.subGroupAccount.id === account.subGroupAccountId
        )
        .subGroupAccount.name.toLowerCase()
        .includes(accountNameFilter.toLowerCase()) ||
      account.balance.toString().includes(accountNameFilter)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const rangeStart = (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = Math.min(currentPage * itemsPerPage, transactions.length);
  return (
    <>
      {/* <SideNav /> */}
      <div className="content">
        {/* <TopNav /> */}

        {drawerVisible && (
          <TranAccountComponentSidebar
            subGroupAccounts={subGroupAccounts}
            setDrawerVisible={setDrawerVisible}
            drawerVisible={drawerVisible}
            selectedAccount={selectedAccount}
          />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {successMessage && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-1"
              role="alert"
            >
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}
          <h2
            style={{
              fontFamily: "outFit,Sans-serif",
              color: "#505050",
              fontWeight: "600",
              fontSize: "25px",
            }}
          >
            Transact
          </h2>
          <Dropdown overlay={menu} trigger={["click"]}>
          <Button
              type="primary"
              icon={<DownloadOutlined />}
              style={{
                background: "#9ec137",
                borderRadius: "28px",
                fontFamily: "outFit, Sans-serif",
                marginLeft: "auto", // Pushes the button to the right
                display: "block", // Ensures the button is a block element
              }}
            >
              Download
            </Button>
          </Dropdown>
          <Button
            type="primary"
            onClick={() => setShowModal(true)}
            style={{
              background: "#4467a1",
              borderRadius: "28px",
              fontFamily: "outFit, Sans-serif",
              marginLeft: "12px",
            }}
          >
            + Start Transaction
          </Button>
        </div>
        <Modal visible={showEditForm} onCancel={CancelEdit} footer={null}>
          <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
            {/* <AccountForm
              accountData={selectedAccount}
              editedAccount={editedAccount}
              setEditedAccount={setEditedAccount}
              handleSubmit={handleEditSubmit}
              CancelEdit={() => setShowEditForm(false)}
              subGroupAccounts={subGroupAccounts}
            /> */}
          </div>
        </Modal>
        {!loading && (
          <>
            <TransactionNavigationFilter
              accountNameFilter={accountNameFilter}
              setAccountNameFilter={setAccountNameFilter}
              setDateRange={setDateRange}
              handleFilter={handleFilter}
            />
          </>
        )}
        {noDataFound && (
          <div style={{ textAlign: "center", marginTop: "10px", color: "red" }}>
            No transactions found for the selected date range.
          </div>
        )}
        <Modal visible={showModal} onCancel={handleCancel} footer={null}>
          <h3
            style={{
              color: "#505050",
              fontFamily: "outFit, Sans-serif",
              fontSize: "25px",
              marginTop: "20px",
            }}
          >
            Transact
          </h3>
          <div
            style={{
              maxHeight: "60vh",
              overflowY: "auto",
              paddingRight: "15px",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
            className="overflow-y-auto"
          >
            <form className="max-w-md mx-auto">
              <div className="mb-4">
                <label
                  htmlFor="transactionDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Transaction Date
                </label>
                <p
                  className="text-gray-500 text-xs mb-1"
                  style={{ fontFamily: "outFit, Sans-serif" }}
                >
                  Enter date when transaction occurred
                </p>
                <input
                  type="date"
                  id="transactionDate"
                  value={newTransaction.transactionDate.split("T")[0]} // Extracts the date part
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      transactionDate: e.target.value,
                    })
                  }
                  placeholder="Please enter account balance..."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  style={{ borderRadius: "12px", padding: "15px" }}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="tranReference"
                  className="block mb-2"
                  style={{
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "15px",
                    fontWeight: "80",
                  }}
                >
                  Reference Number
                </label>
                <p
                  className="text-gray-500 text-xs mb-1"
                  style={{ fontFamily: "outFit, Sans-serif" }}
                >
                  If you have an invoice or cheque number related to this number
                </p>
                <input
                  type="text"
                  id="tranReference"
                  name="tranReference"
                  value={newTransaction.tranReference}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      tranReference: e.target.value,
                    })
                  }
                  placeholder="Please enter account name..."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  style={{ borderRadius: "12px", padding: "15px" }}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="accountFromId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Account From
                </label>
                <p
                  className="text-gray-500 text-xs mb-2"
                  style={{ fontFamily: "outFit, Sans-serif" }}
                >
                  Source of the funds
                </p>
                <select
                  id="accountFromId"
                  value={newTransaction.name}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      accountFromId: parseInt(e.target.value),
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  style={{ borderRadius: "12px", padding: "15px" }}
                >
                  <option value="">Select an account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="accountToId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Account To
                </label>
                <p
                  className="text-gray-500 text-xs mb-2"
                  style={{ fontFamily: "outFit, Sans-serif" }}
                >
                  Account receiving the funds
                </p>
                <select
                  id="accountToId"
                  value={newTransaction.name}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      accountToId: parseInt(e.target.value),
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  style={{ borderRadius: "12px", padding: "15px" }}
                >
                  <option value="">Select an account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block mb-1"
                  style={{
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "15px",
                    fontWeight: "80",
                  }}
                >
                  Amount
                </label>
                <p
                  className="text-gray-500 text-xs mb-2"
                  style={{ fontFamily: "outFit, Sans-serif" }}
                >
                  Amount being transferred
                </p>

                <input
                  type="text"
                  id="amount"
                  value={newTransaction.amount}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      amount: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  style={{ borderRadius: "12px", padding: "15px" }}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block mb-1"
                  style={{
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "15px",
                    fontWeight: "80",
                  }}
                >
                  Narration
                </label>
                <p
                  className="text-gray-500 text-xs mb-2"
                  style={{ fontFamily: "outFit, Sans-serif" }}
                >
                  A brief explanation of the transaction for reference.
                </p>
                <input
                  type="text"
                  id="narration"
                  value={newTransaction.narration}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      narration: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  style={{ borderRadius: "12px", padding: "15px" }}
                />
              </div>
            </form>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="py-2 px-4 text-gray-700 rounded focus:outline-none"
              style={{
                borderRadius: "28px",
                fontFamily: "outFit, Sans-serif",
                width: "40%",
                border: "#505050 1px solid",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              style={{
                background: "#4467a1",
                borderRadius: "28px",
                fontFamily: "outFit, Sans-serif",
                width: "40%",
              }}
              onClick={handleSubmit}
            >
              Save Transaction
            </button>
          </div>
        </Modal>
        <div>
          <div style={{ overflowY: "auto" }}>
            {loading ? (
              <EmptyData />
            ) : (
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
                      REF NUMBER
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ACCOUNT
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Behaviour
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
                      AMOUNT ($)
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
                  {currentItems.map((transaction) => {
                    // Find the account names based on the IDs
                    const accountTo = accounts.find(
                      (acc) => acc.id === transaction.accountToId
                    );
                    const accountFrom = accounts.find(
                      (acc) => acc.id === transaction.accountFromId
                    );

                    return (
                      <tr key={transaction.id}>
                        <input
                          type="checkbox"
                          style={{ marginLeft: "10px", marginTop: "15px" }}
                        />
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                          {transaction.transactionReference}
                        </td>

                        <td className="px-3 py-4 whitespace-nowrap text-sm  text-gray-800">
                          {transaction.tranAccount}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                          {transaction.transactionType}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                          {new Date(
                            transaction.transactionDate
                          ).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                          {transaction.amount}
                        </td>
                        <td>
                          <Dropdown
                            overlay={renderMenu(transaction.id)}
                            trigger={["click"]}
                            visible={dropdownVisible[transaction.id]}
                            onVisibleChange={(visible) =>
                              handleDropdownVisibleChange(
                                visible,
                                transaction.id
                              )
                            }
                          >
                            <EllipsisVerticalIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {!loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "40px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginTop: "15px",
                fontSize: "12px",
                color: "#a1a1a1",
              }}
            >
              Showing {rangeStart} - {rangeEnd} of {filteredAccounts.length}{" "}
              results
            </div>
            <Pagination
              current={currentPage}
              total={transactions.length}
              pageSize={itemsPerPage}
              onChange={paginate}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Transactions;
