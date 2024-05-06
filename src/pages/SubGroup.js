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
  const [showEditButton, setShowEditButton] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [subGroups, setSubGroups] = useState([]); // New state to store created subgroups

  useEffect(() => {
    fetchGroups();
    fetchGroupsAll();
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

  const seeSubgroup = (subgroupId) => {
    console.log(`Clicked on subgroup with ID: ${subgroupId}`);
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
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/CreateSubGroupAccount`,
          newAccount
        );
        const createdSubGroup = response.data;
        setSubGroups([...subGroups, createdSubGroup]); // Add created subgroup to state
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
          <h1
            className="text-base font-semibold leading-6 text-gray-700"
            style={{ fontFamily: "outfit, sans-serif" }}
          >
            Subgroup Creation
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={toggleForm}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            style={{ fontFamily: "outfit, sans-serif" }}
          >
            + New
          </button>
        </div>
      </div>
      {showForm && (
        <div className="absolute inset-0 bg-gray-700 mt-10 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h2
              className="text-lg font-semibold mb-6"
              style={{ fontFamily: "outfit, sans-serif" }}
            >
              Subgroup Creation
            </h2>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-800"
                style={{ fontFamily: "outfit, sans-serif" }}
              >
                Subgroup Name
              </label>
              <h5
                className="block text-xs font-small mt-2 text-gray-500"
                style={{ fontFamily: "outfit, sans-serif" }}
              >
                Choose a unique name for subgroup
              </h5>
              <input
                type="text"
                name="name"
                id="name"
                value={newAccount.name}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, name: e.target.value })
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 p-4 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Subgroup name..."
              />
              {formErrors.name && (
                <p className="mt-2 text-sm text-red-500">{formErrors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="group"
                className="block text-sm font-medium text-gray-800"
                style={{ fontFamily: "outfit, sans-serif" }}
              >
                Group Account
              </label>
              <h5
                className="block text-xs font-small mt-2 text-gray-500"
                style={{ fontFamily: "outfit, sans-serif" }}
              >
                Select a group the subgroup belongs to
              </h5>
              <select
                value={newAccount.groupId}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, groupId: e.target.value })
                }
                className="mt-1 focus:ring-indigo-200 focus:border-indigo-200 p-4 block w-full border-gray-300 rounded-md focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-100 focus:ring-indigo-200 sm:text-sm mb-6"
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
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
                style={{ fontFamily: "outfit, sans-serif" }}
              >
                Description
              </label>
              <h5
                className="block text-xs font-small text-gray-500"
                style={{ fontFamily: "outfit, sans-serif" }}
              >
                Add a description to help identify the subgroup
              </h5>
              <textarea
                name="description"
                id="description"
                value={newAccount.description}
                onChange={(e) =>
                  setNewAccount({
                    ...newAccount,
                    description: e.target.value,
                  })
                }
                rows={4}
                cols={4}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 p-4 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Please enter description..."
              />
              {formErrors.description && (
                <p className="mt-2 text-sm text-red-500">
                  {formErrors.description}
                </p>
              )}
            </div>
            <div className="flex justify-cover mt-4 w-full">
              <button
                type="button"
                onClick={toggleForm}
                className="flex-1 px-4 ml-3 py-2 text-gray bg-gray-300 rounded-xl text-xs font-semibold focus:outline-none hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring"
                style={{ fontFamily: "outfit, sans-serif" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 ml-3 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                style={{ fontFamily: "outfit, sans-serif" }}
              >
                Save Subgroup
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
        <div className="mt-8 grid grid-cols-2 gap-4">
          {subGroups.map((subGroup) => (
            <div
              key={subGroup.id}
              className="bg-gray-100 rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3
                    className="text-sm font-semibold text-gray-900"
                    style={{ fontFamily: "outfit, sans-serif" }}
                  >
                    {subGroup.name}
                  </h3>
                </div>
                <p
                  className="text-sm text-gray-500"
                  style={{ fontFamily: "outfit, sans-serif" }}
                >
                  {subGroup.description}
                </p>
              </div>
              <div className="p-4 bg-gray-100">
                <button
                
                  onClick={() => seeSubgroup(subGroup.id)}
                  className="flex-1 px-4 ml-3 py-2 text-gray bg-gray-200 rounded-xl text-xs font-semibold focus:outline-none hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring border border-blue-700 rounded-xs"
                  style={{ fontFamily: "outfit, sans-serif" }}
                >
                  See Subgroup
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubGroup;

