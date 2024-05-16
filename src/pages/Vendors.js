import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";

const { Option } = Select;

const Vendor = () => {
  const [showForm, setShowForm] = useState(false);
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

  const toggleForm = () => {
    setShowForm(!showForm);
  };


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

  useEffect(() => {
    fetchVendors();
  }, []);

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

  const handleSubmit = async () => {
    try {
      const createVendorApiUrl = `${process.env.REACT_APP_API_URL}/CreateVendor`; // Corrected endpoint URL
      const response = await axios.post(createVendorApiUrl, newVendor); // Corrected axios.post usage
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
      {showForm && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 mt-72 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-xl w-full mx-4">
            <h2 className="text-lg font-semibold mb-4"> Add Vendor</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={newVendor.title}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, title: e.target.value })
                  }
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={newVendor.firstName}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, firstName: e.target.value })
                  }
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="middleName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  id="middleName"
                  value={newVendor.middleName}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, middleName: e.target.value })
                  }
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={newVendor.lastName}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, lastName: e.target.value })
                  }
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="suffix"
                  className="block text-sm font-medium text-gray-700"
                >
                  Suffix
                </label>
                <input
                  type="text"
                  name="suffix"
                  id="suffix"
                  value={newVendor.suffix}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, suffix: e.target.value })
                  }
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="suffix"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={newVendor.email}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, email: e.target.value })
                  }
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="suffix"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={newVendor.company}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, company: e.target.value })
                  }
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={newVendor.phone}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, phone: e.target.value })
                  }
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile
                </label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  value={newVendor.mobile}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, mobile: e.target.value })
                  }
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="fax"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fax
                </label>
                <input
                  type="text"
                  name="fax"
                  id="fax"
                  value={newVendor.fax}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, fax: e.target.value })
                  }
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="others"
                  className="block text-sm font-medium text-gray-700"
                >
                  Others
                </label>
                <input
                  type="text"
                  name="others"
                  id="others"
                  value={newVendor.other}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, other: e.target.value })
                  }
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700"
              >
                Website
              </label>
              <input
                type="text"
                name="website"
                id="website"
                value={newVendor.website}
                onChange={(e) =>
                  setNewVendor({ ...newVendor, website: e.target.value })
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street
                </label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  value={newVendor.addres.street}
                  onChange={(e) =>
                    setNewVendor({
                      ...newVendor,
                      addres: { ...newVendor.addres, street: e.target.value },
                    })
                  }
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter street..."
                  style={{ padding: "18px" }}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={newVendor.addres.city}
                  onChange={(e) =>
                    setNewVendor({
                      ...newVendor,
                      addres: { ...newVendor.addres, city: e.target.value },
                    })
                  }
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter city..."
                  style={{ padding: "18px" }}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  id="zipCode"
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
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter zip code..."
                  style={{ padding: "18px" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
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
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter country..."
                  style={{ padding: "18px" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="mb-3">
                <label
                  htmlFor="billingRate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Billing Rate
                </label>
                <input
                  type="number"
                  name="billingRate"
                  id="billingRate"
                  value={newVendor.billingRate}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, billingRate: e.target.value })
                  }
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter billing rate..."
                  style={{ padding: "18px" }}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="openingBalance"
                  className="block text-sm font-medium text-gray-700"
                >
                  Opening Balance
                </label>
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
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter opening balance..."
                  style={{ padding: "18px" }}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="openingBalanceDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Opening Balance Date
                </label>
                <input
                  type="date"
                  name="openingBalanceData"
                  id="openingBalanceDate"
                  value={newVendor.openingBalanceDate}
                  onChange={(e) =>
                    setNewVendor({
                      ...newVendor,
                      openingBalanceDate: e.target.value,
                    })
                  }
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter billing rate..."
                  style={{ padding: "18px" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notes
                </label>
                <input
                  type="string"
                  name="notes"
                  id="notes"
                  value={newVendor.notes}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, notes: e.target.value })
                  }
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter."
                  style={{ padding: "18px" }}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="businessIdNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Business Id NO
                </label>
                <input
                  type="string"
                  name="businessIdNo"
                  id="businessIdNo"
                  value={newVendor.businessIdNo}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, businessIdNo: e.target.value })
                  }
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter billing rate..."
                  style={{ padding: "18px" }}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <input
                  type="string"
                  name="status"
                  id="status"
                  value={newVendor.status}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, status: e.target.value })
                  }
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="string"
                  style={{ padding: "18px" }}
                />
              </div>
            </div>

            {/* Middle Name */}

            {/* Last Name */}

            <div className="flex justify-end mt-4 mb-0">
              <button
                type="button"
                onClick={toggleForm}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="ml-3 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

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
