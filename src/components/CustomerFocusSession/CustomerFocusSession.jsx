import React from "react";
import { AutoComplete, Row, Col } from "antd";

import "./CustomerFocusSession.css";

class CustomerFocusSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const labelAge = "Age",
      labelWeight = "Weight",
      labelRestHR = "Rest Heart Rate",
      labelTargetHR = "Target Heart Rate";
    return (
      <div>
        <Row>
          <Col span={24}>
            <div>
              <div className={"wrapper-fs"}>
                <AutoComplete placeholder={labelAge} />
                <AutoComplete placeholder={labelWeight} />
                <AutoComplete placeholder={labelRestHR} />
                <AutoComplete placeholder={labelTargetHR} />
              </div>
            </div>
          </Col>
        </Row>
        <Row></Row>
        <Row></Row>
      </div>
    );
  }
}

export default CustomerFocusSession;
