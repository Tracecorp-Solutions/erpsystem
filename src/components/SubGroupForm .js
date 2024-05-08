import React, { useState, useEffect } from "react";
import axios from "axios";

const SubGroupForm = ({ onCancel }) => {
  const [allGroups, setAllGroups] = useState([]);
  const [newAccount, setNewAccount] = useState({
    name: "",
    groupId: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    fetchAllGroups();
  }, []);

  const fetchAllGroups = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAllGroupAccounts`
      );
      setAllGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!newAccount.name.trim()) {
      errors.name = "Account name is required";
      isValid = false;
    }

    if (!newAccount.groupId.trim()) {
      errors.groupId = "Please select the group";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/CreateSubGroupAccount`,
          newAccount
        );
        setNewAccount({ name: "", groupId: "", description: "" });
        setLoading(false);
        setSuccessMessage("Sub-group created successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
        setVisible(false);
      } catch (error) {
        setErrorMessage("Error creating sub-group");
        console.error("Error creating sub-group:", error);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div>
        {successMessage && (
          <div className="text-green-500">{successMessage}</div>
        )}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <h2 style={{ fontSize: "36px" }}>Subgroup Creation</h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
          Subgroup Name
         </label>
         <p>Choose a unique name for your subgroup that reflects its purpose</p>
          <input
            type="text"
            id="name"
            value={newAccount.name}
            placeholder="Subgroup name"
            onChange={(e) =>
              setNewAccount({ ...newAccount, name: e.target.value })
            }
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
            style={{
              border: "1px solid #7a7a7a",
              borderRadius: "10px",
            }}
          />
          {formErrors.name && (
            <p className="mt-2 text-sm text-red-500">{formErrors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="group"
            className="block text-sm font-medium text-gray-700"
          >
            Group
          </label>
          <p>Select the group this subgroup belongs to</p>
          <select
            id="group"
            value={newAccount.groupId}
            onChange={(e) =>
              setNewAccount({ ...newAccount, groupId: e.target.value })
            }
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
            style={{
              border: "1px solid #7a7a7a",
              borderRadius: "10px",
            }}
          >
            <option value="">Select Group</option>
            {allGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
          {formErrors.groupId && (
            <p className="mt-2 text-sm text-red-500">{formErrors.groupId}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <p>Add a brief description to help identify this subgroup's purpose</p>
          <textarea
            id="description"
            value={newAccount.description}
            onChange={(e) =>
              setNewAccount({ ...newAccount, description: e.target.value })
            }
            placeholder="Description"
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
            style={{
              border: "1px solid #7a7a7a",
              borderRadius: "10px",
            }}
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onCancel}
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
            "          >
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
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SubGroupForm;
