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
    title: "Weight (kg)",
    dataIndex: "weight"
  },
  {
    title: "Sets ",
    dataIndex: "sets"
  },
  {
    title: "Repetitions",
    dataIndex: "repetitions"
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
        "5da1f67ccf53670572677651",
        "populate=program"
      );
      console.log("Program", program);
      this.setState({ program });
    } catch (e) {
      console.log(e);
    }
  };

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
        dataSource={exercises}
        size="middle"
      />
    </Panel>
  );

  loadExercise = (exercise, index) => {
    const i = index + 1;
    const data = {
      key: "{ i }",
      exercise: "{ exercise.exercise }",
      sets: "{ exercise.sets }",
      repetitions: "{ exercise.repetitions }"
    };
    exercises.push(data);
  };

  dayAndMonth = date => {
    const dateFormatted = Date(date);
    const day = dateFormatted.getDate();
    const month = dateFormatted.getMonth();
    return day.toString() + "/" + month.toString();
  };

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
    const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
   `;

    const { Panel } = Collapse;

    return <div>{program ? this.renderProgram(program) : "Loading"}</div>;
  }
}

export default CustomerProgram;
