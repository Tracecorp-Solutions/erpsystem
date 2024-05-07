import React, { useState, useEffect } from "react";
import axios from "axios";
import { CloseOutlined } from "@ant-design/icons";
import "../styles/GroupCreation.css";
import GroupCreationShow from "../components/GroupCreationShow";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import AccountSidebar from "../components/AccountSidebar ";

const EditForm = ({ editedGroupAccount, handleSubmitEdit, closeEditForm }) => {
  const [editedAccount, setEditedAccount] = useState(editedGroupAccount);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAccount({ ...editedAccount, [name]: value });
  };

  const handleSubmit = () => {
    handleSubmitEdit(editedAccount);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="modal-content bg-white rounded-lg shadow-lg p-8">
        <span className="close absolute top-2 right-2 cursor-pointer text-gray-600" onClick={closeEditForm}>&times;</span>
        <h2 className="text-xl font-semibold mb-4">Edit Group Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input type="text" onClick={(e) => e.stopPropagation()} id="name" name="name" value={editedAccount.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="behaviour" className="block text-sm font-medium text-gray-700">Behaviour:</label>
            <input type="text" onClick={(e) => e.stopPropagation()} id="behaviour" name="behaviour" value={editedAccount.behaviour} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea id="description" onClick={(e) => e.stopPropagation()} name="description" value={editedAccount.description} onChange={handleChange} rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
          </div>
          <button type="submit" className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};



export default function GroupAccount() {
  const [showForm, setShowForm] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: "",
    behaviour: "",
    description: "",
  });
  const [groupAccounts, setGroupAccounts] = useState([]);
  const [subGroups, setSubGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormError] = useState({});
  const [showEditButton, setShowEditButton] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [editedGroupAccount, setEditedGroupAccount] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    fetchGroupAccounts();
    fetchSubGroups();
  }, []);

  useEffect(() => {
    if (showForm) {
      setShowEditButton(false);
    } else {
      setShowEditButton(true);
    }
  }, [showForm]);

  const fetchSubGroups = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAllSubGroupAccounts`
      );
      setSubGroups(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

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

  function chunkArray(array, chunkSize) {
    return Array.from(
      { length: Math.ceil(array.length / chunkSize) },
      (_, index) =>
        array.slice(index * chunkSize, index * chunkSize + chunkSize)
    );
  }

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

    if (!newAccount.description.trim()) {
      errors.description = "description is required";
      isValid = false;
    } else {
      errors.description = "";
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
            description: newAccount.description,
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

  const openEditForm = (account) => {
    setEditedGroupAccount(account);
    setShowEditForm(true);
  };

  // Function to close the edit form
  const closeEditForm = () => {
    setShowEditForm(false);
  };

  const handleEdit = (account) => {
    // Set the edited account to the clicked account
    setIsEditing(true);
    setEditedGroupAccount(account);
    // Additional logic to display edit form or modal can go here
  };

  const handleSubmitEdit = async (editedAccount) => {
    try {
      const response = await axios.post(
        'http://54.226.71.2/EditGroupAccount',
        {
          id: editedAccount.id,
          name: editedAccount.name,
          behaviour: editedAccount.behaviour,
          description: editedAccount.description
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Edit account response:', response.data);
      setIsEditing(false);
      setEditedGroupAccount(null);
      // Fetch updated group accounts
      fetchGroupAccounts();
    } catch (error) {
      console.error('Error editing group account:', error);
    }
  };
  

  const handleSeeGroup = (account) => {
    setSelectedAccount(account);
    setSidebarVisible(true);
  };

  const handleCloseSidebar = () => {
    setSelectedAccount(null);
    setSidebarVisible(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 group-container">
      {selectedAccount && sidebarVisible && (
        <AccountSidebar
          account={selectedAccount}
          onClose={handleCloseSidebar}
          showForm={showForm}
          setShowForm={setShowForm}
          subGroups={subGroups}
        />
      )}
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
            className="
            block
            rounded-md
            bg-indigo-600
            px-3
            py-2
            text-center
            text-sm
            font-semibold
            text-white
            shadow-sm
            hover:bg-indigo-500
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-indigo-600
            groupbtn
            "
          >
            <span style={{ marginRight: "10px" }}>+</span>
            Create Group
          </button>
        </div>
      </div>
      {showForm && (
        <div className="absolute mt-20 inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-xl w-full mx-4 relative">
            <div className="absolute top-0 right-0 mt-10 mr-10">
              <CloseOutlined
                style={{ cursor: "pointer" }}
                onClick={toggleForm}
              />
            </div>{" "}
            <div className="bg-white p-8 rounded-lg max-w-xl w-full mx-4">
              <h2 className="text-lg font-semibold mb-4 group-title">
                Group Creation
              </h2>
              <p className="description">
                Choose a unique name for your group that reflects its purpose
                (e.g., Assets, Liabilities, Equity, Revenue, or Expenses)
              </p>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="
                block
                text-sm
                font-medium
                text-gray-700
                label-text
                "
                >
                  Group Name
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
                  className="
                mt-1
                p-4 block
                w-full
                sm:text-sm
                rounded-md
                text-input
                focus:ring-indigo-500
                focus:border-gray-400
                focus-visible:border-indigo-500
                "
                  placeholder="Group name"
                />
                {formErrors.name && (
                  <p className="mt-2 text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="behaviour"
                  className="
                block
                text-sm
                font-medium
                text-gray-700
                label-text
                "
                >
                  Group Behaviour
                </label>
                <select
                  value={newAccount.behaviour}
                  onChange={(e) => {
                    setNewAccount({ ...newAccount, behaviour: e.target.value });
                    setFormError({ ...formErrors, behaviour: "" });
                  }}
                  className="
                mt-1
                focus:ring-indigo-500
                focus:border-indigo-500
                p-4 block
                w-full
                border-gray-300
                rounded-md
                sm:text-sm
                text-input
                "
                >
                  <option value="">Select group behavior</option>
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </select>
                {formErrors.behaviour && (
                  <p className="mt-2 text-sm text-red-500">
                    {formErrors.behaviour}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="behaviour"
                  className="
                block
                text-sm
                font-medium
                text-gray-700
                label-text
                "
                >
                  Description
                </label>
                <span className="description">
                  Add a brief description to help identify this group's purpose
                </span>
                <textarea
                  className="
              mt-1
              p-4 block
              w-full
              sm:text-sm
              rounded-md
              text-input
              focus:ring-indigo-500
              focus:border-indigo-500
              "
                  placeholder="Description"
                  value={newAccount.description}
                  onChange={(e) => {
                    setNewAccount({
                      ...newAccount,
                      description: e.target.value,
                    });
                    setFormError({ ...formErrors, description: "" });
                  }}
                />
                {formErrors.description && (
                  <p className="mt-2 text-sm text-red-500">
                    {formErrors.description}
                  </p>
                )}
              </div>
              <div className="flex justify-around mt-12">
                <button
                  type="button"
                  onClick={toggleForm}
                  className="px-4
                py-2
                text-white
                rounded-md
                text-sm
                font-semibold
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-offset-2
                focus-visible:ring-indigo-
                cancel-btn
                "
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="
                ml-3
                px-4
                py-2
                bg-indigo-600
                text-white
                rounded-md
                text-sm
                font-semibold
                hover:bg-indigo-700
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-offset-2
                focus-visible:ring-indigo-500
                save-group
                "
                >
                  Save Group
                </button>
              </div>
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
          {!showForm && groupAccounts.length === 0 ? (
            <GroupCreationShow />
          ) : (
            <div className="mt-4 mb-2">
              {!showForm && (
                <>
                  {chunkArray(groupAccounts, 2).map((column, columnIndex) => (
                    <div
                      key={columnIndex}
                      className="flex flex-col sm:flex-row"
                    >
                      {column.map((account, index) => (
                        <div
                          key={account.id}
                          className={classNames(
                            "rounded-lg overflow-hidden flex-1 mr-4 mb-4 sm:mb-0 card",
                            "lg:w-1/2"
                          )}
                          style={{ margin: "15px", background: "#fff" }}
                        >
                          <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h3
                                className="text-md font-semibold text-gray-700"
                                style={{ fontFamily: "outfit, sans-serif" }}
                              >
                                {account.name}
                              </h3>
                              <Menu as="div" className="relative ml-auto">
                                {!showForm && (
                                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">
                                      Open options
                                    </span>
                                    <EllipsisHorizontalIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </Menu.Button>
                                )}
                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={classNames(
                                            active ? "bg-gray-50" : "",
                                            "block px-3 py-1 text-sm leading-6 text-gray-700"
                                          )}
                                        >
                                          View
                                          <span className="sr-only">
                                            , {account.name}
                                          </span>
                                        </a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
  {({ active }) => (
    <div className={classNames("relative", active ? "bg-gray-50" : "")}>
      <button
        onClick={() => handleEdit(account)} // Call openEditForm function passing the current account
        className="block px-3 py-1 text-sm leading-6 text-gray-700 w-full text-left"
      >
        Edit
      </button>
      {isEditing && editedGroupAccount && (
        <div className="absolute top-full left-0 mt-1 w-full">
          <EditForm
            editedGroupAccount={editedGroupAccount}
            handleSubmitEdit={handleSubmitEdit}
            closeEditForm={closeEditForm}
          />
        </div>
      )}
    </div>
  )}
</Menu.Item>

                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </div>
                            <p
                              className="text-xs text-gray-500"
                              style={{ fontFamily: "outfit, sans-serif" }}
                            >
                              {account.description}
                            </p>
                          </div>
                          <div className="m-4 flex items-center justify-between">
                            <button
                              onClick={() => handleSeeGroup(account)}
                              className="
                              px-4 mt-3 py-2 text-blue bg-gray-200 rounded-xl text-xs font-semibold focus:outline-none hover:bg-indigo-700 hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring border border-blue-700 rounded-xs"
                              style={{
                                fontFamily: "outfit, sans-serif",
                                // color: "blue",
                              }}
                            >
                              See group
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
