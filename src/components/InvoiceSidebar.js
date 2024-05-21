import React, { useState } from "react";
import { Drawer, Modal, Card, Row, Col, Table } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function InvoiceSidebar({ setDrawerVisible, drawerVisible }) {
  const [modalVisible, setModalVisible] = useState(false);

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
    },
  ];

  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={550}
        style={{ height: "100vh", overflow: "auto" }}
      >
        <div className="px- text-end">
          <button
            type="button"
            onClick={() => setDrawerVisible(false)}
            className="relative rounded-md text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="absolute -inset-2.5" />
            <span className="sr-only">Close panel</span>
            <XMarkIcon className="h-10 w-10" aria-hidden="true" />
          </button>
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
              background: "#F6F6F4",
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

        <Row gutter={[16, 16]} style={{ marginTop: "15px" }}>
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
          }}
        >
          Invoice Items
        </h2>
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false}
          style={{ marginTop: "20px" }}
        />
        <Modal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        ></Modal>
      </Drawer>
    </>
  );
}
