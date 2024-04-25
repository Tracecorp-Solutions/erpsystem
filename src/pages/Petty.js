import React, { useState } from 'react';
const petty = [
    {
      id: 1,
      name: 'Logo redesign',
      description: 'New logo and digital asset playbook.',
      narration: 'Electricity',
      rate: '$100.00',
      price: '$2,000.00',
      balance: '$1900.0',
    },
    // More projects...
  ]

  export default function Petty() {
    const [showForm, setShowForm] = useState(false);
    const [newAccount, setNewAccount] = useState({ Date: '', Name: '', behavior: '' });
  
    const toggleForm = () => {
      setShowForm(!showForm);
    };
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Petty Cash</h1>
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
              <h2 className="text-lg font-semibold mb-4">New Account Form</h2>
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="Date"
                  name="date"
                  id="date"
                  value={newAccount.Date}
                  onChange={(e) => setNewAccount({ ...newAccount, Date: e.target.value })}
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
                  value={newAccount.Name}
                  onChange={(e) => setNewAccount({ ...newAccount, Name: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Please enter account name..."
                  style={{padding: "18px"}}
                  />
              </div>
              <div className="mb-4" style={{padding: "18px"}}>
                <label htmlFor="behavior" className="block text-sm font-medium text-gray-700">Behavior</label>
                <select
                  value={newAccount.behavior}
                  onChange={(e) => setNewAccount({ ...newAccount, behavior: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-100 focus:ring-indigo-500 sm:text-sm"
                  style={{padding: "15px", marginBottom: "20px"}}
                >
                  <option value="">Select Behavior</option>
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </select>
              </div>
              <div className="flex justify-end mt-12">
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
                    console.log("Form submitted:", newAccount);
                    setNewAccount({ Date: '', Name: '', behavior: '' });
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
        <div className="-mx-4 mt-8 flow-root sm:mx-0">
          <table className="min-w-full">
            <colgroup>
              <col className="w-full sm:w-1/2" />
              <col className="sm:w-1/6" />
              <col className="sm:w-1/6" />
              <col className="sm:w-1/6" />
            </colgroup>
            <thead className="border-b border-gray-300 text-gray-900">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Credit
                </th>
                <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">
                  Debit
                </th>
                <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">
                  Balance
                </th>
                
              </tr>
            </thead>
            <tbody>
              {petty.map((petty) => (
                <tr key={petty.id} className="border-b border-gray-200">
                  <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="font-medium text-gray-900">{petty.name}</div>
                    <div className="mt-1 truncate text-gray-500">{petty.description}</div>
                  </td>
                  <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">{petty.narration}</td>
                  <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">{petty.rate}</td>
                  <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">{petty.price}</td>
                  <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">{petty.balance}</td>
                  
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th
                  scope="row"
                  colSpan={3}
                  className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                >
                  Subtotal
                </th>
                <th scope="row" className="pl-4 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden">
                  Subtotal
                </th>
                
                <td className="pl-3 pr-4 pt-6 text-right text-sm text-gray-500 sm:pr-0">$8,800.00</td>
              </tr>
              <tr>
                <th
                  scope="row"
                  colSpan={3}
                  className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                >
                  Tax
                </th>
                <th scope="row" className="pl-4 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">
                  Tax
                </th>
                <td className="pl-3 pr-4 pt-4 text-right text-sm text-gray-500 sm:pr-0">$1,760.00</td>
              </tr>
              <tr>
                <th
                  scope="row"
                  colSpan={3}
                  className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
                >
                  Total
                </th>
                <th scope="row" className="pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">
                  Total
                </th>
                <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">$10,560.00</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    )
  }
  