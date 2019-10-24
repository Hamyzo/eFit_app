import React from "react";

import { Badge, Icon, Layout, Menu } from "antd";

const { Footer } = Layout;

function MobileFooterComponent(props) {
  return (
    <Footer className="mobileFooter">
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[props.index]}
        className="bottomMenu"
      >
        <Menu.Item
          onClick={() => props.handleClick("1")}
          className="mobileMenuItem"
          key="1"
        >
          <Icon style={{ fontSize: "24px", color: "#fafafa" }} type="user" />
        </Menu.Item>
        <Menu.Item
          onClick={() => props.handleClick("2")}
          className="mobileMenuItem"
          key="2"
        >
          <Icon style={{ fontSize: "24px", color: "#fafafa" }} type="play-circle" />
        </Menu.Item>
        <Menu.Item
          onClick={() => props.handleClick("3")}
          className="mobileMenuItem"
          key="3"
        >
          <Icon style={{ fontSize: "24px", color: "#fafafa" }} type="dashboard" />
        </Menu.Item>
        <Menu.Item
          onClick={() => props.handleClick("4")}
          className="mobileMenuItem"
          key="4"
        >
          <Badge>
            <Icon style={{ fontSize: "24px", color: "#fafafa" }} type="carry-out" />
          </Badge>
        </Menu.Item>
        <Menu.Item
          onClick={() => props.handleClick("5")}
          className="mobileMenuItem"
          key="5"
        >
          <Badge count={7} overflowCount={9}  style={{backgroundColor:"#D46C4E"}} >
            <Icon style={{ fontSize: "24px", color: "white" }} type="message" />
          </Badge>
        </Menu.Item>
      </Menu>
    </Footer>
  );
}

export default MobileFooterComponent;
