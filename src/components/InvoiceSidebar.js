import React, { useState } from "react";
import { Drawer, Modal, Card, Row, Col } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function InvoiceSidebar({
  setDrawerVisible,
  drawerVisible,
}) {
  const [modalVisible, setModalVisible] = useState(false);

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

        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Card style={{ width: "100%" }}>
              <h4>BILL TO</h4>
              <p>Acme Graphic Design</p>
              <p>123 Main Street, Cityville, Uganda</p>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Card style={{ width: "100%" }}>
              <h4>BILL FROM</h4>
              <p>Tracecorp solutions LTD</p>
              <p>123 Main Street, Cityville, Uganda</p>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Card style={{ width: "100%" }}>
              <h4>ISSUED ON</h4>
              <p>09/12/2024</p>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Card style={{ width: "100%" }}>
              <h4>DUE ON</h4>
              <p>09/12/2024</p>
            </Card>
          </Col>
        </Row>

        <Modal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        ></Modal>
      </Drawer>
    </>
  );
}
