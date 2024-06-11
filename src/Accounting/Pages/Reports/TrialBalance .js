import React, { useState, useEffect } from "react";
import { Table, Pagination } from "antd";
import TrialBalanceFilter from "./TrialBalanceFilter";
import ErrorMessageCard from "../../components/Shared/ErrorMessageCard";
import EmptyData from "../../components/Shared/EmptyData";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

  const handleDownload = async (format) => {
    if (format === "pdf") {
      const pdf = new jsPDF();
  
      pdf.text("Trial Balance Report", 10, 10);
  
      const columns = [
        { title: "Description", dataKey: "description" },
        { title: "Debit Account", dataKey: "debitAccount" },
        { title: "Credit Account", dataKey: "creditAccount" },
        { title: "Debit Amount", dataKey: "debitAmount" },
        { title: "Credit Amount", dataKey: "creditAmount" },
      ];
  
      const rows = filteredData.map((item, index) => ({
        description: item.description,
        debitAccount: item.debitAccount,
        creditAccount: item.creditAccount,
        debitAmount: item.debitAmount,
        creditAmount: item.creditAmount,
      }));
  
      pdf.autoTable({
        head: [columns.map(col => col.title)],
        body: rows.map(row => columns.map(col => row[col.dataKey])),
        startY: 20,
      });
  
      pdf.save("trial_balance_report.pdf");
    } else if (format === "csv") {
      const csvContent = generateCSV();
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "trial_balance_report.csv");
    } else if (format === "excel") {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Trial Balance");
      XLSX.writeFile(workbook, "trial_balance_report.xlsx");
    }
  };

  const generateCSV = () => {
    const headers = [
      "Description",
      "Debit Account",
      "Credit Account",
      "Debit Amount",
      "Credit Amount",
    ];
    const csvRows = [
      headers.join(","),
      ...filteredData.map(
        (item) =>
          `${item.description},${item.debitAccount},${item.creditAccount},${item.debitAmount},${item.creditAmount}`
      ),
    ];
    return csvRows.join("\n");
  };
  
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
      {/* <div style={{ marginBottom: "10px" }}>
        <TrialBalanceFilter handleSearch={handleSearch} handleDownload={handleDownload} />
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
      </div> */}
      <h1 className="text-center text-xl">Coming Soon!</h1>
    </div>
  );
};

export default TrialBalance;
