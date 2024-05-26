import React, { useState, useRef } from "react";

const UserGroup = ({ moveToNextStep }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];

  //   console.log("Selected file:", file)
  // }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    moveToNextStep();
    console.log(formData);
  };

  return (
    <div
      style={{
        marginRight: "10px",
      }}
    >
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
            padding: "10px",
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
          }}
        >
          <div
            style={{
              marginBottom: "10px",
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
                <label className="font-semibold mr-2">Text 1:</label>
                <br />
                <input
                  type="text"
                  className="border border-gray-300 px-2 py-1 rounded-md w-full"
                />
              </div>
              <div className="mt-4 sm:w-1/2">
                <label className="font-semibold mr-2">Text 2:</label>
                <br />
                <input
                  type="text"
                  className="border border-gray-300 px-2 py-1 rounded-md w-full"
                />
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
            width: "80%",
            display: "flex",
            justifyContent: "end",
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
