import React from "react";
import "./App.css";

import { Layout } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sider from "./components/Global/Sider";
import Header from "./components/Global/Header";
import Footer from "./components/Global/Footer";
import Dashboard from "./pages/Customer/Dashboard";

// pages imports

import Home from "./pages/Common/Home";
import CustomerProgram from "./pages/Coach/CustomerProgram";
import Customers from "./pages/Coach/Customers";

const { Content } = Layout;

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <Layout style={{ minHeight: "100vh" }}>

        <Layout>

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
                <Route path="/dashboard" component={Dashboard} />

              </div>
            </Router>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default App;
