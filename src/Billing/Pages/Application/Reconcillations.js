import React from 'react';
import { Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Reconciliations = () => {
  const dataSource = [
    {
      key: '1',
      customerRef: '219754905',
      customerName: 'Grace Eze',
      amount: '20,000',
      paymentDate: '5th May, 2024',
      transRef: '478530',
      vendorId: 'First Bank',
      status: 'not reconciled',
    },
    // Add more data items as needed
  ];

  const columns = [
    {
      title: 'Customer Ref',
      dataIndex: 'customerRef',
      key: 'customerRef',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Payment Date',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
    },
    {
      title: 'Trans Ref',
      dataIndex: 'transRef',
      key: 'transRef',
    },
    {
      title: 'Vendor ID',
      dataIndex: 'vendorId',
      key: 'vendorId',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <div style={{ background: '#f3f3f3', padding: '5px 10px', borderRadius: '8px' }}>
          {status}
        </div>
      ),
    },
  ];

  const handleSearch = (value) => {
    // Implement your search logic here
    console.log('Searching for:', value);
    // For now, let's log the value to the console
  };

  const handleFilter = () => {
    // Implement your filter logic here
    console.log('Filtering...');
    // For now, let's log a message to the console
  };

  return (
    <div className="flex flex-col justify-center content-start px-6 py-5 rounded-3xl bg-stone-100 max-md:px-5">
      <div className="flex gap-4 justify-between w-full font-semibold whitespace-nowrap leading-[160%] max-md:flex-wrap max-md:max-w-full">
        <div className="text-4xl text-neutral-600">Reconciliations</div>
        <div className="flex gap-2 justify-center py-3 pr-4 pl-6 my-auto text-base text-white rounded-3xl bg-slate-500">
          <div>Actions</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bd69caf513a031a441b0ae2c28050f8e01024dfd2f15fb76144d64f2f7d9df8f?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
            className="shrink-0 self-start w-6 aspect-square"
            alt="Actions"
          />
        </div>
      </div>
      <div className="flex gap-2 justify-between w-full mt-10 text-base leading-6 text-neutral-400 max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-2 py-3 pr-6 pl-4 rounded-3xl border border-solid border-neutral-500 border-opacity-10">
          <SearchOutlined style={{ color: '#6B7280' }} />
          <input
            placeholder="Search Payment Ref..."
            onPressEnter={(e) => handleSearch(e.target.value)}
            className="border-none outline-none focus:ring-0"
          />
        </div>
        <div className="flex gap-2 px-6 py-3 whitespace-nowrap rounded-3xl border border-solid border-neutral-500 border-opacity-30 max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f02b79592faed7d699dd0b3b194f3c1ae722683f5fba56d39d1ae55c28f9d41?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="shrink-0 self-start w-6 aspect-square"
            />
            <div>Filter</div>
          </div>
      </div>
      <div className="p-6 mt-6 bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 10 }} />
      </div>
    </div>
  );
};

export default Reconciliations;
