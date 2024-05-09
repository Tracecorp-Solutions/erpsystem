import React, { useState } from "react";
import { Drawer, Modal } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";
// import SubGroupForm from "./SubGroupForm";

function Card({
  showCreateSubGroupButton,
  setModalVisible,
}) {
  const handleCreateSubGroup = () => {
    setModalVisible(true);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className="bg-white overflow-hidden sm:rounded-lg"
        style={{
          width: "350px",
          background: showCreateSubGroupButton ? "#F6F6F4" : "#fff",
        }}
      >
        <div className="px-4 py-5 sm:px-6">
          {showCreateSubGroupButton && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src="../images/name.svg" width={150} alt="Placeholder" />
            </div>
          )}
          {showCreateSubGroupButton && (
            <>
              <h3
                className="
              text-lg
              font-medium
              leading-6
              text-gray-900
              text-center
              mt-6
              "
              >
                ajjaj
              </h3>
              <p
                className="
                mt-1
                max-w-2xl
                text-sm
                text-gray-500
                text-center
                mt-6
                "
              >
                jsjsj
              </p>
            </>
          )}
          {showCreateSubGroupButton && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="button"
                style={{
                  background: "#4467a1",
                  borderRadius: "20px",
                  padding: "5px 15px 5px 15px",
                }}
                className="text-white mt-5"
                onClick={handleCreateSubGroup}
              >
                + Create SubGroup
              </button>
            </div>
          )}
          {!showCreateSubGroupButton && (
            <div>
              {/* Render existing subgroups */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AccountComponentSidebar({ setDrawerVisible, drawerVisible }) {
  const [modalVisible, setModalVisible] = useState(false);


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
            <XMarkIcon
              className="h-10 w-10"
              aria-hidden="true"
            />
          </button>
          <div className="flex justify-between mt-5">
            <div>
              <h2
                className="
                  text-base
                  font-semibold
                  leading-6"
              >
                  kakak
              </h2>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-sm">jajajj</p>
          </div>
        </div>
        <Card
          showCreateSubGroupButton={true} // Set to true to always show the create subgroup button
          setModalVisible={setModalVisible}
        />
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
