import React, { useState, useEffect } from "react";

const AccountForm = ({
  handleSubmit,
  CancelEdit,
  subGroupAccounts,
  editedAccount,
  setEditedAccount,
}) => {
  useEffect(() => {
    setEditedAccount(editedAccount);
  }, [editedAccount]);

  return (
    <div>
      <h3
        style={{
          color: "#505050",
          fontFamily: "outFit, Sans-serif",
          fontSize: "25px",
          marginTop: "30px",
        }}
      >
        Edit {editedAccount.name}
      </h3>
      <div
        style={{
          maxHeight: "50vh",
          overflowY: "auto",
          paddingRight: "15px",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
        className="overflow-y-auto"
      >
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-1"
              style={{
                fontFamily: "outFit, Sans-serif",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Account Name
            </label>
            <p
              className="text-gray-600 text-sm mb-1"
              style={{ fontFamily: "outFit, Sans-serif" }}
            >
              Choose a unique name for your account that reflects its purpose
            </p>
            <input
              type="text"
              id="name"
              name="name"
              value={editedAccount.name}
              onChange={(e) =>
                setEditedAccount({ ...editedAccount, name: e.target.value })
              }
              placeholder="Please enter account name..."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              style={{ borderRadius: "12px", padding: "15px" }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="accountType"
              className="block mb-1"
              style={{
                fontFamily: "outFit, Sans-serif",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Account Type
            </label>
            <p className="text-gray-600 text-sm mb-1">
              This account can be a Bank account or an In-house account
            </p>
            <select
              id="accountType"
              name="accountType"
              value={editedAccount.accountType}
              onChange={(e) =>
                setEditedAccount({
                  ...editedAccount,
                  accountType: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              style={{ borderRadius: "12px", padding: "15px" }}
            >
              <option value="">Select Account Type</option>
              <option value="Bank">Bank</option>
              <option value="InHouse">InHouse</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="subGroupAccountId"
              className="block mb-1"
              style={{
                fontFamily: "outFit, Sans-serif",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              SubGroup
            </label>
            <p>Select the subgroup this account belongs to</p>
            <select
              id="subGroupAccountId"
              name="subGroupAccountId"
              value={editedAccount.subGroupAccountId}
              onChange={(e) =>
                setEditedAccount({
                  ...editedAccount,
                  subGroupAccountId: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              style={{ borderRadius: "12px", padding: "15px" }}
            >
              <option value="">Select SubGroup</option>
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
          <div className="mb-4">
            <label
              htmlFor="accountNumber"
              className="block mb-1"
              style={{
                fontFamily: "outFit, Sans-serif",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Account Number
            </label>
            <p className="text-gray-600 text-sm mb-1">
              To ensure accurate tracking of transactions
            </p>
            <input
              type="number"
              id="accountNumber"
              name="accountNumber"
              value={editedAccount.accountNumber}
              onChange={(e) =>
                setEditedAccount({
                  ...editedAccount,
                  accountNumber: e.target.value,
                })
              }
              placeholder="Please enter account number..."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              style={{ borderRadius: "12px", padding: "15px" }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="openingBalanceDate"
              className="block mb-1"
              style={{
                fontFamily: "outFit, Sans-serif",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Opening Date
            </label>
            <p style={{ fontFamily: "outFit, Sans-serif", color: "#a1a1a1" }}>
              Initial account value at creation
            </p>
            <input
              type="date"
              id="openingBalanceDate"
              name="openingBalanceDate"
              value={editedAccount.openingBalanceDate}
              onChange={(e) =>
                setEditedAccount({
                  ...editedAccount,
                  openingBalanceDate: e.target.value,
                })
              }
              placeholder="Please enter account balance..."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              style={{ borderRadius: "12px", padding: "15px" }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="balance"
              className="block mb-1"
              style={{
                fontFamily: "outFit, Sans-serif",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Opening Balance
            </label>
            <p style={{ fontFamily: "outFit, Sans-serif", color: "#a1a1a1" }}>
              Initial account value at creation
            </p>
            <input
              type="number"
              id="balance"
              name="balance"
              value={editedAccount.balance}
              onChange={(e) =>
                setEditedAccount({ ...editedAccount, balance: e.target.value })
              }
              placeholder="Please enter account balance..."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              style={{ borderRadius: "12px", padding: "15px" }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block mb-1"
              style={{
                fontFamily: "outFit, Sans-serif",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={editedAccount.description}
              onChange={(e) =>
                setEditedAccount({
                  ...editedAccount,
                  description: e.target.value,
                })
              }
              placeholder="Please enter description..."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              style={{ borderRadius: "12px", padding: "15px" }}
            ></textarea>
          </div>
        </form>
      </div>
      <div
        className="flex justify-between"
        style={{ padding: "10px 20px  10 40px" }}
      >
        <button
          type="button"
          onClick={CancelEdit}
          className="py-2 px-4 text-gray-700 rounded focus:outline-none"
          style={{
            borderRadius: "28px",
            fontFamily: "outFit, Sans-serif",
            width: "40%",
            border: "#505050 1px solid",
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          style={{
            background: "#4467a1",
            borderRadius: "28px",
            fontFamily: "outFit, Sans-serif",
            width: "40%",
          }}
        >
          Save Account
        </button>
      </div>
    </div>
  );
};

export default AccountForm;
