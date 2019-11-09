import React from "react";
import {
  Row,
  Col,

} from "antd";
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

    return (
      <div>
        <h1 className="progressTitle"> Progress </h1>
      <div className="progressColumn">
        <Row>
          <Col span={10} offset={1}>
            <div className="dicksonDiv">
              <img
                alt=""
                className="heartAndDickson"
                src="/assets/images/muscle (2).svg"
              />
              <h3>Dickson Index</h3>
            </div>
          </Col>
          <Col span={10} offset={1}>
              <div className="heartDiv">
                <img
                  alt=""
                  className="heartAndDickson"
                src="/assets/images/heartbeat.svg"
              />
              <h3>Resting Heart Rate</h3>
            </div>
          </Col>
        </Row>
      </div>
      </div>

    );
  }
}

export default CustomerProgress;
