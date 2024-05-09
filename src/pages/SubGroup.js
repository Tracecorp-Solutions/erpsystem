import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import SubSidebar from "../components/SubSidebar ";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

const { Option } = Select;

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
  const [itemsPerPage, setitemsPerPage] = useState(2);
  const [formErrors, setFormErrors] = useState({});
  const [showEditButton, setShowEditButton] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
    fetchGroupsAll();
  }, []);


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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

  const handleEdit = async (action, id, group) => {
    if (!group) {
      console.error("Group not found");
      return;
    }

    if (action === "edit") {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/EditSubGroupAccount`,
          {
            id: group.subGroupAccount.id,
            name: group.subGroupAccount.name,
            description: group.subGroupAccount.description,
            groupId: group.subGroupAccount.groupId,
            dateCreated: group.subGroupAccount.dateCreated,
          }
        );
        console.log("Edit action triggered");
      } catch (error) {
        console.error("Error editing sub-group:", error);
      }
    }

    if (action === "delete") {
      console.log("Deleted action triggered");
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

  const handleItemsPerPageChange = (value) => {
    setitemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-700">
            Subgroups
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={toggleForm}
            className="block rounded-xl bg-green-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            + New Subgroup
          </button>
        </div>
      </div>
      {showForm && (
        <div className="absolute mt-14 inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg max-w-md w-full mx-2">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              New SubGroup Form
            </h2>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
                style={{ fontFamily: "outfit, sans-serif" }}
              >
                SubGroup Name
              </label>
              <h6
                className="block text-xs font-medium text-gray-400"
                style={{ fontFamily: "outfit, sans-serif" }}
              >
                Choose a name for your subgroup
              </h6>
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
            <div className="mb-2">
              <label
                htmlFor="group"
                className="block text-sm font-medium text-gray-700"
                style={{ fontFamily: "outfit, sans-serif" }}
              >
                Group Account
              </label>
              <h6
                className="block text-xs font-medium text-gray-400"
                style={{ fontFamily: "outfit, sans-serif" }}
              >
                Select a group this subgroup belongs to
              </h6>
              <select
                value={newAccount.groupId}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, groupId: e.target.value })
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 p-4 block w-full border-gray-300 rounded-md focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-100 focus:ring-indigo-500 sm:text-sm mb-8"
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

            <div className="mb-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
                style={{ fontFamily: "outfit, sans-serif" }}
              >
                Description
              </label>
              <h6
                className="block text-xs font-medium text-gray-400"
                style={{ fontFamily: "outfit, sans-serif" }}
              >
                Add a description that explains this subgroup
              </h6>
              <textarea
                name="description"
                id="description"
                value={newAccount.description}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, description: e.target.value })
                }
                rows={3}
                cols={3}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 p-4 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Please enter description..."
              />
              {formErrors.description && (
                <p className="mt-2 text-sm text-red-500">
                  {formErrors.description}
                </p>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={toggleForm}
                className="flex-1 px-4 py-2 bg-gray-400 text-gray-700 rounded-xl text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                style={{ fontFamily: "outfit, sans-serif" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                style={{ fontFamily: "outfit, sans-serif" }}
                className="flex-1 ml-3 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
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
      {/* {loading && <SubSidebar />} */}
      {!loading && (
        <div className="mt-8 overflow-x-auto">
          {!showForm && (
            <div className="mt-4 mb-2">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                style={{ fontFamily: "outfit, sans-serif" }}
              >
                Items Per Page:
              </label>
              <Select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="w-24"
              >
               
                <Option value={10}>10</Option>
                <Option value={20}>20</Option>
                <Option value={30}>30</Option>
                <Option value={40}>40</Option>
                <Option value={50}>50</Option>
              </Select>
            </div>
          )}
          <table className="table-auto min-w-full divide-y divide-gray-200 bg-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-sm font-semibold text-gray-700"
                  style={{ fontFamily: "outfit, sans-serif" }}
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-sm font-semibold text-gray-700"
                  style={{ fontFamily: "outfit, sans-serif" }}
                >
                  Group
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-sm font-semibold text-gray-700"
                  style={{ fontFamily: "outfit, sans-serif" }}
                >
                  Description
                </th>
                {/* <th scope="col" className="relative px-3 py-3">
                  <span
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-900"
                    style={{ fontFamily: "outfit, sans-serif" }}
                  >
                    ACTIONS
                  </span>
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-gray-100 divide-y divide-gray-100">
              {currentGroup.map((group) =>
                group?.subGroupAccount && group?.groupAccount ? (
                  <tr key={group?.subGroupAccount?.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {group?.subGroupAccount?.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {group?.groupAccount?.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {group?.subGroupAccount?.description}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pr-4 text-left-4 text-sm font-medium">
                      <Menu as="div" className="relative flex-none">
                        <Menu.Button className="-m-2.5 block p-2.5 text-gray-700 hover:text-gray-700">
                          <span className="sr-only">Open options</span>
                          <EllipsisVerticalIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute left-0 z-6 mt-2 mr-6 w-24  origin-top-left rounded-md bg-gray-300 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-50" : "",
                                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                                  )}
                                >
                                  View 
                                  <span className="sr-only">
                                    , {group.name}
                                  </span>
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-50" : "",
                                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                                  )}
                                >
                                  Edit
                                  <span className="sr-only">
                                    , {group.name}
                                  </span>
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </td>
                  </tr>
                ) : null
              )}
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
                  <span className="font-medium mx-1">{groups.length}</span>
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

export default SubGroup;
