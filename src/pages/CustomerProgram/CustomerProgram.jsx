import React from "react";
import { Collapse, Table, Row, Col } from "antd";
import "./CustomerProgram.css";
import * as apiServices from "../../apiServices";
const { Panel } = Collapse;
const exercises = [];

const columns = [
  {
    title: "Exercise",
    dataIndex: "exercise"
  },
  {
    title: "Sets ",
    dataIndex: "sets"
  },
  {
    title: "Repetitions",
    dataIndex: "reps"
  }
];
const data = [
  {
    key: "1",
    exercise: "Push ups",
    weight: "N/A",
    setsXrepetitions: "3 x 12"
  },
  {
    key: "2",
    exercise: "Squats",
    weight: 42,
    setsXrepetitions: "3 x 12"
  },
  {
    key: "3",
    exercise: "Deadlift",
    weight: 30,
    setsXrepetitions: "4x6"
  }
];

class CustomerProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      program: null
    };
  }

  componentDidMount = async () => {
    this.getProgram();
  };

  getProgram = async _ => {
    try {
      const program = await apiServices.getOne(
        "customerPrograms",
        this.props.match.params.customerProgramId,
        "populate=program"
      );
      console.log("Program", program);
      this.setState({ program });
    } catch (e) {
      console.log(e);
    }
  };

  loadExercises = (exercises, index) => {

  }

  renderPeriod = (period, index) => (
    <Panel
      header={
        <div className="margin0">
          <Row>
            <Col span={6}>
              <p className="margin0">
                <strong>Period {index + 1}</strong>
              </p>
            </Col>
            <Col span={6}>
              <p className="margin0">
                <strong>Completed:</strong> 0 out of {period.nb_repetitions}
              </p>
            </Col>
            <Col span={6}>
              <p className="margin0">
                <strong>Start Date:</strong>
              </p>
            </Col>
            <Col span={6}>
              <p className="margin0">
                <strong>End Date:</strong>
              </p>
            </Col>
          </Row>
        </div>
      }
      key={index}
    >
      <Table
        pagination={false}
        columns={columns}
        dataSource={period.exercises}
        size="middle"
      />
    </Panel>
  );




  renderSession = (session, index) => (
    <Panel
      header={
        <div className="margin0">
          <Row>
            <Col span={6}>
              <p className="margin0">
                <strong>{session.name}</strong>
              </p>
            </Col>
            <Col span={6}>
              <p className="margin0">
                <strong>Status:</strong> In Progress
              </p>
            </Col>
            <Col span={6}>
              <p className="margin0">
                <strong>Start Date:</strong>
              </p>
            </Col>
            <Col span={6}>
              <p className="margin0">
                <strong>End Date:</strong>{" "}
              </p>
            </Col>
          </Row>
        </div>
      }
      key={index}
    >
      <p>{session.description}</p>
      <Collapse>
        {session.periods.map((period, index) =>
          this.renderPeriod(period, index)
        )}
      </Collapse>
    </Panel>
  );

  renderProgram = ({ program }) => (
    <div>
      <br />
      <h1>{program.name}</h1>
      <br />
      <Collapse>
        {program.sessions.map((session, index) =>
          this.renderSession(session, index)
        )}
      </Collapse>
    </div>
  );

  callback = key => {
    console.log(key);
  };

  render() {
    const { program } = this.state;

    return <div>{program ? this.renderProgram(program) : "Loading"}</div>;
  }
}

export default CustomerProgram;
