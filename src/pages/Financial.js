import React, { useState, useEffect } from "react";
import { Modal, Button, Progress } from "antd";
import axios from "axios";

const CustomerForm = ({ showModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    email: "",
    companyName: "",
    phone: "",
    mobile: "",
    website: "",
    addres: {
      street: "",
      city: "",
      zipCode: "",
      country: "",
    },
    accountNo: "",
    billingRate: 0,
    openingBalance: 0,
    openingBalanceDate: "",
    notes: "",
    businessIdNo: "",
    status: true,
    paymentAccount: 0,
    subGroupId: 0,
    vendorType: "Vendor",
  });

  const [section, setSection] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [subGroupAccounts, setSubGroupAccounts] = useState([]);
  const [accounts, setAccounts] = useState([]);

  console.log("dadadadadadadaddaddaddada", formData);

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
      console.log("sugrrrorororooror", response.data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://3.216.182.63:8095/CreateVendor", formData)
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
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
      onCancel={() => setFormData({ ...formData })}
    >
      <div style={{ marginBottom: "20px" }}>
        <Progress percent={(section / totalSections) * 100} />
      </div>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
        {section === 1 && (
          <div>
            <div className="mb-4">
              <label className="block mb-2">Title</label>
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
              <label className="block mb-2">Full Name</label>
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
              <label className="block mb-2">Email</label>
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
              <label className="block mb-2">Company Name</label>
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
              <label className="block mb-2">Phone</label>
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
        )}
        {section === 2 && (
          <div>
            <div className="mb-4">
              <label className="block mb-2">Mobile</label>
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
              <label className="block mb-2">Website</label>
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
              <label className="block mb-2">Street</label>
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
              <label className="block mb-2">City</label>
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
              <label className="block mb-2">Zip Code</label>
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
              <label className="block mb-2">Country</label>
              <input
                type="text"
                name="addres.country"
                value={formData.addres.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full px-3 py-2 border rounded-md"
              />
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
            <div className="mb-4">
              <label className="block mb-2">Account Number</label>
              <input
                type="text"
                name="accountNo"
                value={formData.accountNo}
                onChange={handleChange}
                placeholder="Account No"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Billing Rate</label>
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
              <label className="block mb-2">Opening Balance</label>
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
              <label className="block mb-2">Opening Balance Date</label>
              <input
                type="datetime-local"
                name="openingBalanceDate"
                value={formData.openingBalanceDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
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
            <div className="mb-4">
              <label className="block mb-2">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Notes"
                className="w-full px-3 py-2 border rounded-md"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Business ID No</label>
              <input
                type="text"
                name="businessIdNo"
                value={formData.businessIdNo}
                onChange={handleChange}
                placeholder="Business ID No"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Status</label>
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.checked })
                }
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Payment Account</label>
              <select
                name="paymentAccount"
                value={formData.paymentAccount}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                {accounts.map((account, index) => (
                  <option key={index} value={account.id}>
                    {account.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Sub Group ID</label>
              <select
                name="subGroupId"
                value={formData.subGroupId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                {subGroupAccounts.map((subGroup, index) => (
                  <option key={index} value={subGroup.subGroupAccount.id}>
                    {subGroup.subGroupAccount.name}
                  </option>
                ))}
              </select>
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

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default CustomerForm;
