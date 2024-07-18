import React, { useState, useEffect } from "react";
import { Table, Button, message, Dropdown, Menu } from "antd";
import { PlusOutlined, VerticalEllipsisOutlined  } from "@ant-design/icons";
import AddProrityLevel from "./AddProrityLevel";

const PrioritySetting = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/GetPriorities`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values, handleCancel, reloadData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/AddPriority`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        body: JSON.stringify({
          priorityName: values.priorityLevelName,
          colorCode: values.colorCode,
          priorityDescription: values.description
        })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      message.success("Priority added successfully!");
      reloadData();
      handleCancel();
    } catch (error) {
      console.error('Error:', error);
      message.error('Error:', error);
    }
  };

  const columns = [
    {
      title: "PRORITY LEVEL",
      dataIndex: "priorityName",
      key: "priorityName",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "priorityDescription",
      key: "priorityDescription",
    },
    {
      title: "COLOR CODE",
      dataIndex: "colorCode",
      key: "colorCode",
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={() => handleAction(record.key)}>
                Update Prority Level
              </Menu.Item>
              <Menu.Item key="2">
                Disable Prority Level
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button type="link">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7dbf8806e95bce2fbed7ce7b2f5db807a8837b3f5d8b859cf52ff980db0ec52c?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
              className="w-5 aspect-square"
            />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const handleAction = (key) => {
    // Implement action handler logic here
    console.log(`Clicked action for item with key: ${key}`);
  };

  return (
    <div className="flex flex-col justify-center content-start py-6 rounded-3xl bg-stone-100">
      <div className="flex gap-2 px-6 text-base leading-6 text-neutral-600 max-md:flex-wrap max-md:px-5">
        <div className="font-semibold">Configuration</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
          className="shrink-0 self-start w-6 aspect-square"
          alt="Configuration Image"
        />
        <div className="max-md:max-w-full">Priority Settings</div>
      </div>
      <div className="flex flex-col self-center p-6 mt-6 bg-white rounded-3xl  max-md:px-5 w-full">
        <div className="flex gap-4 justify-between items-center mb-6 font-semibold leading-[160%] max-md:flex-wrap max-md:max-w-full">
          <div className="text-4xl capitalize text-neutral-600">
            Priority Levels
          </div>
          <Button
            type="primary"
            onClick={showModal}
            className="flex gap-2 justify-center items-center bg-slate-500 px-6 py-5 text-base rounded-3xl max-md:px-5"
          >
            <PlusOutlined />
            Add Priority Level
          </Button>
        </div>
        <Table dataSource={data} columns={columns} pagination={false} scroll={{ x: true }} />
      </div>
      <AddProrityLevel visible={visible} handleCancel={handleCancel} onFinish={onFinish} reloadData={fetchData} />
    </div>
  );
};

export default PrioritySetting;
