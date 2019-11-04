import React from "react";
import { Collapse, Table, Row, Col, Button, Modal, Tabs, Icon } from "antd";
import "./CoachProgram.css";
import Spinner from "../Global/Spinner";
import SessionModal from "./SessionModal";

const { Panel } = Collapse;
const { TabPane } = Tabs;

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
    title: "Repetitions",
    dataIndex: "reps"
  }
];

const customPanelStyle = {
  background: "#f7f7f7",
  borderRadius: 4,
  marginBottom: 10,
  border: 0,
  overflow: "hidden"
};


class DisplayProgram extends React.Component {
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

  handleChangeSession = (name, value) => {
    this.setState({
      selectedSession: {
        ...this.state.selectedSession,
        [name]: value
      }
    });
  };

  handleChangeSessionPeriods = (index, name, value) => {
    console.log(index);
    const { periods } = this.state.selectedSession;
    periods[index] = {
      ...this.state.selectedSession.periods[index],
      [name]: value
    };
    this.setState({
      selectedSession: {
        ...this.state.selectedSession,
        periods
      }
    });
  };

  handleAddPeriod = () => {
    let { periods } = this.state.selectedSession;
    if (periods) {
      periods.push({});
    } else {
      periods = [{}];
    }
    console.log(periods);
    this.setState({
      selectedSession: {
        ...this.state.selectedSession,
        periods
      }
    });
  };

  handleDeletePeriod = i => {
    const { periods } = this.state.selectedSession;
    periods.splice(i, 1);

    console.log(i, periods);
    this.setState({
      selectedSession: {
        ...this.state.selectedSession,
        periods
      }
    });
  };

  handleChangeSessionExercises = (index, name, value) => {
    console.log(index);
    const { exercises } = this.state.selectedSession;
    exercises[index] = {
      ...this.state.selectedSession.exercises[index],
      [name]: value
    };
    this.setState({
      selectedSession: {
        ...this.state.selectedSession,
        exercises
      }
    });
  };

  handleAddExercise = () => {
    let { exercises } = this.state.selectedSession;
    if (exercises) {
      exercises.push({});
    } else {
      exercises = [{}];
    }
    console.log(exercises);
    this.setState({
      selectedSession: {
        ...this.state.selectedSession,
        exercises
      }
    });
  };

  handleDeleteExercise = i => {
    const { exercises } = this.state.selectedSession;
    exercises.splice(i, 1);

    console.log(i, exercises);
    this.setState({
      selectedSession: {
        ...this.state.selectedSession,
        exercises
      }
    });
  };

  handleChangeIndex = index => {
    this.setState({ index });
  };

  showResultsModal = () => {
    this.setState({
      visible: true,
    });
  };

  onChange = checked => {
    console.log(`switch to ${checked}`);
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  formatDate = rawDate => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];

    const d = new Date(rawDate);
    const day = d.getDate();
    const monthIndex = d.getMonth();
    return `${day}/${monthNames[monthIndex]}`;
  };

  add_days_date = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  session_end_date = (session, session_start_date) => {
    let total_days = 0;
    for (let j = 0; j < session.periods.length; j++) {
      total_days += parseInt(session.periods[j].nb_days);
    }
    return this.formatDate(this.add_days_date(session_start_date, total_days));
  };

  period_end_date = (period_length, period_start_date) =>
    this.formatDate(this.add_days_date(period_start_date, period_length));

  session_length = periods => {
    let length = 0;
    for (let j = 0; j < periods.length; j++) {
      length += parseInt(periods[j].nb_days);
    }
    return length;
  };

  session_start_date = (
    program_start_date,
    sessions_array,
    current_session_index
  ) => {
    let days_to_sum = 0;
    for (let i = 0; i < current_session_index; i++) {
      days_to_sum =
        days_to_sum + 1 + this.session_length(sessions_array[i].periods) + 1;
    }
    const new_date = this.add_days_date(program_start_date, days_to_sum);
    return this.formatDate(new_date);
  };

  period_start_date = (program_start_date, periods_array, period_index) => {
    let days_to_sum = 0;
    for (let j = 0; j < period_index; j++) {
      days_to_sum = days_to_sum + 1 + parseInt(periods_array[j].nb_days);
    }
    const new_date = this.add_days_date(
      this.session_start_date(program_start_date),
      days_to_sum
    );
    return this.formatDate(new_date);
  };

  renderPeriod = (session, period, index, start_date, periods_array) => (
    <Panel
      header={
        <div className="margin0">
          <Row>
            <Col span={8}>
              <p className="margin0">
                <strong>Period {index + 1}</strong>
              </p>
            </Col>
            <Col span={8}>
              <p className="margin0">
                <strong>
                  <img className="calendar" src="/assets/images/update.svg" />
                  Reps:{" "}
                </strong>
                -/{period.nb_repetitions}
              </p>
            </Col>
            <Col span={8}>
              <p className="margin0">
                <img className="calendar" src="/assets/images/calendar.svg" />
                {this.period_start_date(
                  start_date,
                  periods_array,
                  index
                )} -{" "}
                {this.period_end_date(
                  period.nb_days,
                  this.period_start_date(start_date, periods_array, index)
                )}
              </p>
            </Col>
          </Row>
        </div>
      }
      key={index}
      style={customPanelStyle}
    >
      <Table
        pagination={false}
        columns={columns}
        dataSource={session.exercises}
        size="middle"
      />
      <Row className="period_btns">
        <Col>
          <Button
            className="results_btn"
            type="primary"
            onClick={this.showResultsModal}
          >
            See Results
          </Button>
        </Col>
      </Row>
      <Modal
        title="Period Results"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Rep 1" key="1" />
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Modal>
    </Panel>
  );

  renderSession = (session, index, program_start_date, sessions_array) => (
    <Panel
      header={
        <div className="margin0">
          <Row>
            <Col span={8}>
              <p className="margin0">
                <strong>{session.name}</strong>
              </p>
            </Col>
            <Col span={8}>
              <p className="margin0">
                <strong>Status:</strong> Not Started
              </p>
            </Col>
            <Col span={8}>
              <p className="margin0">
                <img className="calendar" src="/assets/images/calendar.svg" />
                {this.session_start_date(
                  program_start_date,
                  sessions_array,
                  index
                )}{" "}
                -{" "}
                {this.session_end_date(
                  session,
                  this.session_start_date(
                    program_start_date,
                    sessions_array,
                    index
                  )
                )}
              </p>
            </Col>
          </Row>
        </div>
      }
      key={index}
    >
      <Row>
        <Col span={24}>
          <Button
            className="edit_btn"
            type="primary"
            onClick={() => this.showSessionModal(session, index)}
          >
            Edit Session
          </Button>
        </Col>
      </Row>
      <Collapse bordered={false}>
        {session.periods.map((period, pindex) =>
          this.renderPeriod(
            session,
            period,
            pindex,
            this.session_start_date(program_start_date, sessions_array, index),
            session.periods
          )
        )}
      </Collapse>
    </Panel>
  );

  renderProgram = program => (
    <div>
      <h1 className="program_name">{program.name || program.program.name}</h1>

      <Collapse>
        {program.sessions.map((session, index) =>
          this.renderSession(
            session,
            index,
            program.creation_date,
            program.sessions
          )
        )}
      </Collapse>
      <Row className="period_btns">
        <Col offset={7} span={10}>
          <Button
            onClick={() => this.showSessionModal(null)}
            className="results_btn"
            type="primary"
            block
          >
            <Icon type="plus" /> Add session
          </Button>
        </Col>
      </Row>
    </div>
  );

  render() {
    const {
      program,
      editable,
      onSubmitSession
    } = this.props;
    const {
      displaySessionModal,
      selectedSession,
      index,
      isNewSession,
      originalIndex
    } = this.state;

    console.log(selectedSession);
    return (
      <div>
        {program ? (
          <div>
            {this.renderProgram(program)}
            <SessionModal
              displaySessionModal={displaySessionModal}
              onSubmitSession={(session, i) =>
                onSubmitSession(session, i, originalIndex, isNewSession)
              }
              selectedSession={selectedSession}
              sessions={program.sessions || program.program.sessions}
              index={index}
              onCancel={() => this.setState({ displaySessionModal: false })}
              onChangeSession={this.handleChangeSession}
              onChangeSessionPeriods={this.handleChangeSessionPeriods}
              onAddPeriod={this.handleAddPeriod}
              onDeletePeriod={this.handleDeletePeriod}
              onChangeIndex={this.handleChangeIndex}
              onChangeSessionExercises={this.handleChangeSessionExercises}
              onAddExercise={this.handleAddExercise}
              onDeleteExercise={this.handleDeleteExercise}
              isNewSession={isNewSession}
            />
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default DisplayProgram;
