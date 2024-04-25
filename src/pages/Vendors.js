import React, { useState } from 'react';

const vendor = [
  { Date: '20 / 5 / 2024', Name: 'David', Description:'Left an invoice of cement',  },
];

export default function Vendor() {
  const [showForm, setShowForm] = useState(false);
  const [newVendor, setnewVendor] = useState({ Date: '', Name: '', Description:''});

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Vendors</h1>
          <p className="mt-2 text-sm text-gray-700">
              For work completed from <time dateTime="2024-08-01">August 1, 2024</time> to{' '}
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
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg max-w-xl w-full mx-4">
              <h2 className="text-lg font-semibold mb-4"> Add Vendor</h2>
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="Date"
                  name="date"
                  id="date"
                  value={newVendor.Date}
                  onChange={(e) => setnewVendor({ ...newVendor, Date: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  style={{padding: "18px"}}
                  />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={newVendor.Name}
                  onChange={(e) => setnewVendor({ ...newVendor, Name: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Please enter Vendor name..."
                  style={{padding: "18px"}}
                  />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={newVendor.Name}
                  onChange={(e) => setnewVendor({ ...newVendor, Name: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Add a description"
                  style={{padding: "18px"}}
                  />
              </div>
             
              <div className="flex justify-end mt-4 mb-0">
                <button
                  type="button"
                  onClick={toggleForm}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    console.log("Form submitted:", newVendor);
                    setnewVendor({ Date: '', Name: '', Description:'' });
                    toggleForm();
                  }}
                  className="ml-3 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                    >
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Description
                    </th>
                    
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {vendor.map((vendor, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                        {vendor.Date}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vendor.Name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vendor.Description}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">{vendor.Name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
