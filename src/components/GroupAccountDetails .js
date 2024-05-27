import React from "react";
import { Modal } from "antd";

const GroupAccountDetails = ({ account, onClose }) => {
  return (
    <Modal
      title={account.name}
      visible={true}
      onCancel={onClose}
      footer={[
        <button key="close" onClick={onClose}>
          Close
        </button>
      ]}
    >
      <p>Behaviour: {account.behaviour}</p>
      <p>Description: {account.description}</p>
    </Modal>
  );
};

export default GroupAccountDetails;
