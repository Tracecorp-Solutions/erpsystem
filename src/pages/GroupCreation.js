import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";

const { Option } = Select;

export default function GroupAccount() {
  const [showForm, setShowForm] = useState(false);
  const [newAccount, setNewAccount] = useState({ name: "", behaviour: "" });
  const [groupAccounts, setGroupAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(2);
  const [formErrors, setFormError] = useState({});
  const [showEditButton, setShowEditButton] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchGroupAccounts();
  }, []);

  useEffect(() => {
    if (showForm) {
      setShowEditButton(false);
    } else {
      setShowEditButton(true);
    }
  }, [showForm]);

  const fetchGroupAccounts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAllGroupAccounts`
      );
      setGroupAccounts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching group accounts:", error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!newAccount.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    } else {
      errors.name = "";
    }

    if (!newAccount.behaviour.trim()) {
      errors.behaviour = "Behaviour is required";
      isValid = false;
    } else {
      errors.behaviour = "";
    }

    setFormError(errors);

    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/CreateGroupAccount`,
          {
            name: newAccount.name,
            behaviour: newAccount.behaviour,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response?.data) {
          setSuccessMessage("Group account created successfully.");
          setTimeout(() => {
            setSuccessMessage("");
          }, 5000);
        } else {
          console.error(
            "Error creating group account: Response data is undefined"
          );
        }

        setNewAccount({ name: "", behaviour: "" });
        toggleForm();
        fetchGroupAccounts();
      } catch (error) {
        console.error("Error creating group account:", error);
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
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGroupAccounts = groupAccounts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(groupAccounts.length / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

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
      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-1"
          role="alert"
        >
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Group Accounts
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
            <h2 className="text-lg font-semibold mb-4">
              New Group Account Form
            </h2>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={newAccount.name}
                onChange={(e) => {
                  setNewAccount({ ...newAccount, name: e.target.value });
                  setFormError({ ...formErrors, name: "" });
                }}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 p-4 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Please enter account name..."
              />
              {formErrors.name && (
                <p className="mt-2 text-sm text-red-500">{formErrors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="behaviour"
                className="block text-sm font-medium text-gray-700"
              >
                Behaviour
              </label>
              <select
                value={newAccount.behaviour}
                onChange={(e) => {
                  setNewAccount({ ...newAccount, behaviour: e.target.value });
                  setFormError({ ...formErrors, behaviour: "" });
                }}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 p-4 block w-full border-gray-300 rounded-md focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-100 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select Behaviour</option>
                <option value="Debit">Debit</option>
                <option value="Credit">Credit</option>
              </select>
              {formErrors.behaviour && (
                <p className="mt-2 text-sm text-red-500">
                  {formErrors.behaviour}
                </p>
              )}
            </div>
            <div className="flex justify-end mt-12">
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
            />
          </div>
        </div>
      )}
      {!loading && (
        <div className="mt-8 overflow-x-auto">
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
              <Option value={10}>10</Option>
              <Option value={20}>20</Option>
              <Option value={30}>30</Option>
              <Option value={40}>40</Option>
              <Option value={50}>50</Option>
            </Select>
          </div>
          <table className="table-auto min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Behaviour
                </th>
                <th scope="col" className="relative px-3 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentGroupAccounts.map((account, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {account.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {account.behaviour}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                    {showEditButton && (
                      <div className="relative">
                      <select
                        className="text-indigo-600 hover:text-indigo-900"
                        onChange={(e) => handleEdit(e.target.value)}
                        style={{
                          width: "140px",
                          height: "40px",
                          borderRadius: "0",
                          padding: "8px",
                        }}
                      >
                        <option value="">Actions</option>
                        <option value="edit">Edit</option>
                        <option value="delete">Delete</option>
                      </select>
                    </div>
                    )}
                  </td>
                </tr>
              ))}
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
                  <span className="font-medium mx-1">
                    {groupAccounts.length}
                  </span>
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
}
