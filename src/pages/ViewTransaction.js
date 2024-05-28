import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spin } from "antd";

const ViewTransactionsPage = ({ accountId }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true); // Set loading state to true before making the API call
      setError(null); // Reset error state

      try {
        const response = await axios.get(
          `http://3.216.182.63:8095/GetTransactionsByAccountId?accountid=${accountId}`
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Error fetching transactions. Please try again."); // Set error state if API call fails
      } finally {
        setLoading(false); // Set loading state to false after API call (whether it succeeds or fails)
      }
    };

    fetchTransactions();
  }, [accountId]);

  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Account From",
      dataIndex: "accountFromId",
      key: "accountFromId",
    },
    {
      title: "Account To",
      dataIndex: "accountToId",
      key: "accountToId",
    },
    {
      title: "Narration",
      dataIndex: "narration",
      key: "narration",
    },
    {
      title: "Transaction Reference",
      dataIndex: "tranReference",
      key: "tranReference",
    },
    // Add more columns if needed
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Transactions</h1>
      <Table
        columns={columns}
        dataSource={transactions}
        pagination={false}
      />
    </div>
  );
};

export default ViewTransactionsPage;
