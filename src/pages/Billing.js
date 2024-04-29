import React from 'react';
import { Select, Input, Table } from 'antd';

const { Option } = Select;

const columns = [
  {
    title: 'Category',
    dataIndex: 'category',
    render: (text, record) => (
      <Select style={{ width: 120 }} defaultValue={text}>
        <Option value="category1">Category 1</Option>
        <Option value="category2">Category 2</Option>
      </Select>
    ),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    render: (text, record) => (
      <Input defaultValue={text} />
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    render: (text, record) => (
      <Input defaultValue={text} />
    ),
  },
];

const data = [
  {
    key: '1',
    category: '',
    description: '',
    amount: '',
  },
];

const Billing = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4 md:w-1/4">
          <label htmlFor="vendor" className="block mb-1">Vendor</label>
          <Select
            id="vendor"
            className="w-full"
            placeholder="Select vendor"
          >
            <Option value="">Select vendor</Option>
            <Option value="vendor1">Vendor 1</Option>
            <Option value="vendor2">Vendor 2</Option>
          </Select>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/4 px-4 mb-4">
            <label htmlFor="address" className="block mb-1">Address</label>
            <textarea id="address" className="w-full border rounded p-2" rows="4" placeholder="Enter address"></textarea>
          </div>

          <div className="mb-4 px-4 md:w-1/4">
            <label htmlFor="bill" className="block mb-1">Bill</label>
            <Select
              id="bill"
              className="w-full"
              placeholder="Select bill"
            >
              <Option value="">Select bill</Option>
              <Option value="bill1">Bill 1</Option>
              <Option value="bill2">Bill 2</Option>
            </Select>
          </div>

          <div className="w-full md:w-1/4 px-4 mb-4">
            <label htmlFor="billDate" className="block mb-1">Bill Date</label>
            <input type="date" id="billDate" className="w-full border rounded p-2" />
          </div>

          <div className="w-full md:w-1/4 px-4 mb-4">
            <label htmlFor="dueDate" className="block mb-1">Due Date</label>
            <input type="date" id="dueDate" className="w-full border rounded p-2" />
          </div>

          <div className="w-full md:w-1/4 px-4 mb-4">
            <label htmlFor="billNo" className="block mb-1">Bill No</label>
            <input type="text" id="billNo" className="w-full border rounded p-2" placeholder="Enter bill number" />
          </div>
        </div>

        <div>
          <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">Submit</button>
        </div>
      </form>

      <div>
        <h2 className="text-lg font-semibold mb-4">Details of the bills</h2>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};

export default Billing;
