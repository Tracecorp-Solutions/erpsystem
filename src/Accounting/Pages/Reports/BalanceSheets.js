import React from "react";
import { Table } from "antd";

const BalanceSheet = () => {
  // Dummy data for demonstration
  const tablesData = [
    {
      title: "Assets",
      data: [
        {
          key: "1",
          account: "Asset 1",
          debit: 1000,
          credit: 500,
        },
        {
          key: "2",
          account: "Asset 2",
          debit: 700,
          credit: 900,
        },
        // Add more asset data as needed
      ],
    },
    {
      title: "Liabilities",
      data: [
        {
          key: "1",
          account: "Liability 1",
          debit: 500,
          credit: 1000,
        },
        {
          key: "2",
          account: "Liability 2",
          debit: 900,
          credit: 700,
        },
        // Add more liability data as needed
      ],
    },
    // Add more arrays of data as needed
  ];

  // Calculate the total amount for each row
  const renderTotalAmount = (text, record) => record.debit - record.credit;

  // Define the columns
  const columns = [
    {
      title: "Account", // Change this title to a dynamic value
      dataIndex: "account",
      key: "account",
    },
    {
      title: "Total Amount", // Change this title to a dynamic value
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: renderTotalAmount,
    },
  ];

  return (
    <div className="container mx-auto mt-6">
      {tablesData.map((table, index) => (
        <div key={index} className="mb-6">
          <Table
            dataSource={table.data}
            columns={[
              {
                ...columns[0],
                title: table.title,
              },
              ...columns.slice(1),
            ]}
            pagination={false}
          />
        </div>
      ))}
    </div>
  );
};

export default BalanceSheet;
