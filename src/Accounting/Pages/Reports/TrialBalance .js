import React, { useState, useEffect } from "react";
import { Table, Pagination } from "antd";
import TrialBalanceFilter from "./TrialBalanceFilter";
import ErrorMessageCard from "../../components/Shared/ErrorMessageCard";
import EmptyData from "../../components/Shared/EmptyData";

const TrialBalance = () => {
  const [data, setData] = useState([]);
  const [showFailure, setShowFailure] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulating fetching data
    const fetchData = async () => {
      try {
        // Fetch your data here
        // Example:
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/trial_balance`);
        // setData(response.data);
        setData([
          { key: "1", account: "Account 1", description: "Description 1", credit: 1000, debit: 500 },
          { key: "2", account: "Account 2", description: "Description 2", credit: 1500, debit: 2000 },
          { key: "3", account: "Account 3", description: "Description 3", credit: 2000, debit: 1000 },
        ]);
      } catch (error) {
        setShowFailure(true);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.filter(
    (item) =>
      item.account.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentItems = filteredData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    <div>
      <div style={{ marginBottom: "10px" }}>
        <TrialBalanceFilter handleSearch={handleSearch} />
      </div>
      {showFailure && (
        <ErrorMessageCard
          title="Server Error!"
          message="Failed to fetch trial balance data."
          onClose={() => setShowFailure(false)}
        />
      )}
      {currentItems.length === 0 ? (
        <EmptyData />
      ) : (
        <div style={{ overflowY: "auto" }}>
          <Table
            dataSource={currentItems}
            columns={columns}
            pagination={false}
          />
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <div style={{ fontSize: "12px", color: "#a1a1a1" }}>
          Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} results
        </div>
        <Pagination
          current={currentPage}
          total={filteredData.length}
          pageSize={itemsPerPage}
          onChange={paginate}
        />
      </div>
    </div>
  );
};

export default TrialBalance;
