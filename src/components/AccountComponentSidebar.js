import React, { useState } from "react";
import { Drawer, Modal } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function AccountComponentSidebar({ setDrawerVisible, drawerVisible, selectedAccount }) {
  const [modalVisible, setModalVisible] = useState(false);

  console.log("selected account", selectedAccount);


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
                  {selectedAccount.name}
              </h2>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-sm">jajajj</p>
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
