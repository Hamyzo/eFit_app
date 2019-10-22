import React from "react";
import "./App.css";

import { Layout } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import windowSize from "react-window-size";

import Sider from "./components/Global/Sider";
import Header from "./components/Global/Header";
import Footer from "./components/Global/Footer";
import MobileFooter from "./components/Global/MobileFooter";

// pages imports

import Home from "./pages/Common/Home";
import CustomerProgram from "./pages/Coach/CustomerProgram";
import Customers from "./pages/Coach/Customers";

const { Content } = Layout;

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    const { windowWidth } = this.props;
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <Layout style={{ minHeight: "100vh" }}>
        {windowWidth >= 768 ? <Sider /> : null}
        <Layout>
          <Header />
          <Content style={{ margin: "0 16px" }}>
            <Router>
              <div>
                <Route exact path="/" component={Home} />
                <Route
                  exact
                  path="/customerProgram/:customerProgramId"
                  component={CustomerProgram}
                />
                <Route path="/customers" component={Customers} />
              </div>
            </Router>
          </Content>
          {windowWidth >= 768 ? <Footer /> : <MobileFooter />}
        </Layout>
      </Layout>
    );
  }
}

export default windowSize(App);
