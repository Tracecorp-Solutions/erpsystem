import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";

const { Option } = Select;

const Vendor = () => {
  const [showForm, setShowForm] = useState(false);
  const [isActive, setIsActive] = useState(true);
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
  });
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [errorMessage, setErrorMessage] = useState("");
  const [section, setSection] = useState(1);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const vendorsApiUrl = "http://3.216.182.63:8095/GetAllVendors";

  const fetchVendors = async () => {
    try {
      const response = await axios.get(vendorsApiUrl);
      setVendors(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      setErrorMessage("Failed to fetch vendors. Please try again later.");
    }
  };

  const handleSubmit = async () => {
    try {
      const createVendorApiUrl = "http://3.216.182.63:8095/CreateVendor";
      const response = await axios.post(createVendorApiUrl, newVendor);
      setSuccessMessage("Vendor created successfully!");
      // Clear the form fields
      setNewVendor({
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
      });
      // Refresh vendors list
      fetchVendors();
    } catch (error) {
      console.error("Error creating vendor:", error);
      setErrorMessage("Failed to create vendor. Please try again later.");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentvendors = vendors.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(vendors.length / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleContinue = () => {
    setSection(section + 1);
  };

  const handleBack = () => {
    setSection(section - 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (action) => {
    if (action === "edit") {
      console.log("Edit action triggered");
    }

    if (action === "delete") {
      console.log("Delete action triggered");
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Vendors
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            For work completed from{" "}
            <time dateTime="2024-08-01">August 1, 2024</time> to{" "}
            <time dateTime="2024-08-31">August 31, 2024</time>.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={toggleForm}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            + New
          </button>
        </div>
      </div>
      <div>
        <div className="mt-6" aria-hidden="true"></div>

        {showForm && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 mt-6 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg max-w-md w-full mx-4">
              <h2 className="text-lg font-semibold mb-3">Add Vendor</h2>
              <div className="mb-4">
                <div className="overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${(section - 1) * 25}%` }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-sm text-gray-600">
                  <div
                    className={`text-gray-500 ${
                      section === 1 ? "font-semibold" : "opacity-0"
                    }`}
                    style={{
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    Personal Information
                  </div>
                  <div
                    className={`text-gray-400 ${
                      section === 2 ? "font-semibold" : "opacity-0"
                    }`}
                    style={{
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    Contact details
                  </div>
                  <div
                    className={`text-gray-400 ${
                      section === 3 ? "font-semibold" : "opacity-0"
                    }`}
                    style={{
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    Additional Information
                  </div>
                  <div
                    className={`text-gray-400 ${
                      section === 4 ? "font-semibold" : "opacity-0"
                    }`}
                    style={{
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    Financial details
                  </div>
                </div>
              </div>

              {section === 1 && (
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
                    {/* Add other fields for section 1 */}
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
                        website
                      </label>
                      <p
                        className="text-gray-600 text-sm mb-1"
                        style={{ fontFamily: "outFit, Sans-serif" }}
                      ></p>
                      <input
                        type="text"
                        name="website"
                        id="website"
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
                        placeholder="Zipcode..."
                        value={newVendor.addres.zipCode}
                        onChange={(e) =>
                          setNewVendor({
                            ...newVendor,
                            addres: {
                              ...newVendor.addres,
                              zipCode: e.target.value,
                            },
                          })
                        }
                        className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ borderRadius: "12px", padding: "7px" }}
                      />
                      <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="City..."
                        value={newVendor.addres.city}
                        onChange={(e) =>
                          setNewVendor({
                            ...newVendor,
                            addres: {
                              ...newVendor.addres,
                              city: e.target.value,
                            },
                          })
                        }
                        className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ borderRadius: "12px", padding: "7px" }}
                      />
                      <input
                        type="text"
                        name="country"
                        id="country"
                        value={newVendor.addres.country}
                        onChange={(e) =>
                          setNewVendor({
                            ...newVendor,
                            addres: {
                              ...newVendor.addres,
                              country: e.target.value,
                            },
                          })
                        }
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
              )}

              {section === 3 && (
                <div>
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
                        SubGroup
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
                        Account From
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

              {section === 4 && (
                <div>
                  <div className="grid max-w-xl w-full mx-4">
                    <div className="mb-3 mr-3">
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
                          Payment method
                        </label>
                        <p
                          className="text-gray-600 text-sm mb-1"
                          style={{ fontFamily: "outFit, Sans-serif" }}
                        >
                          Add a description
                        </p>
                        <input
                          type="text"
                          name="Payment method"
                          id="payment method"
                          value={newVendor.paymentMethod}
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
                    </div>
                    <div className="mb-3 mr-3">
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
                          Billing Rate
                        </label>
                        <p
                          className="text-gray-600 text-sm mb-1"
                          style={{ fontFamily: "outFit, Sans-serif" }}
                        >
                          Add a description
                        </p>
                        <input
                          type="text"
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
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={handleBack}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md text-sm font-semibold hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div class="px-4 sm:px-6 lg:px-8">
        <div class="mt-8 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300 bg-gray-400 rounded-lg">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                    >
                      Date
                    </th>

                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Balance
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-3"
                    >
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  {vendors.map((vendor) => (
                    <tr key={vendor.id} class="even:bg-gray-50">
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {new Date(vendor.openingBalanceDate).toLocaleString(
                          "en-US",
                          { timeZone: "UTC" }
                        )}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {" "}
                        {vendor.title} {vendor.firstName} {vendor.lastName}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {vendor.openingBalance}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pr-4 text-right text-sm font-medium">
                        <div className="relative">
                          <select
                            className="text-indigo-600 hover:text-indigo-900"
                            onChange={(e) => handleEdit(e.target.value)}
                          >
                            <option value="">Actions</option>
                            <option value="edit">Edit</option>
                            <option value="delete">Delete</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <nav
                className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                aria-label="Pagination"
              >
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Showing
                    <span className="font-medium mx-1">
                      {indexOfFirstItem + 1}
                    </span>
                    to
                    <span className="font-medium mx-1">{indexOfLastItem}</span>
                    of
                    <span className="font-medium mx-1">{vendors.length}</span>
                    results
                  </p>
                </div>
                <div className="flex-1 flex justify-between sm:justify-end">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Display success or error message */}
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      {/* Display vendors data */}
      <div className="mt-8 flow-root">{/* Your existing vendor table */}</div>
    </div>
  );
};

export default Vendor;
