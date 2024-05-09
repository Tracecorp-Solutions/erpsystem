import React, { useState, useEffect } from "react";

import axios from "axios";
import { Modal, Form, Button, Dropdown, Menu } from "antd";

import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import AccountComponentSidebar from "../components/AccountComponentSidebar";

const AccountCreation = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [groups, setGroups] = useState([]);
  const [subGroupAccounts, setSubGroupAccounts] = useState([]);
  const [form] = Form.useForm();


  const [dropdownVisible, setDropdownVisible] = useState({});

  useEffect(() => {
    fetchGroups();
    fetchSubGroupAccounts();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL1}/GetAllGroupAccounts`
      );
      setGroups(response.data);
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
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", values);
      setShowModal(false);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const currentAccounts = [
    {
      id: 1,
      name: "Account 1",
      subGroupAccountId: 1,
      description: "Description for Account 1",
      balance: 1000,
    },
    {
      id: 2,
      name: "Account 2",
      subGroupAccountId: 2,
      description: "Description for Account 2",
      balance: 2000,
    },
    {
      id: 3,
      name: "Account 3",
      subGroupAccountId: 1,
      description: "Description for Account 3",
      balance: 3000,
    },
  ];

  const handleDropdownVisibleChange = (visible, accountId) => {
    setDropdownVisible({ ...dropdownVisible, [accountId]: visible });
  };

  const handleMenuClick = (e) => {
    console.log("Clicked on menu item:", e.key);
    if (e.key === "1") {
      setShowSidebar(true);
    } else {
      setDropdownVisible(false);
    }
  };


  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">View</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
      <Menu.Item key="3">Option 3</Menu.Item>
    </Menu>
  );

  return (
    <div>
       {showSidebar && <AccountComponentSidebar />}
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
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
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
                required
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
                required
                onChange={(e) =>
                  form.setFieldsValue({ accountType: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                style={{ borderRadius: "12px", padding: "15px" }}
              >
                <option value="">Select Account Type</option>
                <option value="bank">Bank</option>
                <option value="in-house">In-house</option>
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
                required
                onChange={(e) =>
                  form.setFieldsValue({ subGroupAccountId: e.target.value })
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
                htmlFor="name"
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
                id="name"
                name="name"
                required
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
                Opening Balance Date
              </label>
              <p style={{ fontFamily: "outFit, Sans-serif", color: "#a1a1a1" }}>
                This is the date when the account was created
              </p>
              <input
                type="date"
                id="balance"
                name="balance"
                required
                placeholder="Please enter account balance..."
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
                Opening Balance
              </label>
              <p style={{ fontFamily: "outFit, Sans-serif", color: "#a1a1a1" }}>
                Initial account value at creation
              </p>
              <input
                type="number"
                id="balance"
                name="balance"
                required
                placeholder="Please enter account balance..."
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
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
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
              >
                Save Account
              </button>
            </div>
          </form>
        </div>
      </Modal>
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
            {currentAccounts.map((account) => {
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
                      overlay={menu}
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
      </div>
    </div>
  );
};

export default AccountCreation;
