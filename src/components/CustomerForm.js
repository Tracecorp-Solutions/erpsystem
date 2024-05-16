import React, { useState } from "react";
import { Modal, Button, Progress } from "antd";
import axios from "axios";

const CustomerForm = ({ showModal }) => {
  const [newVendor, setNewVendor] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    email: "",
    company: "",
    phone: "",
    mobile: "",
    fax: "",
    other: "",
    website: "",
    address: {
      street: "",
      city: "",
      zipCode: "",
      country: "",
    },
    billingRate: 0,
    openingBalance: 0,
    openingBalanceDate: new Date().toISOString(),
    notes: "",
    businessIdNo: "",
    status: "",
  });

  const [section, setSection] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const totalSections = 2;

  const handleSubmit = async () => {
    try {
      const createVendorApiUrl = "http://3.216.182.63:8095/CreateVendor";
      await axios.post(createVendorApiUrl, newVendor);
      setNewVendor({ ...newVendor, title: "" });
    } catch (error) {
      console.error("Error creating vendor:", error);
      setErrorMessage("Failed to create vendor. Please try again later.");
    }
  };

  const handleContinue = () => {
    setSection(section + 1);
  };

  const handleBack = () => {
    setSection(section - 1);
  };

  return (
    <Modal
      title="Add Vendor"
      visible={showModal}
      footer={null}
      onCancel={() => setNewVendor({ ...newVendor, title: "" })}
    >
      <div style={{ marginBottom: "20px" }}>
        <Progress percent={(section / totalSections) * 100} />
      </div>
      <div>
        {section === 1 && (
          <div>
            <div>
              <label>Title</label>
              <input
                type="text"
                value={newVendor.title}
                //   onChange={(e) => handleInputChange(e, "title")}
                placeholder="Title"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                style={{ borderRadius: "12px", padding: "15px" }}
              />
            </div>
            <div>
              <label>Full Name</label>
              <input
                type="text"
                value={newVendor.title}
                //   onChange={(e) => handleInputChange(e, "title")}
                placeholder="Title"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                style={{ borderRadius: "12px", padding: "15px" }}
              />
            </div>
            <div>
              <label>Email Address</label>
              <p>Add the vendor's primary email address for communication</p>
              <input
                type="email"
                value={newVendor.title}
                //   onChange={(e) => handleInputChange(e, "title")}
                placeholder="Title"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                style={{ borderRadius: "12px", padding: "15px" }}
              />
            </div>
            <div>
              <label>Company</label>
              <input
                type="text"
                value={newVendor.title}
                //   onChange={(e) => handleInputChange(e, "title")}
                placeholder="Title"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                style={{ borderRadius: "12px", padding: "15px" }}
              />
            </div>
          </div>
        )}
        {section === 2 && (
          <>
            <input
              type="text"
              value={newVendor.firstName}
              //   onChange={(e) => handleInputChange(e, "firstName")}
              placeholder="First Name"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              style={{ borderRadius: "12px", padding: "15px" }}
            />
          </>
        )}
      </div>
      <div style={{ marginTop: "20px", textAlign: "right" }}>
        {section < totalSections && (
          <Button
            type="button"
            onClick={handleContinue}
            style={{
              background: "#4467a1",
              fontFamily: "outFit, Sans-serif",
              color: "#fff",
              padding: "",
              borderRadius: "24px",
              marginTop: "15px",
              width: "10rem"
            }}
          >
            Continue
          </Button>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {section > 1 && (
            <Button
              style={{
                marginTop: "7px",
                background: "#f6f6f4",
                fontFamily: "outFit, Sans-serif",
                color: "#fff",
                padding: "",
                borderRadius: "24px",
                marginTop: "15px",
                width: "10rem",
                color: "#505050"
              }}
              onClick={handleBack}
            >
              Back
            </Button>
          )}
          {section === totalSections && (
            <Button
              type="button"
              onClick={handleSubmit}
              style={{
                background: "#4467a1",
                fontFamily: "outFit, Sans-serif",
                color: "#fff",
                padding: "",
                borderRadius: "24px",
                marginTop: "15px",
                width: "10rem",
              }}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CustomerForm;
