import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Drawer, Dropdown, Menu } from "antd";
import axios from "axios";
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DownOutlined } from "@ant-design/icons";

const ViewBill = ({ billId, onClose }) => {
  const [bill, setBill] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(true);

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

    
    fetchBillDetails();
  }, [billId]);

  if (!bill) {
    return <p>Loading...</p>;
  }

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const generatePDF = () => {
    const htmlContent = document.getElementById("billContent").innerHTML;
    html2pdf().from(htmlContent).save(`Bill_${bill.billNo}.pdf`);
  };

  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(bill.billTranItems);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bill Details");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, `Bill_${bill.billNo}.xlsx`);
  };

  const handleDownload = ({ key }) => {
    switch (key) {
      case "pdf":
        generatePDF();
        break;
      case "excel":
        generateExcel();
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleDownload}>
      <Menu.Item key="pdf">Download PDF</Menu.Item>
      <Menu.Item key="excel">Download Excel</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={500}
        style={{ height: "100vh", overflow: "auto" }}
      >
        <div style={{ margin: "0 auto", height: "90vh", overflowY: "auto" }}>
          <div style={{ textAlign: "end" }}>
            <Button
              type="button"
              className="relative rounded-md text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setDrawerVisible(false)}
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
            <div className="px- text-end" style={{ marginLeft: "20px" }}>
              <h2
                style={{
                  fontSize: "36px",
                  textAlign: "start",
                  color: "#4467a1",
                  fontFamily: "outFit, Sans-serif",
                }}
              >
                Bill {bill.billNo}
              </h2>
              <p
                style={{
                  padding: "5px 10px",
                  textAlign: "start",
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
                    VENDOR
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
              Bill Items
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs ml-3 font-medium text-gray-500 uppercase tracking-wider"
                      style={{
                        fontFamily: "outFit, Sans-serif",
                      }}
                    >
                      <input
                        type="checkbox"
                        style={{ marginLeft: "6px", marginTop: "12px", marginRight: "8px" }}
                      />
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
                        className="px-6 py-4 ml-3 whitespace-nowrap"
                        style={{
                          fontFamily: "outFit, Sans-serif",
                        }}
                      >
                        <input
                          type="checkbox"
                          style={{ marginLeft: "6px", marginTop: "15px", marginLeft: "8px" }}
                        />
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
              <Dropdown overlay={menu}>
                <Button
                  type="default"
                  style={{
                    width: "200px",
                    borderRadius: "24px",
                    color: "#fff",
                    background: "#4467a1",
                  }}
                >
                  Download Bill
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ViewBill;
