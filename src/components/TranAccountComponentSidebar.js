import { useState } from "react";
import { Drawer, Modal, Card } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function AccountComponentSidebar({
  setDrawerVisible,
  drawerVisible,
  selectedAccount,
  subGroupAccounts,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  console.log("sub group", subGroupAccounts);

  const getSubGroupName = () => {
    if (!selectedAccount || !subGroupAccounts) return "N/A";
    const subGroup = subGroupAccounts.find(
      (item) => item.groupAccount.id === selectedAccount.id
    );
    return subGroup ? subGroup.subGroupAccount.name : "N/A";
  };

  console.log("Selected account name:", getSubGroupName());

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
          <button
            type="button"
            onClick={() => setDrawerVisible(false)}
            className="relative rounded-md text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="absolute -inset-2.5" />
            <span className="sr-only">Close panel</span>
            <XMarkIcon className="h-10 w-10" aria-hidden="true" />
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              color: "#505050",
              fontSize: "36px",
              fontFamily: "outFit, Sans-serif",
              fontWeight: "600",
            }}
          >
            <h2>{selectedAccount.name}</h2>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              color: "#505050",
              fontSize: "12px",
              fontFamily: "outFit, Sans-serif",
              fontWeight: "500",
            }}
          >
            <h2>Transaction Amount</h2>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              color: "#505050",
              fontSize: "24px",
              fontFamily: "outFit, Sans-serif",
              fontWeight: "600",
            }}
          >
            ${selectedAccount.balance}
          </div>
          <div className="mt-5">
            <div className="flex justify-between">
              <Card
                style={{
                  width: 400,
                  marginRight: "10px",
                  background: "#f6f6f4",
                }}
              >
                <h2
                  style={{
                    textAlign: "start",
                    fontSize: "11px",
                    fontFamily: "outFit, Sans-serif",
                    color: "#A1a1a1",
                  }}
                >
                  REFERENCE NO
                </h2>
                <p
                  style={{
                    textAlign: "start",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  {selectedAccount.openingBalanceDate}
                </p>
              </Card>

              <Card style={{ width: 400, background: "#f6f6f4" }}>
                <h2
                  style={{
                    textAlign: "start",
                    fontSize: "11px",
                    fontFamily: "outFit, Sans-serif",
                    color: "#A1a1a1",
                    marginRight: "10px",
                  }}
                >
                  TRANSACTION DATE
                </h2>
                <p
                  style={{
                    textAlign: "start",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  {getSubGroupName(selectedAccount.name)}
                </p>
              </Card>
            </div>

            <div className="flex justify-between mt-5">
              <Card
                style={{
                  width: 400,
                  marginRight: "10px",
                  background: "#f6f6f4",
                }}
              >
                <h2
                  style={{
                    textAlign: "start",
                    fontSize: "11px",
                    fontFamily: "outFit, Sans-serif",
                    color: "#A1a1a1",
                    marginRight: "10px",
                  }}
                >
                  ACCOUNT FROM
                </h2>
                <p
                  style={{
                    textAlign: "start",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  {selectedAccount.accountType}
                </p>
              </Card>

              <Card style={{ width: 400, background: "#f6f6f4" }}>
                <h2
                  style={{
                    textAlign: "start",
                    fontSize: "11px",
                    fontFamily: "outFit, Sans-serif",
                    color: "#A1a1a1",
                  }}
                >
                  ACCOUNT TO
                </h2>
                <p
                  style={{
                    textAlign: "start",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  {selectedAccount.accountNumber}
                </p>
              </Card>
            </div>
          </div>
          <div style={{ marginTop: "25px" }}>
            <h2
              style={{
                textAlign: "start",
                fontSize: "12px",
                fontFamily: "outFit, Sans-serif",
                color: "#A1a1a1",
                fontWeight: "500"
              }}
            >
              ABOUT ACCOUNT
            </h2>
            <p
              style={{
                textAlign: "start",
                fontSize: "16px",
                fontWeight: "400",
                color: "#505050",
                fontFamily: "outFit, Sans-serif",
                marginTop: "10px"
              }}
            >
              {selectedAccount.description}
            </p>
          </div>
          <button type="button"
            className="w-full mt-5"
            style={{
                border: "1px solid #4467a1",
                padding: "7px",
                borderRadius: "28px",
                color: "#4467a1",
                fontFamily: "outFit, Sans-serif"
                }}>
                View Transactions
          </button>
        </div>
        <Modal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          {/* <SubGroupForm onCancel={() => setModalVisible(false)} /> */}
        </Modal>
      </Drawer>
    </>
  );
}
