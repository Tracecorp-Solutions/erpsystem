import React from 'react';
import { Card, Col, Row } from 'antd';

const InvoiceCard = () => (
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} md={6} lg={6}>
      <Card bordered={false} className="w-full">
        <div className="flex items-center">
          <img src="../images/Frame2.svg" width={20} className="mr-2" alt="Icon" />
          <strong className="text-lg font-semibold text-gray-800">$500</strong>
        </div>
        <p className="text-xs text-gray-500">PAID BILLS</p>
      </Card>
    </Col>
    <Col xs={24} sm={12} md={6} lg={6}>
      <Card bordered={false} className="w-full">
        <div className="flex items-center">
          <img src="../images/Frame1.svg" width={20} className="mr-2" alt="Icon" />
          <strong className="text-lg font-semibold text-gray-800">$750</strong>
        </div>
        <p className="text-xs text-gray-500">UNPAID BILLS</p>
      </Card>
    </Col>
    <Col xs={24} sm={12} md={6} lg={6}>
      <Card bordered={false} className="w-full">
        <div className="flex items-center">
          <img src="../images/Frame5.svg" width={20} className="mr-2" alt="Icon" />
          <strong className="text-lg font-semibold text-gray-800">$200</strong>
        </div>
        <p className="text-xs text-gray-500">PARTIALLY PAID</p>
      </Card>
    </Col>
    <Col xs={24} sm={12} md={6} lg={6}>
      <Card bordered={false} className="w-full">
        <div className="flex items-center">
          <img src="../images/Frame6.svg" width={20} className="mr-2" alt="Icon" />
          <strong className="text-lg font-semibold text-gray-800">$300</strong>
        </div>
        <p className="text-xs text-gray-500">PAST DUE</p>
      </Card>
    </Col>
  </Row>
);

export default InvoiceCard;
