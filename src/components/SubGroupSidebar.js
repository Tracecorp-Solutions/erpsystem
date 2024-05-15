import React, { useState } from "react";
import { Drawer, Modal, Table, Pagination } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function SubComponentSidebar({
  setDrawerVisible,
  drawerVisible,
  selectedAccount,
  accounts,
  subGroupData,
  group,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [newAccount, setNewAccount] = useState({
    name: "",
    subGroupAccountId: "",
    accountType: "",
    accountNumber: "",
    balance: 0,
    description: "",
    openingBalanceDate: "",
  });

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const subgroupAccounts = selectedAccount
    ? accounts.filter(
        (account) => account.subGroupAccountId === selectedAccount.id
      )
    : [];

  const pageSize = 4;
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = subgroupAccounts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({
      ...newAccount,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://3.216.182.63:8095/accounts",
        newAccount
      );
      console.log(response.data);
      setNewAccount({
        name: "",
        description: "",
        groupId: "",
      });
      handleCloseDrawer();
    } catch (error) {
      console.error("Error creating subGroup account:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        onClose={handleCloseDrawer}
        visible={drawerVisible}
        width={400}
        style={{ height: "100vh", overflow: "auto" }}
      >
        <div className="px- text-end">
          <button
            type="button"
            onClick={handleCloseDrawer}
            className="relative rounded-md text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="absolute -inset-2.5" />
            <span className="sr-only">Close panel</span>
            <XMarkIcon className="h-10 w-10" aria-hidden="true" />
          </button>
          <h2
            style={{
              fontFamily: "outFit, Sans-serif",
              fontSize: "36px",
              fontWeight: "600",
              textAlign: "start",
            }}
          >
            {selectedAccount && selectedAccount.name
              ? selectedAccount.name
              : ""}
          </h2>
          <p style={{ textAlign: "start", fontFamily: "Sans-serif" }}>
            {selectedAccount ? selectedAccount.description : ""}
          </p>
        </div>
        {subgroupAccounts.length > 0 ? (
          <div
            style={{
              border: "1px solid #7a7a7a",
              marginTop: "10px",
              padding: "10px",
              borderRadius: "24px",
            }}
          >
            <h3
              className="text-lg font-semibold mb-2"
              style={{
                color: "#4467a1",
                fontFamily: "outFit, Sans-serif",
                fontSize: "24",
              }}
            >
              Accounts
            </h3>
            <div className="overflow-x-auto">
              <table className="table-auto min-w-full divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NAME
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CREATED
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((account) => (
                    <tr key={account.id}>
                      <td className="px-3 py-4 whitespace-nowrap text-sm  text-gray-500">
                        {account.name}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(
                          account.openingBalanceDate
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={subgroupAccounts.length}
              onChange={handlePageChange}
              style={{ marginTop: "10px", textAlign: "center" }}
            />
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              marginTop: "15px",
              background: "#f6f6f4",
              padding: "20px",
              borderRadius: "24px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src="../images/Group.jpg" width={150} />
            </div>
            <h2
              style={{
                marginTop: "10px",
                fontWeight: "600",
                fontSize: "24px",
                fontFamily: "Sans-serif",
              }}
            >
              Let's keep organizing!
            </h2>
            <p style={{ marginTop: "10px", fontFamily: "sans-serif" }}>
              You haven't created any accounts under Long-Term Assets yet.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="button"
                style={{
                  marginTop: "15px",
                  borderRadius: "24px",
                  padding: "7px 15px 7px 15px",
                  background: "#4467a1",
                  color: "#fff",
                  fontFamily: "outFit, Sans-serif",
                }}
                onClick={handleOpenModal}
              >
                + Create Account
              </button>
            </div>
          </div>
        )}
        <Modal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
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
                  htmlFor="accountNumber"
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
                  id="accountNumber"
                  name="accountNumber"
                  value={newAccount.accountNumber}
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
                {subGroupData.map((subGroup) => (
                  <option
                    key={subGroup.subGroupAccount.id}
                    value={subGroup.subGroupAccount.id}
                  >
                    {subGroup.subGroupAccount.name}
                  </option>
                ))}
              </select>
            </div>
            {newAccount.accountType !== "InHouse" && (
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
                    balance: e.target.value,
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
                    description: e.target.value,
                  })
                }
                placeholder="Please enter description..."
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                style={{ borderRadius: "12px", padding: "15px" }}
              ></textarea>
            </div>
          </form>
          <div className="flex justify-between">
            <button
              type="button"
              className="py-2 px-4 text-gray-700 rounded focus:outline-none"
              style={{
                borderRadius: "28px",
                fontFamily: "outFit, Sans-serif",
                width: "40%",
                border: "#505050 1px solid",
              }}
              onClick={handleCloseDrawer}
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
      </Drawer>
    </>
  );
}
