// Imports section
import React, { useState, useEffect } from "react";
import axios from "axios";
// End of imports

const InviteUser = ({ moveToNextStep,loading }) => {
    // State management
  const [formData, setFormData] = useState({
    emails: [],
    roleId: "",
    organisationId: 1
  });

  const [roles, setRoles] = useState([]);

  // End of state management


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
    <div
      style={{
        marginRight: "10px",
        marginTop: "15px",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          color: "#505050",
          fontFamily: "outFit, Sans-serif",
          fontWeight: "600",
          padding: "5px",
          marginTop: "10px",
        }}
      >
        Invite Users
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          borderRadius: "14px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            borderRadius: "14px",
            background: "#fff",
            width: "100%",
            padding: "15px",
          }}
        >
          <div
            style={{
              marginBottom: "10px",
              padding: "5px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                color: "#505050",
                fontFamily: "outFit, Sans-serif",
                fontWeight: "600",
                padding: "5px",
              }}
            >
              Create Users
            </h2>
            <div
              className="flex flex-col mb-4 w-full sm:flex-row sm:items-center"
              style={{
                width: "100%",
              }}
            >
              <div className="mt-4 sm:w-1/2 sm:mr-4">
                <label
                  className="font-semibold mr-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  Email Address
                </label>
                <br />
                <p
                  style={{
                    color: "#a1a1a1",
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "14px",
                    fontWeight: "400",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  Email addresses of the users you want to invite, separated by commas.
                </p>
                <input
                  type="text"
                  className="border border-gray-300 px-2 py-1 rounded-md w-full"
                  placeholder="Enter email addresses"
                  style={{
                    padding: "10px",
                  }}
                  value={formData.emails.join(", ")}
                  onChange={(e) =>
                    setFormData({ ...formData, emails: e.target.value.split(",").map(email => email.trim()) })
                  }
                />
              </div>
              <div className="mt-4 sm:w-1/2">
                <label
                  className="font-semibold mr-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  User Group Permissions
                </label>
                <br />
                <p
                  style={{
                    color: "#a1a1a1",
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "14px",
                    fontWeight: "400",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  Assign specific permissions to this group to control access
                  and functionality
                </p>
                <select
                  className="border border-gray-300 px-2 py-1 rounded-md w-full"
                  style={{
                    padding: "10px",
                  }}
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
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            marginTop: "10px",
            marginBottom: "20px"
          }}
        >
          <button
            type="submit"
            style={{
              padding: "7px 20px 7px 20px",
              background: "#4467a1",
              borderRadius: "28px",
              color: "#fff",
            }}
            onClick={handleSubmit}
          disabled={loading}>
            { loading? "Inviting users .." : "Invite Users"}
            
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="flex justify-center"
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "24px",
            width: "100%",
            marginTop: "10px",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{
                    backgroundColor: "#F3F4F6",
                    padding: "10px",
                    textAlign: "left",
                    borderBottom: "2px solid #E5E7EB",
                  }}
                >
                  USER GROUP
                </th>
                <th
                  style={{
                    backgroundColor: "#F3F4F6",
                    padding: "10px",
                    textAlign: "left",
                    borderBottom: "2px solid #E5E7EB",
                  }}
                >
                  PERMISSION
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{ padding: "10px", borderBottom: "1px solid #E5E7EB" }}
                >
                  Example Group 1
                </td>
                <td
                  style={{ padding: "10px", borderBottom: "1px solid #E5E7EB" }}
                >
                  Example Permission 1
                </td>
              </tr>
              <tr>
                <td
                  style={{ padding: "10px", borderBottom: "1px solid #E5E7EB" }}
                >
                  Example Group 2
                </td>
                <td
                  style={{ padding: "10px", borderBottom: "1px solid #E5E7EB" }}
                >
                  Example Permission 2
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InviteUser;
