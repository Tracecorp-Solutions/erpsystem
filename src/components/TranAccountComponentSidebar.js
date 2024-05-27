import React, { useState } from "react";
import { Drawer, Modal, Card } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function TranAccountComponentSidebar({
  setDrawerVisible,
  drawerVisible,
  selectedAccount,
  subGroupAccounts,
  transactions, // Add transactions as a prop
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  console.log("sub group", subGroupAccounts);

  const getSubGroupName = () => {
    if (!selectedAccount || !subGroupAccounts) return "N/A";
    const subGroup = subGroupAccounts.find(
      (item) => item.groupAccount.id === selectedAccount.id
    );
    return subGroup ? subGroup.subGroupAccount.name : "N/A";
  };

  const handleViewTransactions = (transactionId) => {
    // Find the transaction with the provided ID
    const transaction = transactions.find(
      (transaction) => transaction.id === transactionId
    );
    // Set the selected transaction
    setSelectedTransaction(transaction);
    // Show the modal
    setModalVisible(true);
  };

  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={400}
        style={{ height: "100vh", overflow: "auto" }}
      >
        <div className="px- text-start">
          <button
            type="button"
            onClick={() => setDrawerVisible(false)}
            className="relative rounded-md text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="absolute -inset-2.5" />
            <span className="sr-only">Close panel</span>
            <XMarkIcon className="h-10 w-10" aria-hidden="true" />
          </button>

          <div className="mt-5">
            <h3
              className="text-lg font-semibold mb-6 text-left"
              style={{
                color: "#4467a1",
                fontFamily: "outFit, Sans-serif",
                fontSize: "24",
              }}
            >
              TRANSACTION DETAILS
            </h3>
            <div className="px- text-start mb-6">
              <h2 className="font-medium text-gray-400 text-left">
                Transaction Amount{" "}
              </h2>
              <p className="text-gray-800">
                {selectedAccount.transactionAmount}
              </p>
            </div>
            <div className="flex justify-between">
              {/* Displaying transaction reference */}
              <Card
                style={{
                  width: 400,
                  marginRight: "10px",
                  background: "#f6f6f4",
                }}
              >
                <h2 className="font-medium text-gray-600 text-left">
                  Reference Number
                </h2>
                <p className="text-gray-800">
                  {selectedAccount.transactionReference}
                </p>
              </Card>

              {/* Displaying transaction date */}
              <Card style={{ width: 400, background: "#f6f6f4" }}>
                <h2 className="font-medium text-gray-600 text-left">
                  Transaction Date
                </h2>
                <p className="text-gray-800">
                  {selectedAccount.transactionDate}
                </p>
              </Card>
            </div>

            {/* Displaying account from and account to */}
            <div className="flex justify-between mt-5">
              <Card
                style={{
                  width: 400,
                  marginRight: "10px",
                  background: "#f6f6f4",
                }}
              >
                <h2 className="font-medium text-gray-600 text-left">
                  Account From
                </h2>
                <p className="text-gray-800">{selectedAccount.tranAccount}</p>
              </Card>

              <Card style={{ width: 400, background: "#f6f6f4" }}>
                <h2 className="font-medium text-gray-600 text-left">
                  Account To
                </h2>
                <p className="text-gray-800">
                  {selectedAccount.transactionType}
                </p>
              </Card>
            </div>
            <h6
              className=" font-semibold mb-2 mt-8 text-left"
              style={{
                color: "#4467a1",
                fontFamily: "outFit, Sans-serif",
                fontSize: "6",
              }}
            >
              ABOUT ACCOUNT
            </h6>
          </div>
          {/* Existing code for displaying account description */}
        </div>
        <Modal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          {/* Render details of the selected transaction */}
          {selectedTransaction && (
            <div>
              <h2>Transaction Details</h2>
              <p>
                Reference Number: {selectedTransaction.transactionReference}
              </p>
              <p>Transaction Date: {selectedTransaction.transactionDate}</p>
              <p>Account From: {selectedTransaction.tranAccount}</p>
              {/* Add more details as needed */}
            </div>
          )}
        </Modal>
      </Drawer>
    </>
  );
}
