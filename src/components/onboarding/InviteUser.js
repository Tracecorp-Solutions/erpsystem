import React, { useState, useEffect } from "react";
import axios from "axios";

const InviteUser = ({ moveToNextStep, loading, handleGoBack }) => {
  // State management
  const [formData, setFormData] = useState({
    emails: [],
    roleId: "",
    organisationId: 1
  });

  const [roles, setRoles] = useState([]);

  // Fetch roles on component mount
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/GetRoles`)
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.emails.length || !formData.roleId) {
      console.error("Email and roleId are required.");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/InviteUsers`, {
        emails: formData.emails,
        organisationId: formData.organisationId,
        roleId: formData.roleId,
      })
      .then((response) => {
        console.log("Invite sent successfully:", response.data);
        moveToNextStep();
      })
      .catch((error) => {
        console.error("Error sending invitation:", error);
      });
  };

  return (
    <div className="flex flex-col items-center rounded-3xl max-w-[700px] overflow-hidden p-6">
      <h2 className="text-2xl font-semibold text-neutral-600 mb-4">
        Invite Users
      </h2>
      <div className="flex flex-col bg-white rounded-xl p-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center mb-4">
          <div className="sm:w-1/2 sm:mr-4">
            <label className="block text-base font-semibold text-neutral-600 mb-1">
              Email Address
            </label>
            <p className="text-sm text-neutral-400 mb-2">
              Email addresses of the users you want to invite, separated by
              commas.
            </p>
            <input
              type="text"
              className="border border-gray-300 px-3 py-2 rounded-md w-full text-neutral-600"
              placeholder="Enter email addresses"
              value={formData.emails.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  emails: e.target.value.split(",").map((email) => email.trim())
                })
              }
            />
          </div>
          <div className="sm:w-1/2 mt-4 sm:mt-0">
            <label className="block text-base font-semibold text-neutral-600 mb-1">
              User Group Permissions
            </label>
            <p className="text-sm text-neutral-400 mb-2">
              Assign specific permissions to this group to control access and
              functionality.
            </p>
            <select
              className="border border-gray-300 px-3 py-2 rounded-md w-full text-neutral-600"
              value={formData.roleId}
              onChange={(e) =>
                setFormData({ ...formData, roleId: e.target.value })
              }
            >
              <option value="">Choose Permission</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full mt-8">
        <div className="flex gap-4 w-full max-w-md">
          <button
            className="px-8 py-3 bg-stone-100 text-neutral-600 rounded-3xl border border-stone-300 font-semibold hover:bg-stone-200"
            onClick={handleGoBack}
          >
            Review Company
          </button>
          <button
            className="px-8 py-3 bg-blue-600 text-white rounded-3xl border border-blue-700 font-semibold hover:bg-blue-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Inviting users..." : "Invite Users"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteUser;
