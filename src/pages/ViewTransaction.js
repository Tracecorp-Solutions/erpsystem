import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Table } from "antd";

const ViewTransactions = () => {
  const location = useLocation();
  const accountId = location.state?.accountId;
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (accountId) {
      const fetchTransactions = async () => {
        try {
          const response = await fetch(
            `http://3.216.182.63:8095/GetTransactionsByAccountId/${accountId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch transactions");
          }
          const data = await response.json();
          console.log("Fetched transactions data:", data); // Debug log
          setTransactions(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching transactions:", error);
          setLoading(false);
        }
      };

      fetchTransactions();
    } else {
      console.warn("No accountId found in location state"); // Debug log
    }
  }, [accountId]);

  const columns = [
    {
      title: "Reference Number",
      dataIndex: "transactionReference",
      key: "transactionReference",
    },
    {
      title: "Account",
      dataIndex: "tranAccount",
      key: "tranAccount",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (text) => new Date(text).toLocaleDateString("en-US"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Running Balance",
      dataIndex: "runningBalance",
      key: "runningBalance",
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
      key: "transactionType",
    },
    {
      title: "Narration",
      dataIndex: "narration",
      key: "narration",
    },
  ];

  return (
    <div>
      <h1>Transactions</h1>
      <Table columns={columns} dataSource={transactions} loading={loading} rowKey="id" />
    </div>
  );
};

export default ViewTransactions;
