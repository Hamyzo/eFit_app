import React from "react";

import { Layout, Menu, Icon } from "antd";

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
    return (
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Dashboard</span>
          </Menu.Item>
          <SubMenu
            key="subPrograms"
            title={
              <span>
                <Icon type="desktop" />
                <span>My Programs</span>
              </span>
            }
          >
            <Menu.Item key="11">Stamina Pro</Menu.Item>
            <Menu.Item key="12">Lose up to 40lb in 2 months</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>My Coaches</span>
              </span>
            }
          >
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="team" />
                <span>My Teams</span>
              </span>
            }
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="8">
            <Icon type="team" />
            <span>My Customers</span>
          </Menu.Item>
          <Menu.Item key="9">
            <Icon type="file" />
            <span>File</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SiderComponent;
