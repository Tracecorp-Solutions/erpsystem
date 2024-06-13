import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Table } from "antd";
// import TopNav from "../components/TopNav";
// import SideNav from "../components/SideNav";

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
            `${process.env.REACT_APP_API_URL}/GetTransactionsByAccountId?accountid=${accountId}`
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
    <>
      {/* <SideNav /> */}
      <div className="content">
        {/* <TopNav /> */}
        
        <h1
          style={{
            marginBottom: "10px",
            marginTop: "10px",
            fontFamily: "Sans-serif",
            color: "rgb(72, 164, 249)",
          }}
        >
          Transactions Under This Account
        </h1>
        <Table
          columns={columns}
          dataSource={transactions}
          loading={loading}
          rowKey="id"
        />
      </div>
    </>
  );
};

export default ViewTransactions;
