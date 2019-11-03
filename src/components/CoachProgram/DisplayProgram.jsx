import React from "react";
import { Collapse, Table, Row, Col, Button, Modal, Tabs } from "antd";
import "./CoachProgram.css";
import Spinner from "../Global/Spinner";
import NewSessionModal from "./NewSessionModal";

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
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 10,
  border: 0,
  overflow: 'hidden',
};


class DisplayProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      displayAddSession: false
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  onChange = checked => {
    console.log(`switch to ${checked}`);
  };
  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
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
                <strong>
                  Period
                  {index + 1}
                </strong>
              </p>
            </Col>
            <Col span={8}>
              <p className="margin0">
                <strong><img className="calendar" src="/assets/images/update.svg" />Reps: </strong>
                -/{period.nb_repetitions}
              </p>
            </Col>
            <Col span={8}>
              <p className="margin0">
                <img className="calendar" src="/assets/images/calendar.svg" />
                {this.period_start_date(start_date, periods_array, index)} - {this.period_end_date(
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
          <Button className="results_btn" type="primary" onClick={this.showModal}>See Results</Button>
          {/*<Button className="edit_btn" type="primary">Edit Period</Button>*/}
        </Col>
      </Row>
      <Modal
        title="Period Results"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Rep 1" key="1">

          </TabPane>
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
                )} - {this.session_end_date(
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
    </Panel>
  );

  renderProgram = program => (
    <div>
      <h1 className="program_name">{program.program.name}</h1>

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
            onClick={() => this.setState({ displayAddSession: true })}
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
      isCustomerProgram,
      onSubmitNewSession
    } = this.props;
    const { displayAddSession } = this.state;

    return (
      <div>
        {program ? (
          <div>
            {this.renderProgram(program, isCustomerProgram)}
            <NewSessionModal
              displayAddSession={displayAddSession}
              onSubmitNewSession={onSubmitNewSession}
              sessions={program.sessions || program.program.sessions}
              onCancel={() => this.setState({ displayAddSession: false })}
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
