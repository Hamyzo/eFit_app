import React from "react";

import { Layout, Menu, Icon, Badge } from "antd";

const { Sider } = Layout;
const { SubMenu } = Menu;

class SiderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    const { index, handleClick } = this.props;
    return (
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div className="logoContainer">
          <div className="logo" />
          {setTimeout(
            () =>
              collapsed ? null : <span className="appName">eFit APP</span>,
            100
          )}
        </div>
        <Menu theme="dark" defaultSelectedKeys={[index]} mode="inline">
          <Menu.Item onClick={() => handleClick("1")} key="1">
            <Icon type="user" />
            <span>My account</span>
          </Menu.Item>
          <Menu.Item onClick={() => handleClick("2")} key="2">
            <Icon type="play-circle" />
            <span>My program</span>
          </Menu.Item>
          <Menu.Item onClick={() => handleClick("3")} key="3">
            <Icon type="dashboard" />
            <span>Dashboard</span>
          </Menu.Item>
          <Menu.Item onClick={() => handleClick("4")} key="4">
            <Icon type="carry-out" />
            <span>Appointments</span>
          </Menu.Item>
          <Menu.Item onClick={() => handleClick("5")} key="5">
            <Icon type="message" />
            <span>Messages</span>
          </Menu.Item>
          <Menu.Item onClick={() => handleClick("7")} key="7">
            <Icon type="team" />
            <span>My Customers</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SiderComponent;
