import { useState, useEffect } from "react";
import { Table, Spin, Alert } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ViewTransaction() {
  const { accountId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountName, setAccountName] = useState("");

  useEffect(() => {
   
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://3.216.182.63:8095/GetTransactionsByAccountId`, {
          params: {
            accountFromId: accountId,
            accountToId: 0,
            transactionDate: "2024-05-28T07:09:00.688Z", // Example date, adjust as needed
            amount: 0,
            narration: "string",
            tranReference: "string"
          },
        });
        setTransactions(response.data);
      } catch (error) {
        setError("Error fetching transactions.");
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

   
    fetchTransactions();
  }, [accountId]);

  const columns = [
    {
      title: 'Transaction Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: 'Narration',
      dataIndex: 'narration',
      key: 'narration',
    },
    {
      title: 'Transaction Reference',
      dataIndex: 'tranReference',
      key: 'tranReference',
    },
  ];

  if (loading) {
    return <Spin tip="Loading transactions..." />;
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Transactions for Account {accountName || accountId}</h2>
      {transactions.length === 0 ? (
        <Alert message="No transactions found for this account." type="info" />
      ) : (
        <Table
          dataSource={transactions}
          columns={columns}
          rowKey={(record) => record.tranReference}
        />
      )}
    </div>
  );
}
