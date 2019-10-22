import React from "react";

import { Layout, Menu } from "antd";

const { Footer } = Layout;

function MobileFooterComponent() {
  return (
    <Footer className="footer">
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        className="bottomMenu"
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Footer>
  );
}

export default MobileFooterComponent;
