import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, Modal, Form, Input, Button } from "antd";

const { Option } = Select;

const AccountCreation = () => {
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [subGroupAccounts, setSubGroupAccounts] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchGroups();
    fetchSubGroupAccounts();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL1}/GetAllGroupAccounts`
      );
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const fetchSubGroupAccounts = async () => {
    try {
      const response = await axios.get(
        "http://54.226.71.2/GetAllSubGroupAccounts"
      );
      setSubGroupAccounts(response.data);
    } catch (error) {
      console.error("Error fetching subGroup accounts", error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", values);
      setShowModal(false);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2
          style={{
            fontFamily: "outFit,Sans-serif",
            color: "#505050",
            fontWeight: "600",
            fontSize: "25px",
          }}
        >
          Accounts
        </h2>
        <Button
          type="primary"
          onClick={() => setShowModal(true)}
          style={{
            background: "#4467a1",
            borderRadius: "28px",
            fontFamily: "outFit, Sans-serif",
          }}
        >
          + Create Account
        </Button>
      </div>
      <Modal
        title="New Account Form"
        visible={showModal}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="subGroupAccountId"
            label="SubGroup"
            rules={[{ required: true, message: "Please select a subgroup" }]}
          >
            <Select placeholder="Select SubGroup">
              {subGroupAccounts.map((subGroup) => (
                <Option
                  key={subGroup.subGroupAccount.id}
                  value={subGroup.subGroupAccount.id}
                >
                  {subGroup.subGroupAccount.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Account name is required" }]}
          >
            <Input placeholder="Please enter account name..." />
          </Form.Item>
          <Form.Item
            name="balance"
            label="Opening Bal"
            rules={[
              { required: true, message: "Please enter account balance" },
              { type: "number", message: "Invalid balance" },
            ]}
          >
            <Input
              type="number"
              placeholder="Please enter account balance..."
            />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Please enter description..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AccountCreation;
