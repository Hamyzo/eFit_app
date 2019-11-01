import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { Layout, Icon, Col, Badge } from "antd";

const { Header } = Layout;

function HeaderComponent() {
  return (
    <Header className="header">
      <Col span={3} align="left" offset={1}>
        <NavLink to="notifications">
          <Badge
            count={3}
            overflowCount={9}
            style={{ backgroundColor: "#D46C4E" }}
          >
            <Icon style={{ fontSize: "24px" }} type="bell" />
          </Badge>
        </NavLink>
      </Col>
      <Col span={16} align="center">
        <span>
          <img
            src="/assets/images/96960342-6d75-4269-a814-a7425e62c057.jpg"
            height={"60px"}
          />
        </span>
      </Col>
      <Col span={3} align="right">
        <Icon style={{ fontSize: "24px" }} type="setting" />
      </Col>
    </Header>
  );
}

export default HeaderComponent;
