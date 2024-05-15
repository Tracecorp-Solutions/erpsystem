import React, { useState } from "react";
import { Drawer, Modal, Card } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function AccountComponentSidebar({
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
    const transaction = transactions.find((transaction) => transaction.id === transactionId);
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
        width={500}
        style={{ height: "100vh", overflow: "auto" }}
      >
        <div className="px- text-end">
          {/* Existing code for closing button and account name */}

          <div className="mt-5">
            <div className="flex justify-between">
              {/* Displaying transaction reference */}
              <Card
                style={{
                  width: 400,
                  marginRight: "10px",
                  background: "#f6f6f4",
                }}
              >
                <h2 className="font-medium text-gray-800">Reference Number</h2>
                <p className="text-gray-800">{selectedAccount.transactionReference}</p>
              </Card>

              {/* Displaying transaction date */}
              <Card style={{ width: 400, background: "#f6f6f4" }}>
                <h2 className="font-medium text-gray-800">Transaction Date</h2>
                <p className="text-gray-800">{selectedAccount.transactionDate}</p>
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
                <h2 className="font-medium text-gray-800">Account From</h2>
                <p className="text-gray-800">{selectedAccount.tranAccount}</p>
              </Card>

              <Card style={{ width: 400, background: "#f6f6f4" }}>
                <h2 className="font-medium text-gray-800">Account To</h2>
                <p className="text-gray-800">{selectedAccount.transactionType}</p>
              </Card>
            </div>
          </div>
          {/* Existing code for displaying account description */}
          
          {/* View Transactions button */}
          <button 
            type="button"
            className="w-full mt-5"
            style={{
                border: "1px solid #4467a1",
                padding: "7px",
                borderRadius: "28px",
                color: "#4467a1",
                fontFamily: "outFit, Sans-serif"
                }}
            onClick={() => handleViewTransactions(selectedAccount.id)}> {/* Pass the transaction ID */}
            View Transactions
          </button>
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
              <p>Reference Number: {selectedTransaction.transactionReference}</p>
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
