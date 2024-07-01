import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Drawer, Dropdown, Menu } from "antd";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import mammoth from "mammoth";

const ViewInvoice = ({ billId, onClose, visible }) => {
  const [bill, setBill] = useState(null);

  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/GetBillById/${billId}`
        );
        setBill(response.data);
      } catch (error) {
        console.error("Error fetching bill details:", error);
      }
    };

    if (visible && billId) {
      fetchBillDetails();
    }
  }, [billId, visible]);

  if (!bill) {
    return <p></p>;
  }

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDownload = async (type) => {
    switch (type) {
      case "pdf":
        downloadPDF();
        break;
      case "word":
        downloadWord();
        break;
      case "excel":
        downloadExcel();
        break;
      default:
        break;
    }
  };

  const downloadPDF = () => {
    const element = document.getElementById("billContent");
    html2pdf(element, {
      margin: 1,
      filename: `Invoice_${bill.billNo}.pdf`,
      jsPDF: { format: "a4", orientation: "portrait" },
    });
  };

  const downloadWord = async () => {
    const content = document.getElementById("billContent").innerHTML;
    const options = { styleMap: [] };
    const { value } = await mammoth.convertToHtml({ content }, options);
    const blob = new Blob([value], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(blob, `Invoice_${bill.billNo}.docx`);
  };

  const downloadExcel = () => {
    const invoiceData = bill.billTranItems.map((item) => ({
      Description: item.description,
      Amount: item.amount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(invoiceData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoice");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `Invoice_${bill.billNo}.xlsx`);
  };

  const menu = (
    <Menu onClick={(e) => handleDownload(e.key)}>
      <Menu.Item key="pdf">Download as PDF</Menu.Item>
      <Menu.Item key="excel">Download as Excel</Menu.Item>
    </Menu>
  );

  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      width={600}
      style={{ height: "100vh", overflow: "auto" }}
    >
      <div style={{ margin: "0 auto", height: "90vh", overflowY: "auto" }}>
        <div style={{ textAlign: "end" }}>
          <Button
            type="button"
            className="relative rounded-md text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={onClose}
          >
            <span className="absolute -inset-2.5" />
            <span className="sr-only">Close panel</span>
          </Button>
          <Button
            type="default"
            style={{
              width: "150px",
              borderRadius: "24px",
            }}
            onClick={onClose}
          >
            Close
          </Button>
        </div>
        <div id="billContent">
          <div style={{ textAlign: "start", marginLeft: "20px" }}>
            <h2
              style={{
                fontSize: "36px",
                color: "#4467a1",
                fontFamily: "outFit, Sans-serif",
              }}
            >
              Invoice {bill.billNo}
            </h2>
            <p
              style={{
                padding: "5px 10px",
                borderRadius: "24px",
                width: "75px",
                fontSize: "12px",
              }}
            >
              {bill.status}
            </p>
          </div>

          <Row
            gutter={[16, 16]}
            style={{
              marginTop: "15px",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Card style={{ width: "100%", background: "#f6f6f4" }}>
                <h4
                  style={{
                    color: "#a1a1a1",
                    fontSize: "12px",
                    fontWeight: "500",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  Customer
                </h4>
                <p
                  style={{
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  {bill.vendor.fullName}
                </p>
              </Card>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Card style={{ width: "100%", background: "#f6f6f4" }}>
                <h4
                  style={{
                    color: "#a1a1a1",
                    fontSize: "12px",
                    fontWeight: "500",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  DATE
                </h4>
                <p
                  style={{
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  {formatDate(bill.billDate)}
                </p>
              </Card>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Card style={{ width: "100%", background: "#f6f6f4" }}>
                <h4
                  style={{
                    color: "#a1a1a1",
                    fontSize: "12px",
                    fontWeight: "500",
                    fontFamily: "outFit, Sans-serif",
                  }}
                >
                  AMOUNT DUE
                </h4>
                <p
                  style={{
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  ${bill.billTranItems.reduce(
                    (total, item) => total + item.amount,
                    0
                  )}
                </p>
              </Card>
            </Col>
          </Row>

          <h2
            style={{
              color: "#505050",
              fontWeight: "600",
              fontFamily: "outFit, Sans-serif",
              fontSize: "24px",
              marginTop: "30px",
              marginLeft: "25px",
            }}
          >
            Invoice Items
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs m-3 font-medium text-gray-500 uppercase tracking-wider"
                    style={{
                      fontFamily: "outFit, Sans-serif",
                    }}
                  >
                    Description
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{
                      fontFamily: "outFit, Sans-serif",
                    }}
                  >
                    Amount Due
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bill.billTranItems.map((tranItem, index) => (
                  <tr key={index}>
                    <td
                      className="px-6 py-4 m-3 whitespace-nowrap"
                      style={{
                        fontFamily: "outFit, Sans-serif",
                      }}
                    >
                      {tranItem.description}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      style={{
                        fontFamily: "outFit, Sans-serif",
                      }}
                    >
                      {tranItem.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "flex-end",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <Dropdown overlay={menu} placement="bottomRight">
              <Button
                type="default"
                style={{
                  width: "150px",
                  borderRadius: "24px",
                  color: "#fff",
                  background: "#4467a1",
                }}
              >
                Download
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ViewInvoice;
