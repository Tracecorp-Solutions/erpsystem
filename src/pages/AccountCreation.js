import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, Modal, Form, Input, Button } from "antd";

const { Option } = Select;

const AccountCreation = () => {
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [subGroupAccounts, setSubGroupAccounts] = useState([]);
  const [form] = Form.useForm();

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

  return (
    <div>
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
              display: "none"
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
                marginTop: "30px"
              }}
            >
              Account Creation
            </h3>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1"  style={{ fontFamily: "outFit, Sans-serif", fontSize: "16px", fontWeight: "600" }}>
                Account Name
              </label>
              <p className="text-gray-600 text-sm mb-1" style={{ fontFamily: "outFit, Sans-serif" }}>
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
              <label htmlFor="accountType" className="block mb-1"  style={{ fontFamily: "outFit, Sans-serif", fontSize: "16px", fontWeight: "600" }}>
                Account Type
              </label>
              <p className="text-gray-600 text-sm mb-1">This account can be a Bank account or an In-house account</p>
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
              <label htmlFor="subGroupAccountId" className="block mb-1" style={{ fontFamily: "outFit, Sans-serif", fontSize: "16px", fontWeight: "600" }}>
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
              <label htmlFor="name" className="block mb-1"  style={{ fontFamily: "outFit, Sans-serif", fontSize: "16px", fontWeight: "600" }}>
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
              <label htmlFor="balance" className="block mb-1"  style={{ fontFamily: "outFit, Sans-serif", fontSize: "16px", fontWeight: "600" }}>
                Opening Balance Date
              </label>
              <p style={{ fontFamily: "outFit, Sans-serif", color: "#a1a1a1" }}>This is the date when the account was created</p>
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
              <label htmlFor="balance" className="block mb-1"  style={{ fontFamily: "outFit, Sans-serif", fontSize: "16px", fontWeight: "600" }}>
                Opening Balance
              </label>
              <p style={{ fontFamily: "outFit, Sans-serif", color: "#a1a1a1" }}>Initial account value at creation</p>
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
              <label htmlFor="description" className="block mb-1"  style={{ fontFamily: "outFit, Sans-serif", fontSize: "16px", fontWeight: "600" }}>
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
    </div>
  );
};

export default AccountCreation;
