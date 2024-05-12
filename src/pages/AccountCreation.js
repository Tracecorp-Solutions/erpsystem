import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";

const { Option } = Select;

const AccountCreation = () => {
  const [showForm, setShowForm] = useState(false);
  const [groups, setGroups] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    name: "",
    subGroupAccountId: "",
    balance: 0,
    description: "",
  });
  const [subGroupAccounts, setSubGroupAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(2);
  const [formErrors, setFormErrors] = useState({});
  const [showEditButton, setShowEditButton] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
    fetchAccounts();
    fetchSubGroupAccounts();
  }, []);

  useEffect(() => {
    if (showForm) {
      setShowEditButton(false);
    } else {
      setShowEditButton(true);
    }
  }, [showForm]);

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

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAccounts`
      );
      setAccounts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching accounts:", error);
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

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!newAccount.name.trim()) {
      errors.name = "Account name is required";
      isValid = false;
    }

    if (!newAccount.balance.toString().trim() || isNaN(newAccount.balance)) {
      errors.balance = "Invalid balance";
      isValid = false;
    }

    if (!newAccount.subGroupAccountId) {
      errors.subGroupAccountId = "Please select a subgroup";
      isValid = false;
    }

    setFormErrors(errors);

    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/accounts`,
          {
            name: newAccount.name,
            balance: parseFloat(newAccount.balance),
            subGroupAccountId: parseInt(newAccount.subGroupAccountId),
            description: newAccount.description,
          }
        );
        console.log(response.data);
        setNewAccount({
          name: "",
          subGroupAccountId: "",
          balance: 0,
          description: "",
        });
        fetchAccounts();
        toggleForm();
        setSuccessMessage("Account created successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } catch (error) {
        console.error("Error creating account:", error);
      }
    }
  };

  const handleEdit = (action) => {
    if (action === "edit") {
      console.log("Edit action triggered");
    }

    if (action === "delete") {
      console.log("Deleted action triggered");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccounts = accounts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(accounts.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleItemsPerPageChange = (value) => {
    setitemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Accounts
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={toggleForm}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            + New
          </button>
        </div>
      </div>
      {showForm && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-xl w-full mx-4">
            <h2 className="text-lg font-semibold mb-4">New Account Form</h2>
            <div className="mb-4">
              <label
                htmlFor="group"
                className="block text-sm font-medium text-gray-700"
              >
                SubGroup*
              </label>
              <select
                value={newAccount.subGroupAccountId}
                onChange={(e) =>
                  setNewAccount({
                    ...newAccount,
                    subGroupAccountId: parseInt(e.target.value),
                  })
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 p-4 block w-full border-gray-300 rounded-md focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-100 focus:ring-indigo-500 sm:text-sm mb-20"
              >
                <option value="">Select SubGroup</option>
                {subGroupAccounts.map((subGroup) => (
                  <option
                    key={subGroup.subGroupAccount.id}
                    value={subGroup.subGroupAccount.id.toString()}
                  >
                    {subGroup.subGroupAccount.name}
                  </option>
                ))}
              </select>

              {formErrors.subGroupAccountId && (
                <p className="mt-2 text-sm text-red-500">
                  {formErrors.subGroupAccountId}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name*
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={newAccount.name}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, name: e.target.value })
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 p-4 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Please enter account name..."
              />
              {formErrors.name && (
                <p className="mt-2 text-sm text-red-500">{formErrors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="balance"
                className="block text-sm font-medium text-gray-700"
              >
                Opening Bal*
              </label>
              <input
                type="text"
                name="balance"
                id="balance"
                value={newAccount.balance}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, balance: e.target.value })
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 p-4 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Please enter account balance..."
              />
              {formErrors.balance && (
                <p className="mt-2 text-sm text-red-500">
                  {formErrors.balance}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={newAccount.description}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, description: e.target.value })
                }
                rows={2}
                cols={5}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 p-4 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Please enter description..."
              />
              {formErrors.description && (
                <p className="mt-2 text-sm text-red-500">
                  {formErrors.description}
                </p>
              )}
            </div>
            <div className="flex justify-end mt-20">
              <button
                type="button"
                onClick={toggleForm}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="ml-3 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-700">
          {successMessage}
        </div>
      )}
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <div className="spinner-grow bg-gray-900 animate-spin" role="status">
            <img
              className="h-20 w-20"
              src="https://www.tracecorpsolutions.com/wp-content/uploads/2019/05/Tracecorp-logo.png"
              alt="TraceCorp"
            />{" "}
          </div>
        </div>
      )}
      {!loading && (
        <div className="mt-8 overflow-x-auto">
         { !showForm && (
           <div className="mt-4 mb-2">
           <label className="block text-sm font-medium text-gray-700 mb-2">
             Items Per Page:
           </label>
           <Select
             value={itemsPerPage}
             onChange={handleItemsPerPageChange}
             className="w-24"
           >
             <Option value={2}>2</Option>
             <Option value={5}>5</Option>
             <Option value={10}>10</Option>
             <Option value={20}>20</Option>
             <Option value={30}>30</Option>
             <Option value={40}>40</Option>
             <Option value={50}>50</Option>
           </Select>
         </div>
         )}
          <table className="table-auto min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
                    <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {showEditButton && (
                        <div className="mb-4 md:w-3/4">
                          <Select
                            id="vendor"
                            className="w-full"
                            onChange={(value) => handleEdit(value)}
                            bordered={false}
                          >
                            <Option value="vendor1">Edit</Option>
                            <Option value="vendor2">Delete</Option>
                          </Select>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {showEditButton && (
            <nav
              className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                  Showing
                  <span className="font-medium mx-1">
                    {indexOfFirstItem + 1}
                  </span>
                  to
                  <span className="font-medium mx-1">{indexOfLastItem}</span>
                  of
                  <span className="font-medium mx-1">{accounts.length}</span>
                  results
                </p>
              </div>
              <div className="flex-1 flex justify-between sm:justify-end">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </nav>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountCreation;
