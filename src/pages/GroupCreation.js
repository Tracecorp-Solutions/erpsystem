import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GroupAccount() {
  const [showForm, setShowForm] = useState(false);
  const [newAccount, setNewAccount] = useState({ name: "", behaviour: "" });
  const [error, setError] = useState(null);
  const [groupAccounts, setGroupAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    fetchGroupAccounts();
  }, []);

  const fetchGroupAccounts = async () => {
    try {
      const response = await axios.get(
        "http://54.226.71.2/GetAllGroupAccounts"
      );
      setGroupAccounts(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching group accounts:", error);
      setError("Failed to fetch group accounts. Please try again later.");
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://54.226.71.2/CreateGroupAccount",
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
        console.log("Group account created:", response.data);
      } else {
        console.error(
          "Error creating group account: Response data is undefined"
        );
        setError("Error creating group account: Response data is undefined");
      }

      setNewAccount({ name: "", behaviour: "" });
      toggleForm();
      fetchGroupAccounts();
    } catch (error) {
      console.error("Error creating group account:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while creating group account"
      );
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGroupAccounts = groupAccounts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(groupAccounts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
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
                onChange={(e) =>
                  setNewAccount({ ...newAccount, name: e.target.value })
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Please enter account name..."
              />
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
                onChange={(e) =>
                  setNewAccount({ ...newAccount, behaviour: e.target.value })
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-100 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select Behaviour</option>
                <option value="Debit">Debit</option>
                <option value="Credit">Credit</option>
              </select>
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
          <div class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!loading && (
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold                     text-gray-900"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Behaviour
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {currentGroupAccounts.map((account, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {account.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {account.behaviour}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit<span className="sr-only">{account.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <nav
                className="relative z-0 inline-flex shadow-sm rounded-md -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  Previous
                </button>
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === number
                        ? "text-indigo-600 bg-indigo-100"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentGroupAccounts.length < itemsPerPage}
                  className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  Next
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    );
  }
  
