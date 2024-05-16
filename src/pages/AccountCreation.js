import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Dropdown, Menu, Pagination } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import AccountForm from "../components/EditAccountForm";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import AccountComponentSidebar from "../components/AccountComponentSidebar";
import AccountNavigationFilter from "../components/AccountNavigationFilter";
import "../styles/AccountCreation.css";
import AccountLoadingMessage from "../components/AccountLoadingMessage";
import SlideInCard from "../components/SlideInCard ";

const AccountCreation = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [subGroupAccounts, setSubGroupAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    name: "",
    subGroupAccountId: "",
    accountType: "",
    accountNumber: "",
    balance: 0,
    description: "",
    openingBalanceDate: "",
  });
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [editedAccount, setEditedAccount] = useState(null);
  const [accountNameFilter, setAccountNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [messageInfo, setMessageInfo] = useState({ title: "", message: "" });

  useEffect(() => {
    fetchAccounts();
    fetchSubGroupAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAccounts`
      );
      setAccounts(response.data);
      console.log("get accounts", response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const fetchSubGroupAccounts = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/GetAllSubGroupAccounts"
        // "http://54.226.71.2/GetAllSubGroupAccounts"
      );
      setSubGroupAccounts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching subGroup accounts", error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/accounts`,
        {
          name: newAccount.name,
          balance: parseFloat(newAccount.balance),
          accountType: newAccount.accountType,
          subGroupAccountId: parseInt(newAccount.subGroupAccountId),
          accountNumber: newAccount.accountNumber,
          description: newAccount.description,
          openingBalanceDate: newAccount.openingBalanceDate,
        }
      );
      setErrorMessage("");
      setNewAccount({
        name: "",
        subGroupAccountId: "",
        balance: 0,
        description: "",
        openingBalanceDate: "",
        accountNumber: "",
      });
      setShowSuccess(true)
      fetchAccounts();
      setShowModal(false);
      setMessageInfo({
        title: "Account Created!",
        message: "Account created successfully."
      })
    } catch (error) {
      console.error("Validation failed:", error);
      setErrorMessage("Failed to create account.");
      setSuccessMessage(""); // Reset success message
    }
  };

  const handleEditSubmit = async (e) => {
    console.log("aoo", editedAccount);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/UpdateAccountDetails`,
        editedAccount
      );
      setShowSuccess(true)
      setShowEditForm(false);
      setMessageInfo({
        title: "Account Updated!",
        message: "Account updated successfully."
      })
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const handleViewDetails = async (accountId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAccountById?id=${accountId}`
      );
      setSelectedAccount(response.data);
      setDrawerVisible(true);
    } catch (error) {
      console.error("Error fetching account details:", error);
    }
  };

  const handleDropdownVisibleChange = (visible, accountId) => {
    setDropdownVisible({ ...dropdownVisible, [accountId]: visible });
  };

  const handleEdit = async (accountId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAccountById?id=${accountId}`
      );
      setSelectedAccount(response.data);
      setEditedAccount(response.data);
      setShowEditForm(true);
    } catch (error) {
      console.error("Error fetching account details for edit:", error);
    }
  };

  const CancelEdit = () => {
    setShowEditForm(false);
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
      <Menu.Item
        key="2"
        onClick={() => handleEdit(accountId)}
        icon={<EditOutlined />}
      >
        Edit
      </Menu.Item>
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
  const currentItems = filteredAccounts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

  const rangeStart = (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = Math.min(
    currentPage * itemsPerPage,
    filteredAccounts.length
  );

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <div>
       {showSuccess && <SlideInCard title={messageInfo.title} message={messageInfo.message} onClose={handleCloseSuccess}/>}
      {drawerVisible && (
        <AccountComponentSidebar
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
          Accounts
        </h2>
        <Button
          type="primary"
          onClick={() => setShowModal(true)}
          style={{
            background: "#4467a1",
            borderRadius: "28px",
            fontFamily: "outFit, Sans-serif",
          }}
        >
          + Create Account
        </Button>
      </div>
      <Modal visible={showEditForm} onCancel={CancelEdit} footer={null}>
        <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <AccountForm
            accountData={selectedAccount}
            editedAccount={editedAccount}
            setEditedAccount={setEditedAccount}
            handleSubmit={handleEditSubmit}
            CancelEdit={() => setShowEditForm(false)}
            subGroupAccounts={subGroupAccounts}
          />
        </div>
      </Modal>
      {!loading && (
        <AccountNavigationFilter
          accountNameFilter={accountNameFilter}
          setAccountNameFilter={setAccountNameFilter}
        />
      )}
      <Modal visible={showModal} onCancel={handleCancel} footer={null}>
        <h3
          style={{
            color: "#505050",
            fontFamily: "outFit, Sans-serif",
            fontSize: "25px",
            marginTop: "30px",
          }}
        >
          Account Creation
        </h3>
        <div
          style={{
            maxHeight: "70vh",
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
                htmlFor="name"
                className="block mb-1"
                style={{
                  fontFamily: "outFit, Sans-serif",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Account Name
              </label>
              <p
                className="text-gray-600 text-sm mb-1"
                style={{ fontFamily: "outFit, Sans-serif" }}
              >
                Choose a unique name for your account that reflects its purpose
              </p>
              <input
                type="text"
                id="name"
                name="name"
                value={newAccount.name}
                onChange={(e) =>
                  setNewAccount({
                    ...newAccount,
                    name: e.target.value,
                  })
                }
                placeholder="Please enter account name..."
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                style={{ borderRadius: "12px", padding: "15px" }}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="accountType"
                className="block mb-1"
                style={{
                  fontFamily: "outFit, Sans-serif",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Account Type
              </label>
              <p className="text-gray-600 text-sm mb-1">
                This account can be a Bank account or cash at hand account
              </p>
              <select
                id="accountType"
                name="accountType"
                value={newAccount.accountType}
                onChange={(e) =>
                  setNewAccount({
                    ...newAccount,
                    accountType: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                style={{ borderRadius: "12px", padding: "15px" }}
              >
                <option value="">Select Account Type</option>
                <option value="Bank">Bank</option>
                <option value="Cash at hand">Cash at hand</option>
              </select>
            </div>

            {newAccount.accountType === "Bank" && (
              <div className="mb-4">
                <label
                  htmlFor="bankName"
                  className="block mb-1"
                  style={{
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Enter Bank Name
                </label>
                <p className="text-gray-600 text-sm mb-1">
                  Register the exact name of the bank the account belongs to.
                </p>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  onChange={(e) =>
                    setNewAccount({
                      ...newAccount,
                      accountNumber: e.target.value,
                    })
                  }
                  placeholder="Please enter bank name..."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  style={{ borderRadius: "12px", padding: "15px" }}
                />
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="subGroupAccountId"
                className="block mb-1"
                style={{
                  fontFamily: "outFit, Sans-serif",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                SubGroup
              </label>
              <p>Select the subgroup this account belongs to</p>
              <select
                id="subGroupAccountId"
                name="subGroupAccountId"
                value={newAccount.subGroupAccountId}
                onChange={(e) =>
                  setNewAccount({
                    ...newAccount,
                    subGroupAccountId: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                style={{ borderRadius: "12px", padding: "15px" }}
              >
                <option value="">Select SubGroup</option>
                {subGroupAccounts.map((subGroup) => (
                  <option
                    key={subGroup.subGroupAccount.id}
                    value={subGroup.subGroupAccount.id}
                  >
                    {subGroup.subGroupAccount.name}
                  </option>
                ))}
              </select>
            </div>
            {newAccount.accountType !== "Cash at hand" && (
              <div className="mb-4">
                <label
                  htmlFor="accountNumber"
                  className="block mb-1"
                  style={{
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Account Number
                </label>
                <p className="text-gray-600 text-sm mb-1">
                  To ensure accurate tracking of transactions
                </p>
                <input
                  type="number"
                  id="accountNumber"
                  name="accountNumber"
                  value={newAccount.accountNumber}
                  onChange={(e) =>
                    setNewAccount({
                      ...newAccount,
                      accountNumber: e.target.value,
                    })
                  }
                  placeholder="Please enter account number..."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  style={{ borderRadius: "12px", padding: "15px" }}
                />
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="balance"
                className="block mb-1"
                style={{
                  fontFamily: "outFit, Sans-serif",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Opening Date
              </label>
              <p style={{ fontFamily: "outFit, Sans-serif", color: "#a1a1a1" }}>
                Initial account value at creation
              </p>
              <input
                type="date"
                id="openingBalanceDate"
                name="openingBalanceDate"
                value={newAccount.openingBalanceDate}
                onChange={(e) =>
                  setNewAccount({
                    ...newAccount,
                    openingBalanceDate: e.target.value,
                  })
                }
                placeholder="Please enter account balance..."
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                style={{ borderRadius: "12px", padding: "15px" }}
              />
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
                Opening balance
              </label>
              <p
                className="text-gray-500 text-xs mb-2"
                style={{ fontFamily: "outFit, Sans-serif" }}
              >
                Amount being deposited
              </p>

              <input
                type="number"
                id="balance"
                name="balance"
                value={newAccount.balance !== 0 ? newAccount.balance : ""}
                onChange={(e) =>
                  setNewAccount({
                    ...newAccount,
                    balance: e.target.value,
                  })
                }
                placeholder="Please enter account balance..."
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                style={{
                  borderRadius: "12px",
                  padding: "15px",
                  appearance: "textfield",
                }}
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block mb-1"
                style={{
                  fontFamily: "outFit, Sans-serif",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newAccount.description}
                onChange={(e) =>
                  setNewAccount({
                    ...newAccount,
                    description: e.target.value,
                  })
                }
                placeholder="Please enter description..."
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                style={{ borderRadius: "12px", padding: "15px" }}
              ></textarea>
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
            Save Account
          </button>
        </div>
      </Modal>
      <div>
        <div style={{ overflowY: "auto" }}>
          {loading ? (
            <AccountLoadingMessage />
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
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ACCOUNT NO
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    SubGroup
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ACCOUNT TYPE
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    BALANCE ($)
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
                {currentItems.map((account) => {
                  const subGroupInfo = subGroupAccounts.find(
                    (subGroup) =>
                      subGroup.subGroupAccount.id === account.subGroupAccountId
                  );

                  return (
                    <tr key={account.id}>
                      <input
                        type="checkbox"
                        style={{ marginLeft: "10px", marginTop: "15px" }}
                      />
                      <td className="px-3 py-4 whitespace-nowrap text-sm  text-gray-800">
                        {account.name}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                        {account.accountNumber}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                        {subGroupInfo
                          ? subGroupInfo.subGroupAccount.name
                          : "N/A"}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                        {account.accountType}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                        {account.balance}
                      </td>
                      <div
                        style={{
                          width: "100px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Dropdown
                          overlay={renderMenu(account.id)}
                          trigger={["click"]}
                          visible={dropdownVisible[account.id]}
                          onVisibleChange={(visible) =>
                            handleDropdownVisibleChange(visible, account.id)
                          }
                        >
                          <EllipsisVerticalIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </Dropdown>
                      </div>
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
            total={filteredAccounts.length}
            pageSize={itemsPerPage}
            onChange={paginate}
          />
        </div>
      )}
    </div>
  );
};

export default AccountCreation;
