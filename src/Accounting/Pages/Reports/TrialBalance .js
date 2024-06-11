import React, { useState, useEffect } from "react";
import { Table, Pagination } from "antd";
import TrialBalanceFilter from "./TrialBalanceFilter";
import ErrorMessageCard from "../../components/Shared/ErrorMessageCard";
import EmptyData from "../../components/Shared/EmptyData";
import axios from "axios";

const TrialBalance = () => {
  const [data, setData] = useState([]);
  const [showFailure, setShowFailure] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://3.216.182.63:8095/TestApi/GetTrialBalance"
      );
      setData(response.data);
    } catch (error) {
      setShowFailure(true);
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.filter(
    (item) =>
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentItems = filteredData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Debit Account",
      dataIndex: "debitAccount",
      key: "debitAccount",
    },
    {
      title: "Credit Account",
      dataIndex: "creditAccount",
      key: "creditAccount",
    },
    {
      title: "Debit Amount",
      dataIndex: "debitAmount",
      key: "debitAmount",
    },
    {
      title: "Credit Amount",
      dataIndex: "creditAmount",
      key: "creditAmount",
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
