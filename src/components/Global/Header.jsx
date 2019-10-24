import React from "react";

import { Layout, Icon, Col, Menu, Badge } from "antd";

const { Header } = Layout;

function HeaderComponent(props) {
  return (
    <Header className="header">
      <Col span={3} align="center" onClick={() => props.handleClick("6")}>
        <Badge count={3} overflowCount={9}>
          <Icon style={{ fontSize: "24px" }} type="bell" />
        </Badge>
      </Col>
      <Col span={18} align="center">
        <Icon style={{ fontSize: "24px" }} type="trophy" />
        <span>JD Coaching</span>
        <Icon style={{ fontSize: "24px" }} type="trophy" />
      </Col>
      <Col span={3}>
        <Icon style={{ fontSize: "24px" }} type="setting" />
      </Col>
    </Header>
  );
}

export default HeaderComponent;
