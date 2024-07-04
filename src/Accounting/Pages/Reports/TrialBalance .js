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
      <div className="flex flex-col p-6 bg-white rounded-3xl max-md:px-5">
      <div className="flex gap-2 justify-between w-full text-base leading-6 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-2 px-6 py-3 rounded-3xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f02b79592faed7d699dd0b3b194f3c1ae722683f5fba56d39d1ae55c28f9d41?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
            className="shrink-0 self-start w-6 aspect-square"
          />
          <div>Filter</div>
        </div>
        <div className="flex gap-2 px-6 py-3 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2db10bbbfea74ab4d6421f41550d261f3b0fc63c181014f826d06ba56fed8a5c?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
            className="shrink-0 self-start w-6 aspect-square"
          />
          <div>Export</div>
        </div>
      </div>
      <div className="flex gap-5 justify-between px-6 py-4 mt-4 w-full text-xs font-medium tracking-wide uppercase whitespace-nowrap rounded-3xl bg-stone-100 text-neutral-400 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between">
          <div>Account</div>
          <div>description</div>
        </div>
        <div className="flex gap-5 justify-between">
          <div>credit</div>
          <div>debit</div>
        </div>
      </div>
      <div className="flex gap-5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="justify-center bg-white">Petty Cash</div>
        <div className="text-ellipsis">
          Pay Smart TV Screen for developer presentations
        </div>
        <div className="justify-center font-semibold whitespace-nowrap bg-white">
          $1,120
        </div>
        <div className="justify-center font-semibold whitespace-nowrap bg-white">
          $1,120
        </div>
      </div>
      <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="flex gap-5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="justify-center bg-white">Petty Cash</div>
        <div className="text-ellipsis">
          Pay for developer Facilitation
        </div>
        <div className="justify-center font-semibold whitespace-nowrap bg-white">
          $3,120
        </div>
        <div className="justify-center font-semibold whitespace-nowrap bg-white">
          $1,120
        </div>
      </div>
      <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="flex gap-5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="justify-center bg-white">Bank</div>
        <div className="text-ellipsis">
         Per Diem
        </div>
        <div className="justify-center font-semibold whitespace-nowrap bg-white">
          $1,000
        </div>
        <div className="justify-center font-semibold whitespace-nowrap bg-white">
          $1,000
        </div>
      </div>
      <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="flex gap-5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="justify-center bg-white">Bank</div>
        <div className="text-ellipsis">
          Pay for meals 
        </div>
        <div className="justify-center font-semibold whitespace-nowrap bg-white">
          $920
        </div>
        <div className="justify-center font-semibold whitespace-nowrap bg-white">
          $920
        </div>
      </div>
      <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="flex gap-5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="justify-center bg-white">Petty Cash</div>
        <div className="text-ellipsis">
          Pay Smart TV Screen for developer presentations
        </div>
        <div className="justify-center font-semibold whitespace-nowrap bg-white">
          $1,120
        </div>
        <div className="justify-center font-semibold whitespace-nowrap bg-white">
          $1,120
        </div>
      </div>
  
      <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="flex gap-5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="justify-center bg-white">Bank</div>
        <div className="text-ellipsis">
          Pay Salary
        </div>
        <div className="justify-center font-semibold whitespace-nowrap bg-white">
          $3,120
        </div>
        <div className="justify-center font-semibold whitespace-nowrap bg-white">
          $3,120
        </div>
      </div>
      <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="flex gap-2 justify-between mt-2 w-full bg-white max-md:flex-wrap max-md:max-w-full">
        <div className="my-auto text-base leading-6 text-neutral-400">
          Showing 1 - 10 of 150
        </div>
        <div className="flex gap-2">
          <div className="flex justify-center items-center px-4 w-12 h-12 rounded-3xl bg-stone-100">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff1835eab83aaba4b3b28c08f4efdfa5b5b13efe57cf4ba87e34e28be72ba65d?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="w-6 aspect-square"
            />
          </div>
          <div className="justify-center items-center px-4 w-12 h-12 text-base font-semibold leading-6 text-white whitespace-nowrap rounded-3xl bg-slate-500 max-md:px-5">
            1
          </div>
          <div className="justify-center items-start px-4 py-3 text-base font-semibold leading-6 whitespace-nowrap rounded-3xl border border-solid border-neutral-500 border-opacity-10 text-neutral-400">
            2
          </div>
          <div className="flex justify-center items-center px-4 py-3 rounded-3xl border border-solid border-neutral-500 border-opacity-10">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c19c09b34073900dfacfc3a10ceab301e637c63c0b80eb00f201bc01a698a5ef?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="w-6 aspect-square"
            />
          </div>
          <div className="justify-center px-4 py-3 text-base font-semibold leading-6 whitespace-nowrap rounded-3xl border border-solid border-neutral-500 border-opacity-10 text-neutral-400">
            9
          </div>
          <div className="flex justify-center items-center px-4 w-12 h-12 rounded-3xl bg-stone-100">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5638cce5b32f789274ceeb5d277945e2b48f65a50c7c69d40aaa318a0cb3751a?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="w-6 aspect-square"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TrialBalance;



