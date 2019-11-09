import React from "react";
import { Row, Col } from "antd";
import "./CoachProgram.css";
import Spinner from "../Global/Spinner";

class CustomerProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      displaySessionModal: false,
      selectedSession: {
        periods: [{}],
        exercises: [{}]
      },
      isNewSession: false,
      index: 0,
      originalIndex: 0
    };
  }

  render() {
    //const { program, editable, onSubmitSession } = this.props;
    //const {    } = this.state;

    return <div></div>;
  }
}

export default CustomerProgress;
