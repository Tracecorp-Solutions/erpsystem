import React from "react";
import { Card, Col, Row } from "antd";

const InvoiceCard = ({ total, paidTotalAmount, unpaidTotalAmount }) => (
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} md={6} lg={6}>
      <Card bordered={false} className="w-full">
        <div className="flex items-center">
          <img
            src="../images/Frame7.svg"
            width={20}
            className="mr-2"
            alt="Icon"
          />
          <strong className="text-lg font-semibold text-gray-800">
            ${unpaidTotalAmount}
          </strong>
        </div>
        <p className="text-xs text-gray-500">OPEN INVOICES TOTALS</p>
      </Card>
    </Col>
    <Col xs={24} sm={12} md={6} lg={6}>
      <Card bordered={false} className="w-full">
        <div className="flex items-center">
          <img
            src="../images/Frame1.svg"
            width={20}
            className="mr-2"
            alt="Icon"
          />
          <strong className="text-lg font-semibold text-gray-800">
            ${paidTotalAmount}
          </strong>
        </div>
        <p className="text-xs text-gray-500">PAID INVOICES TOTALS</p>
      </Card>
    </Col>
    <Col xs={24} sm={12} md={6} lg={6}>
      <Card bordered={false} className="w-full">
        <div className="flex items-center">
          <img
            src="../images/Frame5.svg"
            width={20}
            className="mr-2"
            alt="Icon"
          />
          <strong className="text-lg font-semibold text-gray-800">$3000</strong>
        </div>
        <p className="text-xs text-gray-500">DRAFTED TOTALS</p>
      </Card>
    </Col>
    <Col xs={24} sm={12} md={6} lg={6}>
      <Card bordered={false} className="w-full">
        <div className="flex items-center">
          <img
            src="../images/Frame6.svg"
            width={20}
            className="mr-2"
            alt="Icon"
          />
          <strong className="text-lg font-semibold text-gray-800">
            15 Invoices
          </strong>
        </div>
        <p className="text-xs text-gray-500">SCHEDULED THIS WEEK</p>
      </Card>
    </Col>
  </Row>
);

export default InvoiceCard;
