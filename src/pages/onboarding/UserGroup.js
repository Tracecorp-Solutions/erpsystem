import React, { useState } from "react";

const UserGroup = ({ moveToNextStep }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    moveToNextStep();
    console.log(formData);
  };

  return (
    <div
      style={{
        marginRight: "10px",
        marginTop: "15px"
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
        User Groups
      </h2>
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
              {/* Add table rows here */}
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
              Create User group
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
                  User Group Name
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
                  Enter a descriptive name to identify this group within your
                  organization
                </p>
                <input
                  type="text"
                  className="border border-gray-300 px-2 py-1 rounded-md w-full"
                  placeholder="Enter user group name"
                  style={{
                    padding: "10px",
                  }}
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
                >
                  <option value="">Choose Permission</option>
                  <option value="permission1">Permission 1</option>
                  <option value="permission2">Permission 2</option>
                  {/* Add more options as needed */}
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
            marginTop: "20px",
          }}
        >
          <button
            type="submit"
            style={{
              padding: "7px 20px 7px 20px",
              background: "#4467a1",
              borderRadius: "28px",
              color: "#fff",
              marginTop: "10px",
            }}
            onClick={handleSubmit}
          >
            Save User Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserGroup;
