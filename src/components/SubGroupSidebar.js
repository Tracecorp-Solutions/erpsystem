import { useState } from "react";
import { Drawer, Modal, Card, Table } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";
import AccountCreationForm from "./AccountForm";

export default function SubComponentSidebar({
  setDrawerVisible,
  drawerVisible,
  selectedAccount,
  accounts,
  setNewAccount,
  newAccount,
  handleSubmit,
  handleCancel,
  showModal,
  subGroupAccounts,
  setShowModal,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const subgroupAccounts = selectedAccount
    ? accounts.filter(
        (account) => account.subGroupAccountId === selectedAccount.id
      )
    : [];

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (data) => data?.name || "N/A",
    },
    {
      title: "CREATED",
      dataIndex: "openingBalanceDate",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

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
          <h2
            style={{
              fontFamily: "outFit, Sans-serif",
              fontSize: "36px",
              fontWeight: "600",
              textAlign: "start",
            }}
          >
            {selectedAccount && selectedAccount.name
              ? selectedAccount.name
              : ""}
          </h2>
          <p style={{ textAlign: "start", fontFamily: "Sans-serif" }}>
            {selectedAccount ? selectedAccount.description : ""}
          </p>
        </div>
        {subgroupAccounts.length > 0 ? (
          <div
            style={{
              border: "1px solid #7a7a7a",
              marginTop: "10px",
              padding: "10px",
              borderRadius: "24px",
            }}
          >
            <h3
              className="text-lg font-semibold mb-2"
              style={{
                color: "#4467a1",
                fontFamily: "outFit, Sans-serif",
                fontSize: "24",
              }}
            >
              Accounts
            </h3>
            <Table
              columns={columns}
              dataSource={subgroupAccounts}
              pagination={false}
            />
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              marginTop: "15px",
              background: "#f6f6f4",
              padding: "20px",
              borderRadius: "24px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src="../images/Group.jpg" width={150} />
            </div>
            <h2
              style={{
                marginTop: "10px",
                fontWeight: "600",
                fontSize: "24px",
                fontFamily: "Sans-serif",
              }}
            >
              Let's keep organizing!
            </h2>
            <p style={{ marginTop: "10px", fontFamily: "sans-serif" }}>
              You haven't created any accounts under Long-Term Assets yet.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="button"
                style={{
                  marginTop: "15px",
                  borderRadius: "24px",
                  padding: "7px 15px 7px 15px",
                  background: "#4467a1",
                  color: "#fff",
                  fontFamily: "outFit, Sans-serif",
                }}
                onClick={() => setShowModal(true)}
              >
                + Create Account
              </button>
            </div>
          </div>
        )}
        <Modal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <AccountCreationForm
            showModal={showModal}
            subGroupAccounts={subGroupAccounts}
            setNewAccount={setNewAccount}
            newAccount={newAccount}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
          />
        </Modal>
      </Drawer>
    </>
  );
}
