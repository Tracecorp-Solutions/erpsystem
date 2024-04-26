import React, { useState, useEffect } from "react";
import axios from "axios";

const SubGroup = () => {
  const [showForm, setShowForm] = useState(false);
  const [groups, setGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [newAccount, setNewAccount] = useState({
    name: "",
    groupId: "",
    description: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [formErrors, setFormErrors] = useState({});
  const [showEditButton] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const groupsApiUrl = "http://54.226.71.2/GetAllSubGroupAccounts";
  const createAccountsApiUrl = "http://54.226.71.2/CreateSubGroupAccount";
  const allgroupApi = "http://54.226.71.2/GetAllGroupAccounts";

  useEffect(() => {
    fetchGroups();
    fetchGroupsAll();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(groupsApiUrl);
      setGroups(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const fetchGroupsAll = async () => {
    try {
      const response = await axios.get(allgroupApi);
      setAllGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
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
    } else {
      errors.name = "";
    }

    if (!newAccount.groupId.trim()) {
      errors.groupId = "Please select the group";
      isValid = false;
    } else {
      errors.groupId = "";
    }

    setFormErrors(errors);

    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await axios.post(createAccountsApiUrl, newAccount);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGroup = groups.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(groups.length / itemsPerPage);
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

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Sub groups
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
            <h2 className="text-lg font-semibold mb-4">New Sub Group Form</h2>
            <div className="mb-4">
              <label
                htmlFor="group"
                className="block text-sm font-medium text-gray-700"
              >
                Group Account*
              </label>
              <select
                value={newAccount.groupId}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, groupId: e.target.value })
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 p-4 block w-full border-gray-300 rounded-md focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-100 focus:ring-indigo-500 sm:text-sm mb-20"
              >
                <option value="">Select Group</option>
                {allGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
              {formErrors.groupId && (
                <p className="mt-2 text-sm text-red-500">
                  {formErrors.groupId}
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
                rows={5}
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
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Description
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
                {currentGroup.map((group) => (
                  <tr key={group.subGroupAccount.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {group.subGroupAccount.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {group.subGroupAccount.description}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                      {showEditButton && (
                        <a
                          href="/"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">{group.name}</span>
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {showEditButton && (
          <div className="mt-4 flex justify-center sm:mt-20">
            <nav
              className="relative z-0 inline-flex shadow-sm rounded-md -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={prevPage}
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
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubGroup;
