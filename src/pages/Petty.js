import React, { useState, useEffect } from "react";
import axios from "axios";

const initialTransactions = [
  {
    id: 1,
    accountId: "2",
    accountFromId: "1.",
    Date: "2024-04-25T00:00:00", // Corrected date format
    Amount: "$1900.00",
    narration: "electricity",
  },
  // More transactions...
];

export default function Petty() {
  const [showForm, setShowForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    id: 0,
    accountId: 0,
    accountFromId: 0,
    accountToId: 0,
    transactionDate: "",
    amount: 0,
    narration: "",
  });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    retrieveTransactions();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const recordTransaction = async () => {
    try {
      // Make a POST request to RecordTransaction API
      const response = await axios.post(
        "http://54.226.71.2/RecordTransaction",
        newTransaction
      );
      console.log("Transaction recorded successfully:", response.data);
      // Clear the form, retrieve transactions again, and hide the form
      setNewTransaction({
        id: 0,
        accountId: 0,
        accountFromId: 0,
        accountToId: 0,
        transactionDate: "",
        amount: 0,
        narration: "",
      });
      retrieveTransactions();
      toggleForm();
    } catch (error) {
      console.error("Error recording transaction:", error);
    }
  };

  const retrieveTransactions = async () => {
    try {
      // Make a GET request to RetrieveTransactions API
      const response = await axios.get(
        "http://54.226.71.2/RetrieveTransactions"
      );
      console.log("Retrieved transactions:", response.data);
      // Update transactions state with retrieved data
      setTransactions(response.data);
    } catch (error) {
      console.error("Error retrieving transactions:", error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Petty Cash
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
          <button
            type="button"
            onClick={retrieveTransactions}
            className="ml-3 mt-8 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
          >
            Retrieve Transactions
          </button>
        </div>
      </div>
      {showForm && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-xl w-full mx-4">
            <h2 className="text-lg font-semibold mb-4">New Transaction Form</h2>
            <div className="mb-4">
              <label
                htmlFor="accountId"
                className="block text-sm font-medium text-gray-700"
              >
                Account ID
              </label>
              <input
                type="number"
                id="accountId"
                value={newTransaction.accountId}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    accountId: parseInt(e.target.value),
                  })
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="accountFromId"
                className="block text-sm font-medium text-gray-700"
              >
                Account From ID
              </label>
              <input
                type="number"
                id="accountFromId"
                value={newTransaction.accountFromId}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    accountFromId: parseInt(e.target.value),
                  })
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="accountToId"
                className="block text-sm font-medium text-gray-700"
              >
                Account To ID
              </label>
              <input
                type="number"
                id="accountToId"
                value={newTransaction.accountToId}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    accountToId: parseInt(e.target.value),
                  })
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="transactionDate"
                className="block text-sm font-medium text-gray-700"
              >
                Transaction Date
              </label>
              <input
                type="datetime-local"
                id="transactionDate"
                value={newTransaction.transactionDate}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    transactionDate: e.target.value,
                  })
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: parseFloat(e.target.value),
                  })
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="narration"
                className="block text-sm font-medium text-gray-700"
              >
                Narration
              </label>
              <input
                type="text"
                id="narration"
                value={newTransaction.narration}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    narration: e.target.value,
                  })
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
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
                onClick={recordTransaction}
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
              <th
                scope="col"
                className="py-3.2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Account ID
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Account From ID
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Account To ID
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
              >
                Date
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
              >
                Amount
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
              >
                Narration
              </th>
            </tr>
          </thead>
          <tbody>
            {initialTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-200">
                <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                  <div className="font-medium text-gray-900">{transaction.accountId}</div>
                  <div className="mt-1 truncate text-gray-500">
                    {transaction.accountFromId}
                  </div>
                </td>
                <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                  {transaction.accountToId}
                </td>
                <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                  {transaction.Date}
                </td>
                <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                  {transaction.Amount}
                </td>
                <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                  {transaction.narration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
  }
