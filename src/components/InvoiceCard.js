import React from 'react';
import { Card, Col, Row } from 'antd';

const InvoiceCard = () => (
  <Row gutter={16}>
    <Col span={6}>
      <Card bordered={false}>
        <div style={{
          display: "flex"
        }}>
          <img src="../images/Frame2.svg" width={20} style={{ marginRight: "10px" }} />
          <strong style={{
            fontSize: "24px",
            fontWeight: "600",
            fontFamily: "outFit, Sans-serif",
            color: "#505050"
            }}>
              $3000
          </strong>
        </div>
        <p
         style={{
            fontSize: "12px",
            color: "#a1a1a1",
            fontFamily: "outFit, Sans-serif",
            fontWeight: "400"
         }}
        >OVERDUE AMOUNT</p>
      </Card>
    </Col>
    <Col span={6}>
      <Card  bordered={false}>
      <div style={{
          display: "flex"
        }}>
          <img src="../images/Frame1.svg" width={20} style={{ marginRight: "10px" }} />
          <strong style={{
            fontSize: "24px",
            fontWeight: "600",
            fontFamily: "outFit, Sans-serif",
            color: "#505050"
            }}>
              $3000
          </strong>
        </div>
        <p
         style={{
            fontSize: "12px",
            color: "#a1a1a1",
            fontFamily: "outFit, Sans-serif",
            fontWeight: "400"
         }}
        >OVERDUE AMOUNT</p>
      </Card>
    </Col>
    <Col span={6}>
      <Card bordered={false}>
      <div style={{
          display: "flex"
        }}>
          <img src="../images/Frame5.svg" width={20} style={{ marginRight: "10px" }} />
          <strong style={{
            fontSize: "24px",
            fontWeight: "600",
            fontFamily: "outFit, Sans-serif",
            color: "#505050"
            }}>
              $3000
          </strong>
        </div>
        <p
         style={{
            fontSize: "12px",
            color: "#a1a1a1",
            fontFamily: "outFit, Sans-serif",
            fontWeight: "400"
         }}
        >OVERDUE AMOUNT</p>
      </Card>
    </Col>
    <Col span={6}>
      <Card  bordered={false}>
      <div style={{
          display: "flex"
        }}>
          <img src="../images/Frame6.svg" width={20} style={{ marginRight: "10px" }} />
          <strong style={{
            fontSize: "24px",
            fontWeight: "600",
            fontFamily: "outFit, Sans-serif",
            color: "#505050"
            }}>
              $3000
          </strong>
        </div>
        <p
         style={{
            fontSize: "12px",
            color: "#a1a1a1",
            fontFamily: "outFit, Sans-serif",
            fontWeight: "400"
         }}
        >OVERDUE AMOUNT</p>
      </Card>
    </Col>
  </Row>
);

export default InvoiceCard;
