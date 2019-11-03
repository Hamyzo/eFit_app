import React from "react";
import "./App.css";

import { Layout, notification } from "antd";
import {HashRouter, Route} from "react-router-dom";
import windowSize from "react-window-size";

import Sider from "./components/Global/Sider";
import Header from "./components/Global/Header";
import Footer from "./components/Global/Footer";
import MobileFooter from "./components/Global/MobileFooter";

// pages imports

import CoachProgram from "./components/CoachProgram/CoachProgram";
import CustomersList from "./components/CustomersList/CustomersList";
import CustomerInfoStepper from "./components/CustomerProfile/CustomerInfoStepper";
import Repetition from "./components/Repetition/Repetition";
import RepetitionDone from "./components/Repetition/RepetitionDone";
import CustomerDashboard from "./components/CustomerDashboard/CustomerDashboard";
import CustomerMessaging from "./components/CustomerMessaging/CustomerMessaging";
import CustomerAppointments from "./components/CustomerAppointments/CustomerAppointments";
import CustomerNotifications from "./components/CustomerNotifications/CustomerNotifications";
import Program from "./components/CoachProgram/Program";

const { Content } = Layout;

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    const { windowWidth } = this.props;
    return (
      <HashRouter>
        <Layout style={{ minHeight: "100vh" }}>
          {windowWidth < 576 ? null : <Sider />}
          <Layout>
            <Header />
            <Content style={{ margin: "64px 10px 64px 10px" }}>
              <Route exact path="/" component={CustomerDashboard} />
              <Route
                path="/coachProgram/:customerProgramId"
                component={CoachProgram}
              />
              <Route
                  path="/program/:programId"
                  component={Program}
              />
              <Route path="/customersList" component={CustomersList} />
              <Route path="/customerInfoStepper" component={CustomerInfoStepper} />
              <Route path="/myProgram" component={Repetition} />
              <Route path="/appointments" component={CustomerAppointments} />
              <Route path="/messages" component={CustomerMessaging} />
              <Route path="/notifications" component={CustomerNotifications} />
            </Content>
            {windowWidth < 576 ? <MobileFooter /> : null}
          </Layout>
        </Layout>
      </HashRouter>
    );
  }
}

export default windowSize(App);
