import React from "react";
import "./Header.css";
import { Layout, Icon, Col, Menu, Badge } from "antd";

const { Header } = Layout;

function HeaderComponent(props) {
  return (
    <Header className="header">
      <Col span={3} align="center" onClick={() => props.handleClick("6")}>
        <Badge count={3} overflowCount={9} style={{backgroundColor:"#D46C4E"}}>
          <Icon style={{ fontSize: "24px" }} type="bell" />
        </Badge>
      </Col>
      <Col span={18} align="center">

        <span><img src="/assets/96960342-6d75-4269-a814-a7425e62c057.jpg" height={"60px"}/></span>

      </Col>
      <Col span={3}>
        <Icon style={{ fontSize: "24px" }} type="setting" />
      </Col>
    </Header>
  );
}

export default HeaderComponent;
