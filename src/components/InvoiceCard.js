import React from 'react';
import { Card, Col, Row } from 'antd';

const InvoiceCard = () => (
  <Row gutter={16}>
    <Col span={6}>
      <Card bordered={false}>
        Card content
      </Card>
    </Col>
    <Col span={6}>
      <Card  bordered={false}>
        Card content
      </Card>
    </Col>
    <Col span={6}>
      <Card bordered={false}>
        Card content
      </Card>
    </Col>
    <Col span={6}>
      <Card  bordered={false}>
        Card content
      </Card>
    </Col>
  </Row>
);

export default InvoiceCard;
