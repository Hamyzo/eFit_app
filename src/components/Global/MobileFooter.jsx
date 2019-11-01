import React from "react";

import { Badge, Icon, Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";

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
        <Menu.Item className="mobileMenuItem" key="1">
          <NavLink to="/customerInfoStepper">
            <Icon style={{ fontSize: "24px", color: "#fafafa" }} type="user" />
          </NavLink>
        </Menu.Item>
        <Menu.Item className="mobileMenuItem" key="2">
          <NavLink to="/myProgram">
            <Icon
              style={{ fontSize: "24px", color: "#fafafa" }}
              type="play-circle"
            />
          </NavLink>
        </Menu.Item>
        <Menu.Item className="mobileMenuItem" key="3">
          <NavLink to="/">
            <Icon
              style={{ fontSize: "24px", color: "#fafafa" }}
              type="dashboard"
            />
          </NavLink>
        </Menu.Item>
        <Menu.Item className="mobileMenuItem" key="4">
          <NavLink to="/appointments">
            <Badge>
              <Icon
                style={{ fontSize: "24px", color: "#fafafa" }}
                type="carry-out"
              />
            </Badge>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="mobileMenuItem" key="5">
          <NavLink to="/messages">
            <Badge
              count={7}
              overflowCount={9}
              style={{ backgroundColor: "#D46C4E" }}
            >
              <Icon
                style={{ fontSize: "24px", color: "white" }}
                type="message"
              />
            </Badge>
          </NavLink>
        </Menu.Item>
      </Menu>
    </Footer>
  );
}

export default MobileFooterComponent;
