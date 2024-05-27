import React, { useState, useEffect } from "react";
import { Modal, Button, Progress } from "antd";
import axios from "axios";

const CustomerForm = ({
  showModal,
  setShowModal,
  setFormData,
  handleSubmit,
  formData,
}) => {
  const [section, setSection] = useState(1);
  const [subGroupAccounts, setSubGroupAccounts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [sectionTitles, setSectionTitles] = useState([
    "Personal Information",
    "Contact details",
    "Additional Information",
    "Financial Details",
  ]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [mainKey, subKey] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [mainKey]: {
          ...prevData[mainKey],
          [subKey]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
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
      visible={showModal}
      footer={null}
      onCancel={() => setShowModal(false)}
    >
      <h1
        style={{
          fontSize: "36px",
          color: "#505050",
          fontFamily: "outFit, Sans-serif",
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Customer Creation
      </h1>
      <div style={{ marginBottom: "20px" }}>
        <h2 className="text-2xl font-semibold mb-4">
          {sectionTitles[section - 1]}
        </h2>
        <Progress percent={(section / totalSections) * 100} />
      </div>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
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
              <div className="mb-4">
                <label
                  className="block mb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  Title
                </label>
                <p
                  style={{
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "14px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    color: "#a1a1a1",
                    fontWeight: "400",
                  }}
                >
                  Select the appropriate title (e.g, Mr, Ms, Dr)
                </p>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select Title</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Dr.">Rev.</option>
                  <option value="Dr.">Prof.</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="block mb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  Full Name
                </label>
                <p
                  style={{
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "14px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    color: "#a1a1a1",
                    fontWeight: "400",
                  }}
                >
                  Enter the customer's name
                </p>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  Email
                </label>
                <p
                  style={{
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "14px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    color: "#a1a1a1",
                    fontWeight: "400",
                  }}
                >
                  Add the vendor's primary email address for communication
                </p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  Company Name
                </label>
                <p
                  style={{
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "14px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    color: "#a1a1a1",
                    fontWeight: "400",
                  }}
                >
                  Enter the name of the customer's company
                </p>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  Phone
                </label>
                <p
                  style={{
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "14px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    color: "#a1a1a1",
                    fontWeight: "400",
                  }}
                >
                  Add primary phone number
                </p>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full px-3 py-2 border rounded-md"
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
                  fontFamily: "outFit, Sans-serif",
                  width: "100%",
                  ...(formData.title &&
                  formData.fullName &&
                  formData.email &&
                  formData.companyName &&
                  formData.phone
                    ? {}
                    : {
                        backgroundColor: "gray",
                        cursor: "not-allowed",
                      }),
                }}
                onClick={handleContinue}
                disabled={
                  !formData.title ||
                  !formData.fullName ||
                  !formData.email ||
                  !formData.companyName ||
                  !formData.phone
                }
              >
                Continue
              </button>
            </div>
          </div>
        )}
        {section === 2 && (
          <div>
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
                <div className="mb-4">
                  <label
                    className="block mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#505050",
                      fontFamily: "outFit, Sans-serif",
                    }}
                  >
                    Mobile
                  </label>
                  <p
                    style={{
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "14px",
                      marginTop: "10px",
                      marginBottom: "10px",
                      color: "#a1a1a1",
                      fontWeight: "400",
                    }}
                  >
                    Add the vendor's mobile phone number, if different from
                    their primary phone number
                  </p>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#505050",
                      fontFamily: "outFit, Sans-serif",
                    }}
                  >
                    Website
                  </label>
                  <p
                    style={{
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "14px",
                      marginTop: "10px",
                      marginBottom: "10px",
                      color: "#a1a1a1",
                      fontWeight: "400",
                    }}
                  >
                    Provide the URL of the customer's website, if available
                  </p>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Website"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#505050",
                      fontFamily: "outFit, Sans-serif",
                    }}
                  >
                    Street
                  </label>
                  <input
                    type="text"
                    name="addres.street"
                    value={formData.addres.street}
                    onChange={handleChange}
                    placeholder="Street"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#505050",
                      fontFamily: "outFit, Sans-serif",
                    }}
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="addres.city"
                    value={formData.addres.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#505050",
                      fontFamily: "outFit, Sans-serif",
                    }}
                  >
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="addres.zipCode"
                    value={formData.addres.zipCode}
                    onChange={handleChange}
                    placeholder="Zip Code"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#505050",
                      fontFamily: "outFit, Sans-serif",
                    }}
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="addres.country"
                    value={formData.addres.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="w-full px-3 py-2 border rounded-md"
                  />
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
                  ...(formData.mobile &&
                  formData.website &&
                  formData.addres.street &&
                  formData.addres.city &&
                  formData.addres.zipCode &&
                  formData.addres.country
                    ? {}
                    : {
                        backgroundColor: "gray",
                        cursor: "not-allowed",
                      }),
                }}
                onClick={handleContinue}
                disabled={
                  !formData.mobile ||
                  !formData.website ||
                  !formData.addres.street ||
                  !formData.addres.city ||
                  !formData.addres.zipCode ||
                  !formData.addres.country
                }
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
              <div className="mb-4">
                <label
                  className="block mb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  Subgroup
                </label>
                <p
                  style={{
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "14px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    color: "#a1a1a1",
                    fontWeight: "400",
                  }}
                >
                  Select the subgroup this account belongs to
                </p>
                <select
                  name="subGroupId"
                  value={formData.subGroupId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select Subgroup</option>{" "}
                  {subGroupAccounts.map((subGroup, index) => (
                    <option key={index} value={subGroup.subGroupAccount.id}>
                      {subGroup.subGroupAccount.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="block mb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  Payment Account
                </label>
                <p
                  style={{
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "14px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    color: "#a1a1a1",
                    fontWeight: "400",
                  }}
                >
                  Account where the customer will pay to
                </p>
                <select
                  name="paymentAccount"
                  value={formData.paymentAccount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Choose Account</option>{" "}
                  {/* Default option */}
                  {accounts.map((account, index) => (
                    <option key={index} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="block mb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  Status
                </label>
                <p
                  style={{
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "14px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    color: "#a1a1a1",
                    fontWeight: "400",
                  }}
                >
                  Specify the customer's current status
                </p>
                <select
                  name="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value === "true",
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Choose Status</option> {/* Default option */}
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
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
                  ...(formData.subGroupId &&
                  formData.paymentAccount &&
                  formData.status !== ""
                    ? {}
                    : {
                        backgroundColor: "gray",
                        cursor: "not-allowed",
                      }),
                }}
                disabled={
                  !formData.subGroupId ||
                  !formData.paymentAccount ||
                  formData.status === ""
                }
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
              <div className="mb-4">
                <label
                  className="block mb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  Opening Balance Date
                </label>
                <p
                  style={{
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "14px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    color: "#a1a1a1",
                    fontWeight: "400",
                  }}
                >
                  Opening Balance
                </p>
                <input
                  type="date"
                  name="openingBalanceDate"
                  value={formData.openingBalanceDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  Opening Balance
                </label>
                <p
                  style={{
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "14px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    color: "#a1a1a1",
                    fontWeight: "400",
                  }}
                >
                  Enter the customer's initial account balance
                </p>
                <input
                  type="number"
                  name="openingBalance"
                  value={formData.openingBalance}
                  onChange={handleChange}
                  placeholder="Opening Balance"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  Billing Rate
                </label>
                <p
                  style={{
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "14px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    color: "#a1a1a1",
                    fontWeight: "400",
                  }}
                >
                  Specify the customer's hourly or daily billing rate
                </p>
                <input
                  type="number"
                  name="billingRate"
                  value={formData.billingRate}
                  onChange={handleChange}
                  placeholder="Billing Rate"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  Notes
                </label>
                <p
                  style={{
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "14px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    color: "#a1a1a1",
                    fontWeight: "400",
                  }}
                >
                  Add any additional comments or notes related to the customer.
                </p>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Notes"
                  className="w-full px-3 py-2 border rounded-md"
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  Business ID No
                </label>
                <p
                  style={{
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "14px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    color: "#a1a1a1",
                    fontWeight: "400",
                  }}
                >
                  Enter the business registration number
                </p>
                <input
                  type="text"
                  name="businessIdNo"
                  value={formData.businessIdNo}
                  onChange={handleChange}
                  placeholder="Business ID No"
                  className="w-full px-3 py-2 border rounded-md"
                />
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
                  ...(formData.openingBalanceDate &&
                  formData.openingBalance &&
                  formData.billingRate &&
                  formData.notes &&
                  formData.businessIdNo
                    ? {}
                    : {
                        backgroundColor: "gray",
                        cursor: "not-allowed",
                      }),
                }}
                disabled={
                  !formData.openingBalanceDate ||
                  !formData.openingBalance ||
                  !formData.billingRate ||
                  !formData.notes ||
                  !formData.businessIdNo
                }
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default CustomerForm;
