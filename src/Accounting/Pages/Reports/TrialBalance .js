import React from "react";
import { Table } from "antd";
import TrialBalanceFilter from "./TrialBalanceFilter";

const TrialBalance = () => {
  // Sample data for the table
  const data = [
    { key: "1", account: "Account 1", description: "Description 1", credit: 1000, debit: 500 },
    { key: "2", account: "Account 2", description: "Description 2", credit: 1500, debit: 2000 },
    { key: "3", account: "Account 3", description: "Description 3", credit: 2000, debit: 1000 },
  ];

  // Columns configuration for the table
  const columns = [
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
    },
    {
      title: "Debit",
      dataIndex: "debit",
      key: "debit",
    },
  ];

  return (
    <div className="container mx-auto mt-6">
      <TrialBalanceFilter />
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default TrialBalance;
