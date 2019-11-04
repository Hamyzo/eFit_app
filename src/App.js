import React from "react";
import "./App.css";

import { Layout, notification } from "antd";
import {HashRouter, Redirect, Route} from "react-router-dom";
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
import Login from "./components/Login/Login";


const { Content } = Layout;

/* const PrivateRoute = ({ isLoggedIn, ...props }) => (
    isLoggedIn
        ? <Route { ...props } />
        : <Redirect to="/login" />
);
*/

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    this.setState({ isLoggedIn });
  }
  render() {
    const { windowWidth } = this.props;
    const { isLoggedIn } = this.state;
    return (
      <HashRouter>
        <Layout style={{ minHeight: "100vh" }}>
          {windowWidth < 576 || !isLoggedIn ? null : <Sider />}
          <Layout>
            {isLoggedIn ? <Header /> : null }
            <Content style={{ margin: "64px 10px 64px 10px" }}>
              {/* <PrivateRoute isLoggedIn={ isLoggedIn } path="/" component={CustomerDashboard} /> */}
              <Route exact path="/" component={Login} />
              <Route exact path="/dashboard" component={CustomerDashboard} />
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
