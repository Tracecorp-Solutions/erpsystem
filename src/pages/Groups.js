import React, { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";
import axios from "axios";
import { CloseOutlined, EyeOutlined } from "@ant-design/icons";
import "../styles/GroupCreation.css";
import GroupCreationShow from "../components/GroupCreationShow";
import { Fragment } from "react";
// import { Menu, Transition } from "@headlessui/react";
import { Menu, Dropdown, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import AccountSidebar from "../components/AccountSidebar ";
import GroupAccountDetails from "../components/GroupAccountDetails ";
import SlideInCard from "../components/SlideInCard ";
import FailureSlideInCard from "../components/FailureSlideInCard ";

const EditForm = ({ editedGroupAccount, handleSubmitEdit, closeEditForm }) => {
  const [editedAccount, setEditedAccount] = useState(editedGroupAccount);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAccount({ ...editedAccount, [name]: value });
  };

  const handleBehaviorChange = (e) => {
    const { value } = e.target;
    setEditedAccount({ ...editedAccount, behaviour: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitEdit(editedAccount);
  };

  return (
    <>
    <SideNav/>
     <div className="content fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 mt-10">
      <TopNav/>
      <div
        className="modal-content bg-white rounded-lg shadow-lg p-8"
        style={{
          width: "80%",
          height: "90%",
          maxWidth: "600px ",
          maxHeight: "600px",
          borderRadius: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            position: "relative",
            bottom: "25px",
          }}
        >
          <span
            className="close cursor-pointer text-gray-600"
            style={{ fontSize: "40px" }}
            onClick={closeEditForm}
          >
            &times;
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-4">Edit {editedAccount.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              onClick={(e) => e.stopPropagation()}
              id="name"
              name="name"
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
              value={editedAccount.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="behaviour"
              className="block text-sm font-medium text-gray-700"
            >
              Behaviour:
            </label>
            <select
              id="behaviour"
              name="behaviour"
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
              value={editedAccount.behaviour}
              onChange={handleBehaviorChange}
            >
              <option value="">Select group behavior</option>
              <option value="Debit">Debit</option>
              <option value="Credit">Credit</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              onClick={(e) => e.stopPropagation()}
              name="description"
              value={editedAccount.description}
              onChange={handleChange}
              rows="4"
              className="mt-1
              p-4 block
              w-full
              sm:text-sm
              rounded-md
              text-input
              focus:ring-indigo-500
              focus:border-gray-400
              focus-visible:border-indigo-500
              "
            ></textarea>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
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
            "
              style={{
                background: "#F6F6F4",
                color: "#505050",
                width: "40%",
                borderRadius: "25px",
                fontFamily: "out-fit, sans-serif"
              }}
              onClick={closeEditForm}
            >
              Cancel
            </button>
            <button
              type="submit"
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
            "
              style={{
                color: "#fff",
                width: "40%",
                borderRadius: "25px",
                fontFamily: "out-fit, sans-serif"
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
    
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
  const [showDetails, setShowDetails] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

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

       setShowSuccess(true);
        setNewAccount({ name: "", behaviour: "" });
        toggleForm();
        fetchGroupAccounts();
      } catch (error) {
        setShowFailure(true);
        console.error("Error creating group account:", error);
      }
    }
  };

  const openEditForm = (account) => {
    setEditedGroupAccount(account);
    setShowEditForm(true);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
  };

  const handleEdit = (account) => {
    setEditedGroupAccount(account);
    setShowEditForm(true);
    console.log("Editing", account);
  };

  const handleSubmitEdit = async (editedAccount) => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL+'/EditGroupAccount',
        // "http://54.226.71.2/EditGroupAccount",
        {
          id: editedAccount.id,
          name: editedAccount.name,
          behaviour: editedAccount.behaviour,
          description: editedAccount.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsEditing(false);
      setEditedGroupAccount(null);
      setShowEditForm(false);
      fetchGroupAccounts();
      setShowSuccess(true)
    } catch (error) {
      setShowFailure(true)
      setSuccessMessage("An error occurred while Editing the group account. Please try again later.")
      console.error("Error editing group account:", error);
    }
  };

  const handleSeeGroup = (account) => {
    setSelectedAccount(account);
    setSidebarVisible(!sidebarVisible);
  };

  const handleCloseSidebar = () => {
    setSelectedAccount(null);
    setSidebarVisible(false);
  };


  const handleCloseDetails = () => {
    setSelectedAccount(null);
    setShowDetails(false);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <>
    <SideNav/>
    <div className="content px-4 sm:px-6 lg:px-8 group-container">
      <TopNav/>
      {selectedAccount && sidebarVisible && (
        <AccountSidebar
          account={selectedAccount}
          onClose={handleCloseSidebar}
          showForm={showForm}
          setShowForm={setShowForm}
          subGroups={subGroups}
        />
      )}
      {showSuccess && (
        <SlideInCard
          title="Group Created!"
          message="You'v successfully created a new group. You are on your way to categorize and track your financial transactions."
          onClose={handleCloseSuccess}
        />
      )}
       {showFailure && (
        <FailureSlideInCard
        title="Creation Error!"
          message="An error occurred while creating the group account. Please try again later."
          onClose={() => setShowFailure(false)}
        />
      )}

      {/* {showFailure && (
        <FailureSlideInCard
          message="An error occurred while creating the group account. Please try again later."
          onClose={() => setShowFailure(false)}
        />
      )} */}
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
      {showEditForm && (
        <EditForm
          editedGroupAccount={editedGroupAccount}
          handleSubmitEdit={handleSubmitEdit}
          closeEditForm={closeEditForm}
        />
      )}
        {showDetails && (
        <GroupAccountDetails
          account={selectedAccount}
          onClose={handleCloseDetails}
        />
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
                              {!showEditForm && (
                                <Dropdown
                                  overlay={
                                    <Menu>
                                      <Menu.Item key="1" onClick={() => handleSeeGroup(account)}>
                                      <EyeOutlined style={{ marginRight: "5px" }} />
                                        <span>View</span>
                                      </Menu.Item>
                                      <Menu.Item
                                        key="2"
                                        onClick={() => handleEdit(account)}
                                      >
                                        <EditOutlined style={{ marginRight: "5px" }} />
                                        <span>Edit</span>
                                      </Menu.Item>
                                    </Menu>
                                  }
                                  placement="bottomRight"
                                  overlayStyle={{ width: "200px" }}
                                >
                                  <div style={{
                                        borderRadius: "50px",
                                        padding: "3px",
                                        background: "#f6f6f4"
                                      }}>
                                    <span className="sr-only">
                                      Open options
                                    </span>
                                    <EllipsisHorizontalIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </div>
                                </Dropdown>
                              )}
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
    </>
    
  );
}