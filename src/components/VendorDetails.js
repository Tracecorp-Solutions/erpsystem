import { useState } from "react";
import { Drawer, Modal, Card, Row, Col } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function VendorSideDetails({ setDrawerVisible, drawerVisible, vendorDetails }) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedVendor =
    vendorDetails && vendorDetails.length > 0 ? vendorDetails[0] : null;

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

          {selectedVendor && (
            <div>
              <h2
                style={{
                  textAlign: "start",
                  fontSize: "36px",
                  fontFamily: "outFit, Sans-serif",
                  fontWeight: "600",
                }}
              >
                {selectedVendor.companyName}
              </h2>
              <div style={{ textAlign: "start" }}>
                <span style={{
                  textAlign: "start",
                  background: "#9EC137",
                  color: "#fdf5e6",
                  fontWeight: "500",
                  fontFamily: "outFit, Sans-serif",
                  fontSize: "12px",
                  padding: "5px 10px 5px 10px",
                  borderRadius: "24px"
                  }}
                >
                {selectedVendor.status ? "ACTIVE" : "INACTIVE"}
                </span>
              </div>{" "}
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
                          {selectedVendor.fullName}
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
                          {selectedVendor.companyName}
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
                          {selectedVendor.email}
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
                          {selectedVendor.phone}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
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
                  Contact Information
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
                          WEBSITE
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
                          {selectedVendor.website}
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
                          ADDRESS
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
                          {selectedVendor.addres.street} {" "} {selectedVendor.addres.city} {" "} {" "} {selectedVendor.addres.country}
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
                          MOBILE
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
                          {selectedVendor.mobile}
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
                          {selectedVendor.phone}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
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
                  Billing Information
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
                          OPENING BALANCE
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
                          ${selectedVendor.openingBalance}
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
                          PAYMENT METHOD
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
                          {selectedVendor.companyName}
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
                          BILLING RATE
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
                          {selectedVendor.billingRate}
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
                          ACCOUNT NO
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
                          {selectedVendor.accountNo}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
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
                  About Vendor
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
                          NOTES
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
                          {selectedVendor.notes}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
            </div>
          )}
          <div
            style={{
              border: "1px solid #7a7a7a",
              marginTop: "10px",
              padding: "10px",
              borderRadius: "24px",
            }}
          >
            <h3
              className="text-lg font-semibold mb-2 text-left"
              style={{
                color: "#4467a1",
                fontFamily: "outFit, Sans-serif",
                fontSize: "24",
              }}
            >
              Bills
            </h3>
            <div className="overflow-x-auto">
              <table className="table-auto min-w-full divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bill Number
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount Due
                    </th>
                  </tr>
                </thead>
                {/* <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((account) => (
                    <tr key={account.id}>
                      <td className="px-3 py-4 whitespace-nowrap text-sm  text-gray-500">
                        {account.name}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(
                          account.openingBalanceDate
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody> */}
              </table>
          
            </div>
            
          </div>
          <button
                type="button"
                className="w-full mt-5"
                style={{
                  border: "1px solid #4467a1",
                  padding: "7px",
                  borderRadius: "28px",
                  color: "#4467a1",
                  fontFamily: "outFit, Sans-serif",
                }}
                // onClick={() => handleViewTransactions(selectedAccount.id)}
              >
                {" "}
                {/* Pass the transaction ID */}
                View All Bills
              </button>
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
