import React from "react";
import "./App.css";

import { Layout } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sider from "./components/Global/Sider";
import Header from "./components/Global/Header";
import Footer from "./components/Global/Footer";

// pages imports

import Home from "./pages/Home/Home";
import CustomerProgram from "./pages/CustomerProgram/CustomerProgram";
import Customers from "./pages/Customer/Customers";
import Repetition from "./pages/Repetition/Repetition";

const { Content } = Layout;

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <Layout style={{ minHeight: "100vh" }}>
        <Sider />
        <Layout>
          <Header />
          <Content style={{}}>
            <Router>
              <div>
                <Route exact path="/" component={Home} />
                <Route
                  exact
                  path="/customerProgram"
                  component={CustomerProgram}
                />
                <Route path="/customers" component={Customers} />
                <Route path="/repetition" component={Repetition} />
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
