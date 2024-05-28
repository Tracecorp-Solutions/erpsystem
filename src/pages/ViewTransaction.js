import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

const ViewTransactions = ({ accountId }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch transactions data from your backend API
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`http://3.216.182.63:8095/GetTransactionsByAccountId/${accountId}`);
        const data = await response.json();
        setTransactions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [accountId]);

  const columns = [
    {
        title: 'Reference Number',
        dataIndex: 'transactionReference',
        key: 'transactionReference',
      },
    {
        title: 'Account',
        dataIndex: 'tranAccount',
        key: 'tranAccount',
      },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
    },
    
    // Add more columns as needed based on your transaction data structure
    // Example:
    // {
    //   title: 'Type',
    //   dataIndex: 'type',
    //   key: 'type',
    // },
  ];

  return (
    <div>
      <h1>Transactions</h1>
      <Table columns={columns} dataSource={transactions} loading={loading} />
    </div>
  );
};

export default ViewTransactions;
