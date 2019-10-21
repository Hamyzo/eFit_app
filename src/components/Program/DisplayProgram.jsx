import React from "react";
import { Collapse, Table, Row, Col } from "antd";
import "./Program.css";
const { Panel } = Collapse;
const date = new Date();
const startDay = date.getDate();
const startMonth = date.getMonth() + 1;

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
    title: "Sets X Repetitions",
    dataIndex: "setsXrepetitions"
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

class DisplayProgram extends React.Component {
  constructor(props) {
    super(props);
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
                {startDay}/{startMonth}
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
        dataSource={data}
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
                <strong>Start Date:</strong>{" "}
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

  render() {
    const { program, editable } = this.props;

    return <div>{program ? this.renderProgram(program) : "Loading"}</div>;
  }
}

export default DisplayProgram;
