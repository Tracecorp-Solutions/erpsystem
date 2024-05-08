import React from "react";
import { Card, Button, Dropdown, Menu, Row, Col } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import "../styles/components/GroupCreationCard.css";

const GroupAccountCard = () => {
  const menu = (
    <Menu style={{ minWidth: "200px", padding: "10px" }}>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  return (
    <Row justify="center" align="middle">
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <Card style={{ width: "450px", marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 style={{ color: "#505050", fontWeight: "600" }}>Assets</h3>
            <Dropdown overlay={menu} placement="bottomRight">
              <Button type="text" className="dots">
                <EllipsisOutlined />
              </Button>
            </Dropdown>
          </div>
          <p className="description">
            A record for valuable resources, such as cash, accounts
            receivable, inventory, and property, that contribute to your
            business's financial health.
          </p>
          <Button type="button" className="group-btn">
            See SubGroup
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default GroupAccountCard;
