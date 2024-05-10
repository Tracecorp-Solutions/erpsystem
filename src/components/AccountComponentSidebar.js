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
            <h2>OPENING BALANCE</h2>
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
              <Card style={{ width: 400, marginRight: "10px" }}>
                <h2
                  style={{
                    textAlign: "start",
                    fontSize: "11px",
                    fontFamily: "outFit, Sans-serif",
                    color: "#A1a1a1",
                    marginRight: "10px",
                  }}
                >
                  OPENING BALANCE DATE
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

              <Card style={{ width: 400 }}>
                <h2
                  style={{
                    textAlign: "start",
                    fontSize: "11px",
                    fontFamily: "outFit, Sans-serif",
                    color: "#A1a1a1",
                    marginRight: "10px",
                  }}
                >
                  SUBGROUP
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
              <Card style={{ width: 300 }}>
                <p>jajajj</p>
              </Card>

              <Card style={{ width: 300 }}>
                <p>jajajj</p>
              </Card>
            </div>
          </div>
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
