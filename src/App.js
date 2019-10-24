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
import InfoStepper from "./pages/Customer/InfoStepper";
import Repetition from "./pages/Customer/Repetition";
import RepetitionDone from "./pages/Customer/RepetitionDone";
import Dashboard from "./pages/Customer/Dashboard";
import Messaging from "./pages/Customer/Messaging";


const { Content } = Layout;

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  state = {
    content: <Dashboard />,
    index: "3"
  };

  handleClick = (i) => {
    this.setState({ index: i });
    switch (i) {
      case "1":
        this.setState({ content: <InfoStepper /> });
        break;
      case "2":
        this.setState({ content: <Repetition /> });
        break;
      case "3":
        this.setState({ content: <Dashboard /> });
        break;
      case "4":
        this.setState({ content: null });
        break;
      case "5":
        this.setState({ content: <Messaging /> });
        break;
      case "6":
        this.setState({ content: null});
        break;
      default:
        break;
    }
  };

  render() {
    const { windowWidth } = this.props;
    const { content, index } = this.state;
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <Layout style={{ minHeight: "100vh" }}>
        {windowWidth >= 576 ? <Sider handleClick={this.handleClick} index={index} /> : null}
        <Layout>
          <Header handleClick={this.handleClick} index={index} />
          <Content style={{ margin: "64px 10px 64px 10px" }}>
            {/* <Router>
                <div>
                  <Route exact path="/" component={Home} />
                  <Route
                    exact
                    path="/customerProgram/:customerProgramId"
                    component={CustomerProgram}
                  />
                  <Route path="/customers" component={Customers} />
                  <Route path="/infoStepper" component={InfoStepper} />
                </div>
                </Router> */}
            {content}
          </Content>
          <Footer />
          {windowWidth < 576
            ? <MobileFooter handleClick={this.handleClick} index={index} />
            : null}
        </Layout>
      </Layout>
    );
  }
}

export default windowSize(App);
