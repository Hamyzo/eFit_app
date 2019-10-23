import React from "react";

import { Layout, Icon, Col } from "antd";

const { Header } = Layout;

function HeaderComponent() {
  return (
    <Header className="header">
      <Col span={3} />
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
