import React from "react";
import { Collapse, Table, Row, Col, Button, Modal, Tabs, Icon, Avatar } from "antd";
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

const columns_results = [
  {
    title: "Exercise",
    dataIndex: "exercise.name"
  },
  {
    title: "Performance",
    dataIndex: "performance"
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

  showSessionModal = (selectedSession, index) => {
    this.setState({
      selectedSession: selectedSession || {
        periods: [{}],
        exercises: [{}]
      },
      index,
      originalIndex: index,
      isNewSession: !selectedSession,
      displaySessionModal: true
    });
  };

  handleChangeSessionPeriods = (index, name, value) => {
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
      visible: true
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
        <Col offset={6} span={12}>
          <Button
            className="results_btn"

            onClick={this.showResultsModal} block
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
        <Tabs defaultActiveKey="0">
          {period.results.map((rep, r_index) =>
              this.renderRep(
                rep,
                r_index
              )
            )}
        </Tabs>
      </Modal>
    </Panel>
  );

  renderRep = (period, index) => (

    <TabPane tab={"Rep" + (index + 1)} key={index}>
      <Table
        pagination={false}
        columns={columns_results}
        dataSource={period}
        size="small"
        bordered={false}
      />
      <br />
      {console.log(period)}
    </TabPane>
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

      <Row>
        <Col offset={8} span={4}>
          <Button
            className="results_btn"
            onClick={() => this.showSessionModal(session, index)}
            block
          >
            Edit Session
          </Button>
        </Col>
        <Col span={4}>
          <Button
            className="delete_session_btn"
            type="danger"
            onClick={() => this.showSessionModal(session, index)}
            block
          >
            Delete Session
          </Button>
        </Col>
      </Row>
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

  renderBanner = customer => (
    <div className="customer_banner">
      <Row>
        <Col span={2}><Avatar src={customer.img} size={64}/></Col>
        <Col span={4}>
          <h1>{customer.first_name} {customer.last_name}</h1>
          <p>Last workout: dd/mm</p>
        </Col>
        <Col offset={4} span={4}>
          <p> Currently on: Session 2, Period 1</p>
        </Col>
      </Row>
    </div>
  );

  render() {
    const { program, editable, onSubmitSession } = this.props;
    const {
      displaySessionModal,
      selectedSession,
      index,
      isNewSession,
      originalIndex
    } = this.state;


    return (
      <div>
        {program ? (
          <div>
            {/*this.renderBanner(program.customer)*/}
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
