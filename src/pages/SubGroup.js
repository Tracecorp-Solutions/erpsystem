import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Dropdown, Menu, Pagination } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import AccountForm from "../components/SubEditAccountForm";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import AccountComponentSidebar from "../components/SubGroupSidebar";
import AccountNavigationFilter from "../components/SubGroupNavigationFilter";
import "../styles/AccountCreation.css";
import AccountLoadingMessage from "../components/SubAccountLoadingMessage";

const SubGroup = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [groups, setGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [subGroupAccounts, setSubGroupAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    name: "",
    groupId: "",
    description: "",
  });
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [editedAccount, setEditedAccount] = useState(null);
  const [accountNameFilter, setAccountNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditButton, setShowEditButton] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [itemsPerPage] = useState(3);
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchGroups();
    fetchGroupsAll();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAllSubGroupAccounts`
      );
      setGroups(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const fetchGroupsAll = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAllGroupAccounts`
      );
      setAllGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const [currentGroup, setCurrentGroup] = useState(null);

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/CreateSubGroupAccount`,
          newAccount
        );
        setNewAccount({ name: "", groupId: "", description: "" });
        toggleForm();
        setSuccessMessage("Sub-group created successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } catch (error) {
        console.error("Error creating sub-group:", error);
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/EditSubGroupAccount`,
        editedAccount
      );
      console.log("Account updated:", response.data);
      setShowEditForm(false);
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

  const toggleForm = () => {};

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!newAccount.name.trim()) {
      errors.name = "Account name is required";
      isValid = false;
    } else {
      errors.name = "";
    }

    if (!newAccount.groupId.trim()) {
      errors.groupId = "Please select the group";
      isValid = false;
    } else {
      errors.groupId = "";
    }

    setFormErrors(errors); // Set form errors based on validation
    return isValid;
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

  const filteredAccounts = accounts.filter((account) =>
    account.name.toLowerCase().includes(accountNameFilter.toLocaleLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredAccounts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const rangeStart = (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = Math.min(
    currentPage * itemsPerPage,
    filteredAccounts.length
  );

  return (
    <div>
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
          + Create SubGroup
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
          SubGroup Creation
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
                SubGroup Name
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
                htmlFor="group"
                className="block text-sm font-medium text-gray-700"
                style={{
                  fontFamily: "outFit, Sans-serif",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Group Account*
              </label>
              <p>Select the group this SubGroup belongs to</p>
              <select
                value={newAccount.groupId}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, groupId: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                style={{ borderRadius: "12px", padding: "15px" }}
              >
                <option value="">Select Group</option>
                {allGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
              {formErrors.groupId && ( // Check if there is an error message for the groupId field
                <p className="mt-2 text-sm text-red-500">
                  {formErrors.groupId} // Display the error message
                </p>
              )}
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
                    Description
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
                {currentGroup ? (
                  currentGroup.map((group) => (
                    <tr key={group.subGroupAccount.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {group.subGroupAccount.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {group.groupAccount.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {group.subGroupAccount.description}
                      </td>
                      
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No data available</td>
                  </tr>
                )}
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

export default SubGroup;
