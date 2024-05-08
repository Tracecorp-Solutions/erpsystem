import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Modal, Form, Input, DatePicker, message } from 'antd';
import moment from 'moment'; // Make sure to install moment for handling date
import { EditOutlined } from '@ant-design/icons';

const apiBaseURL = 'http://54.226.71.2';

export default function SubGroupAccounts() {
  const [subGroups, setSubGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSubGroup, setCurrentSubGroup] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchSubGroups();
  }, []);

  const fetchSubGroups = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiBaseURL}/GetAllSubGroupAccounts`);
      setSubGroups(response.data);
    } catch (error) {
      console.error('Error fetching sub group accounts:', error);
      message.error('Failed to load sub-groups.');
    }
    setLoading(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
        title: 'Group',
        dataIndex: 'group',
        key: 'group',
      },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button icon={<EditOutlined />} onClick={() => showEditModal(record)} />
      )
    }
  ];

  const showEditModal = (subGroup) => {
    setCurrentSubGroup(subGroup);
    form.setFieldsValue({
      ...subGroup,
      dateCreated: subGroup.dateCreated ? moment(subGroup.dateCreated) : null
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setCurrentSubGroup(null);
  };

  const handleSave = async () => {
  await form.validateFields().then(async (values) => {
    const method = currentSubGroup ? 'patch' : 'post';  // Assuming 'patch' for updates if your API requires it
    const url = currentSubGroup ? `${apiBaseURL}/EditSubGroupAccount` : `${apiBaseURL}/CreateSubGroupAccount`;
    setLoading(true);
    try {
      const response = await axios({
        method: method,
        url: url,
        data: { ...values, id: currentSubGroup ? currentSubGroup.id : undefined },
        headers: { 'Content-Type': 'application/json' }
      });
      if(response.status === 200 || response.status === 201) {  // Check for successful status codes
        fetchSubGroups();
        setIsModalVisible(false);
        message.success('Sub-group saved successfully.');
      } else {
        throw new Error('Failed to save sub-group');  // Throw an error if the status code is not successful
      }
    } catch (error) {
      console.error('Failed to save sub-group:', error);
      message.error(error.response?.data?.message || 'Failed to save sub-group.');  // Display error message from server if available
    } finally {
      setLoading(false);
    }
  }).catch(info => {
    console.log('Validate Failed:', info);
    message.error('Please correct the form errors and try again.');
  });
};


  return (
    <div>
      <Button type="primary" onClick={() => showEditModal({})} style={{ marginBottom: 16, float: 'right' }}>
        Create Sub-Group
      </Button>
      <Table dataSource={subGroups} columns={columns} loading={loading} rowKey="id" />
      <Modal
        title={currentSubGroup ? "Edit Sub-Group" : "Create Sub-Group"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="groupId" label="Group ID" rules={[{ required: true, message: 'Please input the group ID!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="dateCreated" label="Date Created">
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
