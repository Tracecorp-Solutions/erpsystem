import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Select } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";

const { Option } = Select;

const Statement = () => {
  const [statementEntries, setStatementEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [addressFilter, setAddressFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const tableRef = useRef(null);

  useEffect(() => {
    fetchStatementEntries();
  }, []);

  const fetchStatementEntries = async () => {
    try {
      const response = await fetch(`http://3.216.182.63:8095/TestApi/GetAllTickets`);
      const data = await response.json();
      setStatementEntries(data);
      setFilteredEntries(data); // Initialize filtered entries with all entries
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();

    html2canvas(tableRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      pdf.save("ticket_statement.pdf");
    });
  };

  const handleFilter = () => {
    let filteredData = [...statementEntries];

    if (addressFilter) {
      filteredData = filteredData.filter(entry =>
        entry.address.toLowerCase().includes(addressFilter.toLowerCase())
      );
    }

    if (categoryFilter) {
      filteredData = filteredData.filter(entry =>
        entry.ticketCategoryId === parseInt(categoryFilter)
      );
    }

    setFilteredEntries(filteredData);
  };

  const handleClearFilters = () => {
    setAddressFilter("");
    setCategoryFilter("");
    setFilteredEntries(statementEntries);
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <Input
            placeholder="Filter by Address"
            value={addressFilter}
            onChange={(e) => setAddressFilter(e.target.value)}
            style={{ width: 200, marginRight: 10 }}
          />
          <Select
            placeholder="Filter by Ticket Category"
            style={{ width: 200 }}
            allowClear
            value={categoryFilter}
            onChange={(value) => setCategoryFilter(value)}
          >
            {statementEntries.map(entry => (
              <Option key={entry.ticketCategoryId} value={entry.ticketCategoryId}>
                Category {entry.ticketCategoryId}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Button type="primary" onClick={handleFilter} style={{ marginRight: 10 }}>
            Apply Filters
          </Button>
          <Button onClick={handleClearFilters}>Clear Filters</Button>
        </div>
      </div>
      <Button onClick={handleDownloadPDF}>Download PDF</Button>
      <div className="overflow-x-auto mt-4">
        <table className="w-full mt-3" ref={tableRef}>
          <thead>
            <tr>
              <th className="px-6 py-3 text-gray-800 font-semibold">Complaint Subject</th>
              <th className="px-4 py-3 text-gray-800 font-semibold">Description</th>
              <th className="px-4 py-3 text-gray-800 font-semibold">Customer Name</th>
              <th className="px-4 py-3 text-gray-800 font-semibold">Address</th>
              <th className="px-4 py-3 text-gray-800 font-semibold">Ticket Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                  <td className="px-6 py-4">{entry.complaintSubject}</td>
                  <td className="px-4 py-4">{entry.description}</td>
                  <td className="px-4 py-4">{entry.customerName}</td>
                  <td className="px-4 py-4">{entry.address}</td>
                  <td className="px-4 py-4">{entry.ticketCategoryId}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center text-gray-600 font-semibold">
                  No Filtered Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statement;
