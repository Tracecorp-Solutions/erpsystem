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
import AccountCreationForm from "../components/AccountForm";

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
  const [loading, setLoading] = useState(true);

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
      console.log(response.data);
      setNewAccount({
        name: "",
        subGroupAccountId: "",
        balance: 0,
        description: "",
        openingBalanceDate: "",
      });
      fetchAccounts();
      setTimeout(() => {}, 5000);
      setShowModal(false);
    } catch (error) {
      console.error("Validation failed:", error);
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
      <AccountCreationForm showModal={showModal} subGroupAccounts={subGroupAccounts} setNewAccount={setNewAccount} newAccount={newAccount} handleSubmit={handleSubmit} handleCancel={handleCancel} />
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
                    0PENING BALANCE
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
                        {account.name}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {account.accountNumber}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {subGroupInfo
                          ? subGroupInfo.subGroupAccount.name
                          : "N/A"}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {account.accountType}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${account.balance}
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
