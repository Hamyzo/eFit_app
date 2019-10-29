import React from "react";
import "./App.css";

import { Layout, notification } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import windowSize from "react-window-size";

import Sider from "./components/Global/Sider";
import Header from "./components/Global/Header";
import Footer from "./components/Global/Footer";
import MobileFooter from "./components/Global/MobileFooter";

// pages imports

import CustomerProgram from "./components/CoachProgram/CustomerProgram";
import CustomersList from "./components/CustomersList/CustomersList";
import CustomerInfoStepper from "./components/CustomerProfile/CustomerInfoStepper";
import Repetition from "./components/Repetition/Repetition";
import RepetitionDone from "./components/Repetition/RepetitionDone";
import CustomerDashboard from "./components/CustomerDashboard/CustomerDashboard";
import CustomerMessaging from "./components/CustomerMessaging/CustomerMessaging";
import AppointmentScheduler from "./components/CustomerAppointments/CustomerAppointments";
import CustomerNotifications from "./components/CustomerNotifications/CustomerNotifications";


const { Content } = Layout;

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  state = {
    content: <CustomerDashboard />,
    index: "3"
  };

  handleClick = (i) => {
    this.setState({ index: i });
    if (i !== "6") {
      for (let i = 0; i < 10; i++) {
        notification.close(`${i}`);
      }
    }
    switch (i) {
      case "1":
        this.setState({ content: <CustomerInfoStepper /> });
        break;
      case "2":
        this.setState({ content: <Repetition /> });
        break;
      case "3":
        this.setState({ content: <CustomerDashboard /> });
        break;
      case "4":
        this.setState({ content: <AppointmentScheduler />});
        break;
      case "5":
        this.setState({ content: <CustomerMessaging /> });
        break;
      case "6":
        this.setState({ content: <CustomerNotifications /> });
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
