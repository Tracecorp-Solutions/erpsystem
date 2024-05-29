import React, { useState } from "react";
import { Drawer, Modal, Card } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function TranAccountComponentSidebar({
  setDrawerVisible,
  drawerVisible,
  selectedAccount,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  // Calculate total transaction amount
  const totalTransactionAmount = selectedAccount.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

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
        <div
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <button
            type="button"
            onClick={() => setDrawerVisible(false)}
            className="relative rounded-md text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="absolute -inset-2.5" />
            <span className="sr-only">Close panel</span>
            <XMarkIcon className="h-10 w-10" aria-hidden="true" />
          </button>
        </div>
        <div className="px- text-start">
          <div className="mt-5">
            <h3
              className="text-lg font-semibold mb-6 text-left"
              style={{
                color: "#505050",
                fontFamily: "outFit, Sans-serif",
                fontSize: "36px",
              }}
            >
              Transaction Details
            </h3>
            <h2 className="font-medium text-gray-400 text-left"
            style={{
              fontSize: "12px"
            }}
            >
              Transaction Amount{" "}
            </h2>
            {/* Display total transaction amount */}
            <p className="text-gray-800" style={{
              color: "#505050",
              fontWeight: "600",
              fontFamily: "outFit, Sans-serif"
            }}>${totalTransactionAmount}</p>
            {selectedAccount.map((data) => (
              <div key={data.id}>
                <div className="px- text-start mb-6">
                  <p className="text-gray-800">{data.transactionAmount}</p>
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
                    <h2
                      className="font-medium text-gray-600 text-left"
                      style={{
                        fontSize: "12px",
                        color: "#a1a1a1",
                        fontFamily: "outFit, Sans-serif",
                        fontWeight: "500",
                      }}
                    >
                      Reference Number
                    </h2>
                    <p className="text-gray-800">{data.transactionReference}</p>
                  </Card>

                  {/* Displaying transaction date */}
                  <Card style={{ width: 400, background: "#f6f6f4" }}>
                    <h2
                      className="font-medium text-gray-600 text-left"
                      style={{
                        fontSize: "12px",
                        color: "#a1a1a1",
                        fontFamily: "outFit, Sans-serif",
                        fontWeight: "500",
                      }}
                    >
                      Transaction Date
                    </h2>
                    <p className="text-gray-800">{data.transactionDate}</p>
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
                    <h2
                      className="font-medium text-gray-600 text-left"
                      style={{
                        fontSize: "12px",
                        color: "#a1a1a1",
                        fontFamily: "outFit, Sans-serif",
                        fontWeight: "500",
                      }}
                    >
                      Account From
                    </h2>
                    <p className="text-gray-800">{data.tranAccount}</p>
                  </Card>

                  <Card style={{ width: 400, background: "#f6f6f4" }}>
                    <h2
                      className="font-medium text-gray-600 text-left"
                      style={{
                        fontSize: "12px",
                        color: "#a1a1a1",
                        fontFamily: "outFit, Sans-serif",
                        fontWeight: "500",
                      }}
                    >
                      Account To
                    </h2>
                    <p className="text-gray-800">{data.transactionType}</p>
                  </Card>
                </div>
              </div>
            ))}
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
        ></Modal>
      </Drawer>
    </>
  );
}
