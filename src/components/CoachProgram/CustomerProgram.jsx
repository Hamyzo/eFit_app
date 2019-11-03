import React from "react";
import { Collapse, Table, Row, Col, Button, Modal, Tabs, Card } from "antd";
import "./CoachProgram.css";
import Spinner from "../Global/Spinner";
import * as apiServices from "../../apiServices";

const { Meta } = Card;

class CustomerProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: []
    };
  }
  componentDidMount = async () => {
    this.getAllPrograms();
  };

  getAllPrograms = async _ => {
    try {
      const programs = await apiServices.get(
        "customerPrograms",
        "populate=program"
      );
      console.log("Program", programs);
      this.setState({ programs });
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const { programs } = this.state;

    return (
      <div>
        {programs.map((program, index) => (
          <Col span={6}>
            <Card
              className="wrapper"
              id="card"
              style={{}}
              cover={<img alt="run" src="/assets/images/run.jpg" />}
            >
              <Meta
                title={program.program.name}
                description={program.program.description}
                style={{ marginTop: "2%" }}
              />
              <Button
                block
                className="btn-start"
                onClick={() => this.startOnClick()}
              >
                START
              </Button>
            </Card>
          </Col>
        ))}
      </div>
    );
  }
}

export default CustomerProgram;
