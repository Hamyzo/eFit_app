import React from "react";
import { NavLink } from "react-router-dom";

import { Layout, Menu, Icon } from "antd";

const { Sider } = Layout;

class SiderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      userType: null
    };
  }

  componentDidMount() {
    const collapsed = localStorage.getItem("collapse_state") === "true";
    const userType = localStorage.getItem("userType");
    this.setState({ collapsed, userType });
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
    localStorage.setItem("collapse_state", collapsed);
  };

  render() {
    const { collapsed, userType } = this.state;
    const { index } = this.props;
    return (
      <Sider
        style={{ marginTop: "60px" }}
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
      >
        {userType === "Coach" ? (
          <Menu
            style={{ marginTop: "10px" }}
            theme="dark"
            defaultSelectedKeys={[index]}
            mode="inline"
          >
            <Menu.Item key="1">
              <NavLink to="/customerInfoStepper">
                <Icon type="user" />
                <span>My account</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/">
                <Icon type="dashboard" />
                <span>Dashboard</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink to="/appointments">
                <Icon type="carry-out" />
                <span>Appointments</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink to="/messages">
                <Icon type="message" />
                <span>Messages</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="7">
              <NavLink to="/customersList">
                <Icon type="team" />
                <span>My Customers</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        ) : (
          <Menu theme="dark" defaultSelectedKeys={[index]} mode="inline">
            <Menu.Item key="2">
              <NavLink to="/myProgram">
                <Icon type="play-circle" />
                <span>My program</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/">
                <Icon type="dashboard" />
                <span>Dashboard</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink to="/appointments">
                <Icon type="carry-out" />
                <span>Appointments</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink to="/messages">
                <Icon type="message" />
                <span>Messages</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        )}
      </Sider>
    );
  }
}

export default SiderComponent;
