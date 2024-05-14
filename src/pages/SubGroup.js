import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Dropdown, Menu, Pagination, Select } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import AccountForm from "../components/EditAccountForm";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
// import AccountComponentSidebar from "../components/AccountComponentSidebar";
import "../styles/AccountCreation.css";
import AccountLoadingMessage from "../components/AccountLoadingMessage";
import SubComponentSidebar from "../components/SubGroupSidebar";
import AccountNavigationFilter from "../components/SubGroupNavigationFilter";
import SubGroupEditForm from "../components/SubGroupEditForm";

const AccountCreation = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [subGroupAccounts, setSubGroupAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    name: "",
    description: "",
    groupId: "",
  });
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [editedAccount, setEditedAccount] = useState(null);
  const [accountNameFilter, setAccountNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState([]);

  useEffect(() => {
    fetchAccounts();
    fetchSubGroupAccounts();
    fetchGroupAccount();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAccounts`
      );
      setAccounts(response.data);
      setLoading(false);
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

  const fetchGroupAccount = async () => {
    try {
      const response = await axios.get(
        "http://54.226.71.2/GetAllGroupAccounts"
      );
      setGroup(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching subGroup accounts", error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    console.log("close");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://54.226.71.2/CreateSubGroupAccount",
        newAccount
      );
      console.log(response.data);
      setNewAccount({
        name: "",
        description: "",
        groupId: "",
      });
      setShowModal(false);
      fetchSubGroupAccounts();
    } catch (error) {
      console.error("Error creating subGroup account:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({
      ...newAccount,
      [name]: value,
    });
  };

  const handleViewDetails = async (accountId) => {
    setDrawerVisible(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetSubGroupById?id=${accountId}`
      );
      setSelectedAccount(response.data);
      setDrawerVisible(true);
    } catch (error) {
      console.error("Error fetching account details:", error);
    }
  };

  const handleEdit = async (accountId) => {
    console.log("correct id", accountId);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetSubGroupById?id=${accountId}`
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
    <Menu style={{ width: "100px" }}>
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
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subGroupAccounts.slice(
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

  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length <= maxWords) {
      return text;
    }
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <div>
      {drawerVisible && (
        <SubComponentSidebar
          subGroupAccounts={selectedAccount}
          setDrawerVisible={setDrawerVisible}
          drawerVisible={drawerVisible}
          selectedAccount={selectedAccount}
          accounts={accounts}
          setShowModal={setShowModal}
        />
      )}

      {showEditForm && (
        <SubGroupEditForm
          visible={showEditForm}
          subgroup={selectedAccount}
          group={group}
          onEdit={() => {
            setShowEditForm(false);
            handleEdit();
          }}
          onCancel={CancelEdit}
        />
      )}

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
          SubGroup
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
            maxHeight: "50vh",
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
                id="subGroupId"
                name="subGroupId"
                value={newAccount.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                style={{ borderRadius: "12px", padding: "15px" }}
              >
                <option value="">Select SubGroup</option>
                {subGroupAccounts.map((subGroup) => (
                  <option
                    key={subGroup.subGroupAccount.id}
                    value={subGroup.subGroupAccount.name}
                  >
                    {subGroup.subGroupAccount.name}{" "}
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
                    DESCRIPTION
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    GROUP
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
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {account.subGroupAccount.name}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {truncateText(account.subGroupAccount.description, 6)}
                      </td>

                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {account.groupAccount.name}
                      </td>
                      <div
                        style={{
                          width: "100px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Dropdown
                          overlay={renderMenu(account.subGroupAccount.id)}
                          trigger={["click"]}
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
            total={subGroupAccounts.length}
            pageSize={itemsPerPage}
            onChange={paginate}
            showSizeChanger={false}
            style={{ marginTop: "10px", textAlign: "center" }}
          />
        </div>
      )}
    </div>
  );
};

export default AccountCreation;
