import React, { useState, useEffect } from "react";
import { Modal, Button, Progress } from "antd";
import axios from "axios";

const VendorForm = ({ showModal }) => {
  const [newVendor, setNewVendor] = useState({
    title: "",
    FullName: "",
    email: "",
    company: "",
    phone: "",
    mobile: "",
    website: "",
    addres: {
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
    subGroupId: 0,
    vendorType: "Vendor",
    businessIdNo: "",
  });

  const [section, setSection] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [subGroupAccounts, setSubGroupAccounts] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const totalSections = 4;

  useEffect(() => {
    fetchSubGroupAccounts();
    fetchAccounts();
  }, []);

  const fetchSubGroupAccounts = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/GetAllSubGroupAccounts"
      );
      setSubGroupAccounts(response.data);
    } catch (error) {
      console.error("Error fetching subGroup accounts", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAccounts`
      );
      setAccounts(response.data);
      console.log("get accounts", response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const createVendorApiUrl = "http://3.216.182.63:8095//CreateVendor";
      await axios.post(createVendorApiUrl, newVendor);
      setNewVendor({ ...newVendor, title: "" });
    } catch (error) {
      console.error("Error creating vendor:", error);
      setErrorMessage("Failed to create vendor. Please try again later.");
    }
  };

  const handleAddresChange = (e) => {
    const { name, value } = e.target;
    setNewVendor((prevVendor) => ({
      ...prevVendor,
      addres: {
        ...prevVendor.addres,
        [name]: value,
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVendor((prevVendor) => ({
      ...prevVendor,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    setSection(section + 1);
  };

  const handleBack = () => {
    setSection(section - 1);
  };

  const handleSubGroupChange = (e) => {
    setNewVendor({
      ...newVendor,
      subGroupId: e.target.value,
    });
  };

  return (
    <Modal
      title="Add Vendor Details"
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
            <div
              style={{
                maxHeight: "50vh",
                overflowY: "auto",
                paddingRight: "15px",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              className="overflow-y-auto"
            >
              <div className="grid max-w-xl w-full mx-4">
                <div className="mb-3 mr-3">
                  <label
                    htmlFor="title"
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
                    Choose an appropriate title e.g Mr, Mrs
                  </p>
                  <select
                    id="title"
                    name="title"
                    value={newVendor.title}
                    onChange={(e) =>
                      setNewVendor({ ...newVendor, title: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "6px" }}
                  >
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Miss">Miss</option>
                    <option value="Miss">Dr</option>
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
                    Company Name
                  </label>
                  <p
                    className="text-gray-600 text-sm mb-1"
                    style={{ fontFamily: "outFit, Sans-serif" }}
                  >
                    Enter company details
                  </p>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    value={newVendor.companyName}
                    onChange={(e) =>
                      setNewVendor({
                        ...newVendor,
                        companyName: e.target.value,
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
        )}
        {section === 2 && (
          <div>
            <div
              style={{
                maxHeight: "50vh",
                overflowY: "auto",
                paddingRight: "15px",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              className="overflow-y-auto"
            >
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
                    value={newVendor.website}
                    onChange={(e) =>
                      setNewVendor({
                        ...newVendor,
                        website: e.target.value,
                      })
                    }
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
                    value={newVendor.mobile}
                    onChange={(e) =>
                      setNewVendor({ ...newVendor, mobile: e.target.value })
                    }
                    placeholder="Please enter mobile number..."
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "7px" }}
                  />
                </div>
                <div className="mb-3 mr-3">
                  <div className="address-fields">
                    <input
                      type="text"
                      name="street"
                      value={newVendor.addres.street}
                      onChange={handleAddresChange}
                      placeholder="Street..."
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      style={{
                        borderRadius: "12px",
                        padding: "7px",
                        marginTop: "5px",
                      }}
                    />
                    <input
                      type="text"
                      name="city"
                      value={newVendor.addres.city}
                      onChange={handleAddresChange}
                      placeholder="City..."
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      style={{
                        borderRadius: "12px",
                        padding: "7px",
                        marginTop: "5px",
                      }}
                    />
                    <input
                      type="text"
                      name="zipCode"
                      value={newVendor.addres.zipCode}
                      onChange={handleAddresChange}
                      placeholder="Zip Code..."
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      style={{
                        borderRadius: "12px",
                        padding: "7px",
                        marginTop: "5px",
                      }}
                    />
                    <input
                      type="text"
                      name="country"
                      value={newVendor.addres.country}
                      onChange={handleAddresChange}
                      placeholder="Country..."
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      style={{
                        borderRadius: "12px",
                        padding: "7px",
                        marginTop: "5px",
                      }}
                    />
                  </div>
                </div>
              </div>
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
        )}
        {section === 3 && (
          <div>
            <div
              style={{
                maxHeight: "50vh",
                overflowY: "auto",
                paddingRight: "15px",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              className="overflow-y-auto"
            >
              <div className="grid max-w-xl w-full mx-4">
                {isActive ? (
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
                )}
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
                  >
                    Select the subgroup this account belongs to
                  </p>
                  <select
                    id="subGroupAccountId"
                    name="subGroupAccountId"
                    value={newVendor.subGroupId}
                    onChange={handleSubGroupChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "15px" }}
                  >
                    <option
                      value=""
                      style={{ fontFamily: "outFit, Sans-serif" }}
                    >
                      Select SubGroup
                    </option>
                    {subGroupAccounts.map((subGroup) => (
                      <option
                        key={subGroup.subGroupAccount.id}
                        value={subGroup.subGroupAccount.id}
                      >
                        {subGroup.subGroupAccount.name}
                      </option>
                    ))}
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
                    value={newVendor.accountId}
                    onChange={(e) =>
                      setNewVendor({
                        ...newVendor,
                        accountId: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "15px" }}
                  >
                    <option
                      value=""
                      style={{ fontFamily: "outFit, Sans-serif" }}
                    >
                      Select an account
                    </option>
                    {accounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3 mr-3">
                  <label
                    htmlFor="notes"
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
                  <textarea
                    type="text"
                    id="notes"
                    name="notes"
                    value={newVendor.notes}
                    onChange={(e) =>
                      setNewVendor((prevVendor) => ({
                        ...prevVendor,
                        notes: e.target.value,
                      }))
                    }
                    placeholder="Please enter account name..."
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "7px" }}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="button"
                onClick={handleBack}
                className="py-2 px-4 text-gray-700 rounded focus:outline-none"
                style={{
                  borderRadius: "28px",
                  fontFamily: "outFit, Sans-serif",
                  width: "40%",
                  border: "#505050 1px solid",
                  paddingBottom: "30px",
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
                  paddingBottom: "30px",
                }}
              >
                Next
              </Button>
            </div>
          </div>
        )}
        {section === 4 && (
          <div>
            <div
              style={{
                maxHeight: "45vh",
                overflowY: "auto",
                paddingRight: "15px",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              className="overflow-y-auto"
            >
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
                  BusinessIdNO
                </label>
                <p
                  className="text-gray-600 text-sm mb-1"
                  style={{ fontFamily: "outFit, Sans-serif" }}
                >
                  Enter BusinessIdNo
                </p>
                <input
                  type="text"
                  name="businessIdNo"
                  id="businessIdNo"
                  value={newVendor.businessIdNo}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, businessIdNo: e.target.value })
                  }
                  placeholder="Please enter business Id number..."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  style={{ borderRadius: "12px", padding: "7px" }}
                />
              </div>
              <div style={{ padding: "20px" }}>
                <div className="mb-3">
                  <label
                    htmlFor="name"
                    className="block mb-1"
                    style={{
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    Payment Account
                  </label>
                  <p
                    className="text-gray-600 text-sm mb-1"
                    style={{ fontFamily: "outFit, Sans-serif" }}
                  >
                    Add a description
                  </p>
                  <input
                    type="number"
                    name="Payment account"
                    id="paymentAccount"
                    value={newVendor.paymentAccount}
                    onChange={(e) =>
                      setNewVendor({
                        ...newVendor,
                        other: e.target.value,
                      })
                    }
                    placeholder="Please enter account name..."
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "7px" }}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="billing rate"
                    className="block mb-1"
                    style={{
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    Billing Rate
                  </label>
                  <p
                    className="text-gray-600 text-sm mb-1"
                    style={{ fontFamily: "outFit, Sans-serif" }}
                  >
                    Add a description
                  </p>
                  <input
                    type="number"
                    name="billingRate"
                    id="billingRate"
                    value={newVendor.billingRate}
                    onChange={(e) =>
                      setNewVendor({
                        ...newVendor,
                        billingRate: e.target.value,
                      })
                    }
                    placeholder="Please enter account name..."
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "7px" }}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="opening balance"
                    className="block mb-1"
                    style={{
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    Opening Balance
                  </label>
                  <p
                    className="text-gray-600 text-sm mb-1"
                    style={{ fontFamily: "outFit, Sans-serif" }}
                  >
                    Add a description
                  </p>
                  <input
                    type="number"
                    name="openingBalance"
                    id="openingBalance"
                    value={newVendor.openingBalance}
                    onChange={(e) =>
                      setNewVendor({
                        ...newVendor,
                        openingBalance: e.target.value,
                      })
                    }
                    placeholder="Please enter account balance..."
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "7px" }}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="transactionDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Opening Balance Date
                  </label>
                  <p
                    className="text-gray-500 text-xs mb-1"
                    style={{ fontFamily: "outFit, Sans-serif" }}
                  >
                    Enter date when transaction occurred
                  </p>
                  <input
                    type="date" // Change type to "date"
                    id="openingBalanceDate"
                    value={newVendor.openingBalanceDate.split("T")[0]} // Extracts the date part
                    onChange={(e) =>
                      setNewVendor({
                        ...newVendor,
                        openingBalanceDate: e.target.value,
                      })
                    }
                    placeholder="Please enter account balance..."
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    style={{ borderRadius: "12px", padding: "15px" }}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="button"
                onClick={handleBack}
                className="py-2 px-4 text-gray-700 rounded focus:outline-none"
                style={{
                  borderRadius: "28px",
                  fontFamily: "outFit, Sans-serif",
                  width: "48%",
                  border: "#505050 1px solid",
                  paddingBottom: "30px",
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
                  width: "48%",
                  paddingBottom: "30px",
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default VendorForm;