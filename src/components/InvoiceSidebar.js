import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table, Button } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";

export default function InvoiceSidebar() {
  const [invoiceData, setInvoiceData] = useState(null);

  const { id } = useParams();
  console.log("idididididididi",id);
  console.log("invoiceeeeee",invoiceData);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/GetBillById/${id}`
        );
        setInvoiceData(response.data);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };

    if (id) {
      fetchInvoiceData();
    }
  }, [id]);

  const tableData = [
    {
      key: "1",
      description: "Product 1",
      amount: 100,
    },
    {
      key: "2",
      description: "Product 2",
      amount: 200,
    },
    {
      key: "3",
      description: "Product 3",
      amount: 300,
    },
  ];

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => `$${text}`,
    },
  ];

  const handleDownloadInvoice = () => {
    const invoiceData = generateInvoice(tableData);
    const blob = new Blob([invoiceData], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "invoice.pdf";
    link.click();
  };

  const generateInvoice = (data) => {
    const doc = new jsPDF();

    doc.setFontSize(16);

    html2canvas(document.querySelector("#invoiceContent")).then((canvas) => {
      const contentDataURL = canvas.toDataURL("image/png");
      doc.addImage(contentDataURL, "PNG", 0, 0, 210, 297);
      doc.save("invoice.pdf");
    });
  };

   const totalAmount = tableData.reduce((acc, curr) => acc + curr.amount, 0);

   const tableDataWithTotal = [...tableData, { key: "total", description: "GRAND TOTAL:", amount: totalAmount }];
 

  return (
    <>
  
        <div
          style={{
            textAlign: "end",
          }}
        >
          <button
            type="button"
            className="relative rounded-md text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="absolute -inset-2.5" />
            <span className="sr-only">Close panel</span>
            <XMarkIcon className="h-10 w-10" aria-hidden="true" style={{ color: "#505050" }} />
          </button>
        </div>
        <div id="invoiceContent">
          <div className="px- text-end" style={{
            marginLeft: "27px",
          }}>
            <h2
              style={{
                fontSize: "36px",
                textAlign: "start",
                color: "#505050",
                fontFamily: "outFit, Sans-serif",
              }}
            >
              Invoice 5678
            </h2>
            <p
              style={{
                // background: "#F6F6F4",
                padding: "5px 10px 5px 10px",
                textAlign: "start",
                borderRadius: "24px",
                width: "75px",
                fontSize: "12px",
              }}
            >
              UNPAID
            </p>
          </div>

          <Row gutter={[16, 16]} style={{ marginTop: "15px",  marginLeft: "20px",
            marginRight: "20px" }}>
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
                  BILL TO
                </h4>
                <p
                  style={{
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  Acme Graphic Design
                </p>
                <p
                  style={{
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  123 Main Street, Cityville, Uganda
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
                  BILL FROM
                </h4>
                <p
                  style={{
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  Tracecorp solutions LTD
                </p>
                <p
                  style={{
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  123 Main Street, Cityville, Uganda
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
                  ISSUED ON
                </h4>
                <p
                  style={{
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  09/12/2024
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
                  DUE ON
                </h4>
                <p
                  style={{
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  09/12/2024
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
          <Table
            dataSource={tableDataWithTotal}
            columns={columns}
            pagination={false}
            style={{ marginTop: "20px",  marginLeft: "20px",
            marginRight: "20px" }}
          />
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "20px",
            marginRight: "20px"
          }}
        >
          <Button
            type="default"
            style={{
              width: "150px",
              borderRadius: "24px",
            }}
          >
            Send Invoice
          </Button>
          <Button
            type="button"
            style={{
              marginLeft: "10px",
              background: "#4467a1",
              color: "#fff",
              fontFamily: "outFit, Sans-serif",
              borderRadius: "24px",
            }}
            onClick={handleDownloadInvoice}
          >
            Download Invoice
          </Button>
        </div>
    </>
  );
}
