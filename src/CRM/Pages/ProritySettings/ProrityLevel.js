import React from 'react';
import { Table, Button } from 'antd';

const PrioritySetting = () => {
  const dataSource = [
    {
      key: '1',
      priorityLevel: 'High',
      description: 'Critical issues',
      colorCode: 'Red',
      action: <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/49cb2a2ae5958328284b4cf43a7edcbd1950f0d96e98aaa141a18245dd06024e?apiKey=0d95acea82cc4b259a61e827c24c5c6c" className="w-5 aspect-square" alt="Action" />,
    },
    {
      key: '2',
      priorityLevel: 'Medium',
      description: 'Important but not urgent',
      colorCode: 'Yellow',
      action: <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/49cb2a2ae5958328284b4cf43a7edcbd1950f0d96e98aaa141a18245dd06024e?apiKey=0d95acea82cc4b259a61e827c24c5c6c" className="w-5 aspect-square" alt="Action" />,
    },
    {
      key: '3',
      priorityLevel: 'Low',
      description: 'Minor issues',
      colorCode: 'Green',
      action: <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/49cb2a2ae5958328284b4cf43a7edcbd1950f0d96e98aaa141a18245dd06024e?apiKey=0d95acea82cc4b259a61e827c24c5c6c" className="w-5 aspect-square" alt="Action" />,
    },
  ];

  const columns = [
    {
      title: 'Priority Level',
      dataIndex: 'priorityLevel',
      key: 'priorityLevel',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Color Code',
      dataIndex: 'colorCode',
      key: 'colorCode',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Button type="link" onClick={() => handleAction(record.key)}>View</Button>
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
        <div className="flex gap-4 justify-between items-center font-semibold leading-[160%] max-md:flex-wrap max-md:max-w-full">
          <div className="text-4xl capitalize text-neutral-600">Priority Levels</div>
          <Button type="primary" className="flex gap-2 justify-center items-center px-6 py-3 text-base rounded-3xl max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a6fbf858a262ca173836b28ea1635646ad60c82456acd8cee2b922f3be3bea7?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
              className="shrink-0 self-start w-6 aspect-square"
              alt="Add Priority Level Icon"
            />
            Add Priority Level
          </Button>
        </div>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
    </div>
  );
};

export default PrioritySetting;
