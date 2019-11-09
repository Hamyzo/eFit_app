import React from "react";
import "./App.css";

import { Layout, notification } from "antd";
import { HashRouter, Redirect, Route } from "react-router-dom";
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

const PrivateRoute = ({ isLoggedIn, path, component }) => (
  isLoggedIn
    ? <Route exact path={path} component={component} />
    : <Redirect to="/login" />
);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem("isLoggedIn") === "true"
    };
  }

  /* componentDidMount() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    this.setState({ isLoggedIn });
  } */
  
  render() {
    const { windowWidth } = this.props;
    const { isLoggedIn } = this.state;
    console.log("isLoggedIn", isLoggedIn);
    return (
      <HashRouter>
        <Layout style={{ minHeight: "100vh" }}>
          {isLoggedIn ? <Header /> : null }
          <Layout>
            {windowWidth < 576 || !isLoggedIn ? null : <Sider />}
            <Content style={{ margin: "64px 10px 64px 10px" }}>
              <PrivateRoute isLoggedIn={isLoggedIn} path="/" component={CustomerDashboard} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute
                isLoggedIn={isLoggedIn}
                path="/coachProgram/:customerProgramId"
                component={CoachProgram}
              />
              <PrivateRoute
                isLoggedIn={isLoggedIn}
                path="/program/:programId"
                component={Program}
              />
              <PrivateRoute isLoggedIn={isLoggedIn} path="/customersList" component={CustomersList} />
              <PrivateRoute isLoggedIn={isLoggedIn} path="/customerInfoStepper" component={CustomerInfoStepper} />
              <PrivateRoute isLoggedIn={isLoggedIn} path="/myProgram" component={Repetition} />
              <PrivateRoute isLoggedIn={isLoggedIn} path="/appointments" component={CustomerAppointments} />
              <PrivateRoute isLoggedIn={isLoggedIn} path="/messages" component={CustomerMessaging} />
              <PrivateRoute isLoggedIn={isLoggedIn} path="/notifications" component={CustomerNotifications} />
            </Content>
            {windowWidth < 576 ? <MobileFooter /> : null}
          </Layout>
        </Layout>
      </HashRouter>
    );
  }
}

export default windowSize(App);
