import React, { useState } from "react";
import { Drawer, Modal, Table } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function SubComponentSidebar({
  setDrawerVisible,
  drawerVisible,
  selectedAccount,
  accounts,
  subGroupData,
  group,
  setShowModal,
  fetchSubGroupAccounts,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const [newAccount, setNewAccount] = useState({
    name: "",
    description: "",
    groupId: "",
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

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (data) => data?.name || "N/A",
    },
    {
      title: "CREATED",
      dataIndex: "openingBalanceDate",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

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
        "http://3.216.182.63:8095/CreateSubGroupAccount",
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
            {selectedAccount && selectedAccount.name ? selectedAccount.name : ""}
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
            <Table
              columns={columns}
              dataSource={subgroupAccounts}
              pagination={false}
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
                htmlFor="subGroupId"
                className="block mb-1"
                style={{
                  fontFamily: "outFit, Sans-serif",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                SubGroup
              </label>
              <p>
                Choose a unique name for your subgroup that reflects its purpose
              </p>
              <select
                id="name"
                name="name"
                value={newAccount.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                style={{ borderRadius: "12px", padding: "15px" }}
              >
                <option value="">Select SubGroup</option>
                {subGroupData.map((subGroup) => (
                  <option
                    key={subGroup.subGroupAccount.id}
                    value={subGroup.subGroupAccount.name}
                  >
                    {subGroup.subGroupAccount.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="groupId"
                className="block mb-1"
                style={{
                  fontFamily: "outFit, Sans-serif",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Group
              </label>
              <p>Select the group this subgroup belongs to</p>
              <select
                id="groupId"
                name="groupId"
                value={newAccount.groupId}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                style={{ borderRadius: "12px", padding: "15px" }}
              >
                <option value="">Select Group</option>
                {group.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
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
              <p>
                Add a brief description to help identify this subgroup's purpose
              </p>
              <textarea
                id="description"
                name="description"
                value={newAccount.description}
                onChange={handleChange}
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
