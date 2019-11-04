import React from "react";
import { Result, Button, Card } from "antd";
import "./Login.css";
import { NavLink, Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = (userType, isLoggedIn) => {
    localStorage.setItem("userType", userType);
    localStorage.setItem("isLoggedIn", isLoggedIn);
    this.props.history.push({
      pathname: "/",
      state: { user: { authenticated: true } }
    });
  };

  render() {
    return (
      <div className="container" id="login">
        <div className="logo-login">
          <img src="/assets/images/logo.png" />
        </div>
        <Card className="formLogin">
          <Button
            type="primary"
            className="btn-lg"
            key="coach"
            onClick={() => this.handleClick("Coach", true)}
          >
            <NavLink to={"/dashboard"}> I am a Coach</NavLink>
          </Button>
          <Button
            key="customer"
            className="btn-lg"
            style={{ marginLeft: "30px" }}
            onClick={() => this.handleClick("Customer", true)}
          >
            I am a Customer
          </Button>
        </Card>
      </div>
    );
  }
}

export default Login;
