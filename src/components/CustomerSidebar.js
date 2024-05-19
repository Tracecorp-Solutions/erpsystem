import { useState } from "react";
import { Drawer, Modal, Card, Row, Col } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CustomerSidebar({
  setDrawerVisible,
  drawerVisible,
  customerDetails,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedCustomer =
    customerDetails && customerDetails.length > 0 ? customerDetails[0] : null;

  console.log("selectedCustomer", selectedCustomer);

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
          {selectedCustomer && (
            <div>
              <h2
                style={{
                  textAlign: "start",
                  fontSize: "36px",
                  fontFamily: "outFit, Sans-serif",
                  fontWeight: "600",
                }}
              >
                {selectedCustomer.companyName}
              </h2>
              <div>
                <h3
                  style={{
                    color: "#4467a1",
                    textAlign: "start",
                    fontSize: "16px",
                    fontWeight: "600",
                    fontFamily: "outFit, Sans-serif",
                    marginTop: "20px",
                  }}
                >
                  Personal Information
                </h3>
                <Card
                  style={{
                    background: "#F6F6F4",
                  }}
                >
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <strong
                          style={{
                            textAlign: "start",
                            fontFamily: "outFit, Sans-serif",
                            fontWeight: "500",
                            color: "#a1a1a1",
                            fontSize: "12px",
                          }}
                        >
                          NAME
                        </strong>
                        <span
                          style={{
                            textAlign: "start",
                            fontFamily: "outFit, Sans-serif",
                            fontWeight: "400",
                            fontSize: "16px",
                            color: "#505050",
                          }}
                        >
                          {selectedCustomer.fullName}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginTop: "20px"
                        }}
                      >
                        <strong
                          style={{
                            textAlign: "start",
                            fontFamily: "outFit, Sans-serif",
                            fontWeight: "500",
                            color: "#a1a1a1",
                            fontSize: "12px",
                          }}
                        >
                          COMPANY
                        </strong>
                        <span
                          style={{
                            textAlign: "start",
                            fontFamily: "outFit, Sans-serif",
                            fontWeight: "400",
                            fontSize: "16px",
                            color: "#505050",
                          }}
                        >
                          {selectedCustomer.companyName}
                        </span>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <strong
                          style={{
                            textAlign: "start",
                            fontFamily: "outFit, Sans-serif",
                            fontWeight: "500",
                            color: "#a1a1a1",
                            fontSize: "12px",
                          }}
                        >
                          EMAIL
                        </strong>
                        <span
                          style={{
                            textAlign: "start",
                            fontFamily: "outFit, Sans-serif",
                            fontWeight: "400",
                            fontSize: "16px",
                            color: "#505050",
                          }}
                        >
                          {selectedCustomer.email}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginTop: "20px",
                        }}
                      >
                        <strong
                          style={{
                            textAlign: "start",
                            fontFamily: "outFit, Sans-serif",
                            fontWeight: "500",
                            color: "#a1a1a1",
                            fontSize: "12px",
                          }}
                        >
                          PHONE
                        </strong>
                        <span
                          style={{
                            textAlign: "start",
                            fontFamily: "outFit, Sans-serif",
                            fontWeight: "400",
                            fontSize: "16px",
                            color: "#505050",
                          }}
                        >
                          {selectedCustomer.phone}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
            </div>
          )}
        </div>
        <Modal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        ></Modal>
      </Drawer>
    </>
  );
}
