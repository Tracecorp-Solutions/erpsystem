import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";

const Statement = () => {
  const [statementEntries, setStatementEntries] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchStatementEntries();
  }, []);

  const fetchStatementEntries = async () => {
    try {
      const response = await fetch(`http://3.216.182.63:8095/TestApi/GetAllTickets`);
      const data = await response.json();
      setStatementEntries(data);
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

  return (
    <div className="bg-white p-4 rounded-lg">
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
            {statementEntries.length > 0 ? (
              statementEntries.map((entry, index) => (
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
                  No Data Available
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
