import React from "react";
import { Row, Col, Table } from "antd";
import "./CoachProgram.css";
import Spinner from "../Global/Spinner";

const columns = [
  {
    title: "Exercise",
    dataIndex: "exercise.name"
  },
  {
    title: "Sets",
    dataIndex: "sets"
  },
  {
    title: "% Progress",
    dataIndex: "reps"
  }
];

class CustomerProgress extends React.Component {
  constructor(props) {
    super(props);
  }

  lastIndex = focusSessions => {
    return focusSessions[focusSessions.length].dickson_index;
  };

  render() {
    const { program } = this.props;
    //const {    } = this.state;
    console.log("!!!!!" + program);
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
          <Row>
            <Table
              pagination={false}
              columns={columns}
              dataSource={""}
              size="small"
              bordered={false}
            />
          </Row>
        </div>
      </div>
    );
  }
}

export default CustomerProgress;
