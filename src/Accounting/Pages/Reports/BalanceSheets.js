import React from "react";
import { Table } from "antd";
import BalanceSheetFilterDate from "./BalanceSheetFilterDate";

const BalanceSheet = () => {
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
      ],
    },
  ];

  const renderTotalAmount = (text, record) => record.debit - record.credit;

  const columns = [
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: renderTotalAmount,
    },
  ];

  return (
    <div className="container mx-auto mt-6">
      <BalanceSheetFilterDate />
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
