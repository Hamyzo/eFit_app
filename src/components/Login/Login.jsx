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
    sessionStorage.setItem("userType", userType);
    sessionStorage.setItem("isLoggedIn", isLoggedIn);
    sessionStorage.setItem(
      "userId",
      userType === "Coach"
        ? "5da1fc92ae4d1111d4e57f47"
        : "5da0f7f5634544464ce4a7ae"
    );
    this.props.history.push({
      pathname: "/dashboard",
      state: { isLoggedIn: true }
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
