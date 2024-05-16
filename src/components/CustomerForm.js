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

  const totalSections = 4;

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
      title="Add Customer"
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
              <div className="grid max-w-xl w-full mx-4">
                <div className="mb-3 mr-3">
                  <label
                    htmlFor="name"
                    className="block mb-1"
                    style={{
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    Title
                  </label>
                  <p
                    className="text-gray-600 text-sm mb-1"
                    style={{ fontFamily: "outFit, Sans-serif" }}
                  >
                    Choose an appropraite title e.g Mr , Mrs
                  </p>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newVendor.title}
                    onChange={(e) =>
                      setNewVendor({ ...newVendor, title: e.target.value })
                    }
                    placeholder="Please enter account name..."
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "6px" }}
                  />
                </div>
                <div className="mb-3 mr-3">
                  <label
                    htmlFor="name"
                    className="block mb-1"
                    style={{
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    Full Name
                  </label>
                  <p
                    className="text-gray-600 text-sm mb-1"
                    style={{ fontFamily: "outFit, Sans-serif" }}
                  >
                    Enter Vendor's name
                  </p>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newVendor.fullName}
                    onChange={(e) =>
                      setNewVendor({
                        ...newVendor,
                        firstName: e.target.value,
                      })
                    }
                    placeholder="Please enter full name..."
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "7px" }}
                  />
                </div>
                <div className="mb-3 mr-3">
                  <label
                    htmlFor="name"
                    className="block mb-1"
                    style={{
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    Email Address
                  </label>
                  <p
                    className="text-gray-600 text-sm mb-1"
                    style={{ fontFamily: "outFit, Sans-serif" }}
                  >
                    Enter vendor's email Address for communication
                  </p>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={newVendor.email}
                    onChange={(e) =>
                      setNewVendor({ ...newVendor, email: e.target.value })
                    }
                    placeholder="Please enter account name..."
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "7px" }}
                  />
                </div>
                <div className="mb-3 mr-3">
                  <label
                    htmlFor="name"
                    className="block mb-1"
                    style={{
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    Company
                  </label>
                  <p
                    className="text-gray-600 text-sm mb-1"
                    style={{ fontFamily: "outFit, Sans-serif" }}
                  >
                    Enter company details
                  </p>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={newVendor.company}
                    onChange={(e) =>
                      setNewVendor({
                        ...newVendor,
                        company: e.target.value,
                      })
                    }
                    placeholder="Please enter company name..."
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "7px" }}
                  />
                </div>
                <div className="mb-3 mr-3">
                  <label
                    htmlFor="name"
                    className="block mb-1"
                    style={{
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    Phone
                  </label>
                  <p
                    className="text-gray-600 text-sm mb-1"
                    style={{ fontFamily: "outFit, Sans-serif" }}
                  >
                    Enter personal phone number
                  </p>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={newVendor.phone}
                    onChange={(e) =>
                      setNewVendor({ ...newVendor, phone: e.target.value })
                    }
                    placeholder="Please enter phone number..."
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "7px" }}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                  style={{
                    background: "#4467a1",
                    borderRadius: "28px",
                    marginLeft: "24px",
                    fontFamily: "outFit, Sans-serif",
                    width: "95%",
                  }}
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
        {section === 2 && (
          <div>
            <div>
              <div className="grid max-w-xl w-full mx-4">
                <div className="mb-3 mr-3">
                  <label
                    htmlFor="name"
                    className="block mb-1"
                    style={{
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    Website
                  </label>
                  <p
                    className="text-gray-600 text-sm mb-1"
                    style={{ fontFamily: "outFit, Sans-serif" }}
                  ></p>
                  <input
                    type="text"
                    name="website"
                    id="website"
                    placeholder="Http..."
                    // value={newVendor.website}
                    // onChange={(e) =>
                    //   setNewVendor({
                    //     ...newVendor,
                    //     website: e.target.value,
                    //   })
                    // }
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "6px" }}
                  />
                </div>
                <div className="mb-3 mr-3">
                  <label
                    htmlFor="name"
                    className="block mb-1"
                    style={{
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    Mobile
                  </label>
                  <p
                    className="text-gray-600 text-sm mb-1"
                    style={{ fontFamily: "outFit, Sans-serif" }}
                  >
                    Enter mobile number
                  </p>
                  <input
                    type="text"
                    name="mobile"
                    id="mobile"
                    // value={newVendor.mobile}
                    // onChange={(e) =>
                    //   setNewVendor({ ...newVendor, mobile: e.target.value })
                    // }
                    placeholder="Please enter mobile number..."
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "7px" }}
                  />
                </div>
                <div className="mb-3 mr-3">
                  <label
                    htmlFor="name"
                    className="block mb-1"
                    style={{
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    Address
                  </label>
                  <p
                    className="text-gray-600 text-sm mb-1"
                    style={{ fontFamily: "outFit, Sans-serif" }}
                  >
                    Enter physical address
                  </p>

                  <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    // placeholder="Zipcode..."
                    // value={newVendor.addres.zipCode}
                    // onChange={(e) =>
                    //   setNewVendor({
                    //     ...newVendor,
                    //     addres: {
                    //       ...newVendor.addres,
                    //       zipCode: e.target.value,
                    //     },
                    //   })
                    // }
                    className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "7px" }}
                  />
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City..."
                    // value={newVendor.addres.city}
                    // onChange={(e) =>
                    //   setNewVendor({
                    //     ...newVendor,
                    //     addres: {
                    //       ...newVendor.addres,
                    //       city: e.target.value,
                    //     },
                    //   })
                    // }
                    className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "7px" }}
                  />
                  <input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Country..."
                    className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "7px" }}
                  />
                </div>

                {/* Add other fields for section 1 */}
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="py-2 px-4 text-gray-700 rounded focus:outline-none"
                  style={{
                    borderRadius: "28px",
                    fontFamily: "outFit, Sans-serif",
                    width: "40%",
                    border: "#505050 1px solid",
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                  style={{
                    background: "#4467a1",
                    borderRadius: "28px",
                    fontFamily: "outFit, Sans-serif",
                    width: "40%",
                  }}
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
        {section === 3 && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
                  <div className="grid max-w-xl w-full mx-4">
                    {/* {isActive ? (
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="name"
                          className="block mb-1"
                          style={{
                            fontFamily: "outFit, Sans-serif",
                            fontSize: "16px",
                            fontWeight: "400",
                          }}
                        >
                          Active Status
                        </label>
                        <p
                          className="text-gray-600 text-sm mb-1"
                          style={{ fontFamily: "outFit, Sans-serif" }}
                        >
                          Choose an appropriate status (e.g. Active or Inactive)
                        </p>
                        <select
                          id="status"
                          name="status"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                          style={{ borderRadius: "12px", padding: "6px" }}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    ) : (
                      <div className="mb-3 mr-3">
                        <label
                          htmlFor="name"
                          className="block mb-1"
                          style={{
                            fontFamily: "outFit, Sans-serif",
                            fontSize: "16px",
                            fontWeight: "400",
                          }}
                        >
                          Inactive Status
                        </label>
                        <p
                          className="text-gray-600 text-sm mb-1"
                          style={{ fontFamily: "outFit, Sans-serif" }}
                        >
                          Choose an appropriate status (e.g. Active or Inactive)
                        </p>
                        <select
                          id="status"
                          name="status"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                          style={{ borderRadius: "12px", padding: "6px" }}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    )} */}

                    <div className="mb-4 mr-3">
                      <label
                        htmlFor="subGroupAccountId"
                        className="block mb-1"
                        style={{
                          fontFamily: "outFit, Sans-serif",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      >
                        SubGroup
                      </label>
                      <p 
                      className="text-gray-600 text-sm mb-1"
                      style={{ fontFamily: "outFit, Sans-serif" }}
                      >Select the subgroup this account belongs to</p>
                      <select
                        id="subGroupAccountId"
                        name="subGroupAccountId"
                        // value={newAccount.subGroupAccountId}
                        // onChange={(e) =>
                        //   setNewAccount({
                        //     ...newAccount,
                        //     subGroupAccountId: e.target.value,
                        //   })
                        // }
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ borderRadius: "12px", padding: "15px" }}
                      >
                        <option value=""  style={{ fontFamily: "outFit, Sans-serif" }}>Select SubGroup</option>
                        {/* {subGroupAccounts.map((subGroup) => (
                          <option
                            key={subGroup.subGroupAccount.id}
                            value={subGroup.subGroupAccount.id}
                          >
                            {subGroup.subGroupAccount.name}
                          </option>
                        ))} */}
                      </select>
                    </div>
                    <div className="mb-4 mr-3">
                      <label
                        htmlFor="accountFromId"
                        
                        style={{
                          fontFamily: "outFit, Sans-serif",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      >
                        Account From
                      </label>
                      <p
                        className="text-gray-500 text-xs mb-2"
                        style={{ fontFamily: "outFit, Sans-serif" }}
                      >
                        Source of the funds
                      </p>
                      <select
                        id="accountFromId"
                        // value={newTransaction.name}
                        // onChange={(e) =>
                        //   setNewTransaction({
                        //     ...newTransaction,
                        //     accountFromId: parseInt(e.target.value),
                        //   })
                        // }
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ borderRadius: "12px", padding: "15px" }}
                      >
                        <option value=""  style={{ fontFamily: "outFit, Sans-serif" }}>Select an account</option>
                        {/* {accounts.map((account) => (
                          <option key={account.id} value={account.id}>
                            {account.name}
                          </option>
                        ))} */}
                      </select>
                    </div>

                    <div className="mb-3 mr-3">
                      <label
                        htmlFor="name"
                        className="block mb-1"
                        style={{
                          fontFamily: "outFit, Sans-serif",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      >
                        Notes
                      </label>
                      <p
                        className="text-gray-600 text-sm mb-1"
                        style={{ fontFamily: "outFit, Sans-serif" }}
                      >
                        Add a description
                      </p>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Please enter account name..."
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ borderRadius: "12px", padding: "7px" }}
                      />
                    </div>
                    {/* Add other fields for section 1 */}
                  </div>
                  <Button
              type="button"
              onClick={handleBack}
              className="py-2 px-4 text-gray-700 rounded focus:outline-none"
              style={{
                borderRadius: "28px",
                fontFamily: "outFit, Sans-serif",
                width: "40%",
                border: "#505050 1px solid",
                paddingBottom: "30px"
              }}
            >
              Previous
            </Button>
            <Button
              type="button"
              onClick={handleContinue}
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              style={{
                background: "#4467a1",
                borderRadius: "28px",
                fontFamily: "outFit, Sans-serif",
                width: "40%",
                paddingBottom: "30px"
              }}
            >
              Next
            </Button>
                </div>
          </div>
        )}
        {section === 4 && (
          <div style={{
            display: "flex",
            justifyContent: "space-between"
          }}>
            
            <Button
              type="button"
              onClick={handleBack}
              className="py-2 px-4 text-gray-700 rounded focus:outline-none"
                  style={{
                    borderRadius: "28px",
                    fontFamily: "outFit, Sans-serif",
                    width: "40%",
                    border: "#505050 1px solid",
                    paddingBottom: "30px"
                  }}
            >
              Previous
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              style={{
                background: "#4467a1",
                borderRadius: "28px",
                fontFamily: "outFit, Sans-serif",
                width: "40%",
                paddingBottom: "30px"
              }}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CustomerForm;
