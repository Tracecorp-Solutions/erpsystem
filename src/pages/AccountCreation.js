import React, { useState, useEffect } from "react";

import axios from "axios";
import { Modal, Form, Button, Dropdown, Menu } from "antd";

import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import AccountComponentSidebar from "../components/AccountComponentSidebar";
import AccountNavigationFilter from "../components/AccountNavigationFilter";

const AccountCreation = () => {
  const [showModal, setShowModal] = useState(false);
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
    openingBalanceDate: ""
  });
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [selectedAccount, setSelectedAccount] = useState(null);

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
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const fetchSubGroupAccounts = async () => {
    try {
      const response = await axios.get(
        "http://54.226.71.2/GetAllSubGroupAccounts"
      );
      setSubGroupAccounts(response.data);
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
      console.log(response.data);
      setNewAccount({
        name: "",
        subGroupAccountId: "",
        balance: 0,
        description: "",
        openingBalanceDate: ""
      });
      // fetchAccounts();
      setTimeout(() => {
        // setSuccessMessage("");
      }, 5000);
      setShowModal(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleViewDetails = async (accountId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/GetAccountById?id=${accountId}`);
      setSelectedAccount(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching account details:", error);
    }
  }


  const handleDropdownVisibleChange = (visible, accountId) => {
    setDropdownVisible({ ...dropdownVisible, [accountId]: visible });
  };

  const toggleSidebar = () => {
    setDrawerVisible(!drawerVisible);
    setDropdownVisible({});
  };


  const renderMenu = (accountId) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleViewDetails(accountId)}>View</Menu.Item>
      <Menu.Item key="2" onClick={() => toggleSidebar("2")}>Option 2</Menu.Item>
      <Menu.Item key="3" onClick={() => toggleSidebar("3")}>Option 3</Menu.Item>
    </Menu>
  );
  
  return (
    <div>
       {drawerVisible && <AccountComponentSidebar setDrawerVisible={setDrawerVisible} drawerVisible={drawerVisible} />}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
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
      <AccountNavigationFilter />
      <Modal visible={showModal} onCancel={handleCancel} footer={null}>
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
          name: e.target.value
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
      This account can be a Bank account or an In-house account
    </p>
    <select
      id="accountType"
      name="accountType"
      value={newAccount.accountType}
      onChange={(e) =>
        setNewAccount({
          ...newAccount,
          accountType: e.target.value
        })
      }
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      style={{ borderRadius: "12px", padding: "15px" }}
    >
      <option value="">Select Account Type</option>
      <option value="Bank">Bank</option>
      <option value="InHouse">InHouse</option>
    </select>
  </div>
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
          subGroupAccountId: e.target.value
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
          accountNumber: e.target.value
        })
      }
      placeholder="Please enter account number..."
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      style={{ borderRadius: "12px", padding: "15px" }}
    />
  </div>
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
    id="openingBalanceDate" // Updated id attribute
    name="openingBalanceDate" // Updated name attribute
    value={newAccount.openingBalanceDate}
    onChange={(e) =>
      setNewAccount({
        ...newAccount,
        openingBalanceDate: e.target.value
      })
    }
    placeholder="Please enter account balance..."
    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    style={{ borderRadius: "12px", padding: "15px" }}
  />
</div>

  {/* Opening Balance */}
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
      Opening Balance
    </label>
    <p style={{ fontFamily: "outFit, Sans-serif", color: "#a1a1a1" }}>
      Initial account value at creation
    </p>
    <input
      type="number"
      id="balance"
      name="balance"
      value={newAccount.balance}
      onChange={(e) =>
        setNewAccount({
          ...newAccount,
          balance: e.target.value
        })
      }
      placeholder="Please enter account balance..."
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      style={{ borderRadius: "12px", padding: "15px" }}
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
          description: e.target.value
        })
      }
      placeholder="Please enter description..."
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      style={{ borderRadius: "12px", padding: "15px" }}
    ></textarea>
  </div>
  <div className="flex justify-between">
    <button
      type="button"
      onClick={handleCancel}
      className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
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
</form>

        </div>
      </Modal>
     <div>
     <div style={{ overflowY: "auto" }}>
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
                SubGroup
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Balance
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {accounts.map((account) => {
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
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {account.name}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subGroupInfo ? subGroupInfo.subGroupAccount.name : "N/A"}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {account.description}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
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
overlay={renderMenu(account.id)}                      trigger={["click"]}
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
      </div>
     </div>
    </div>
  );
};

export default AccountCreation;
