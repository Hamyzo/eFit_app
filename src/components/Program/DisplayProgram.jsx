import React from "react";
import { Collapse, Table, Row, Col } from "antd";
import "./Program.css";
import Spinner from "../Global/Spinner";
const { Panel } = Collapse;


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

  formatDate = rawDate => {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var d = new Date(rawDate);
    var day = d.getDate();
    var monthIndex = d.getMonth();
    return day + '/' + monthNames[monthIndex];

  }


  add_days_date = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  session_end_date= (session, session_start_date) => {
    var total_days = 0;
    for(var j = 0; j < session.periods.length; j++) {
      total_days = total_days + parseInt(session.periods[j].nb_days);
    }
    return this.formatDate(this.add_days_date(session_start_date, total_days));
}

  period_end_date = (period_length, period_start_date)=> {
    return this.formatDate(this.add_days_date(period_start_date, period_length));
  }

  session_length = periods => {
    var length = 0;
    for(var j = 0; j < periods.length; j++){
      console.log("PERIOD DAYS: " + periods[j].nb_days);
      length = length + parseInt(periods[j].nb_days);
    }
    return length;
  }

  session_start_date = (program_start_date, sessions_array, current_session_index) => {
   var days_to_sum = 0;
    for(var i = 0; i < current_session_index; i++) {
        days_to_sum = days_to_sum + 1+  this.session_length(sessions_array[i].periods) + 1;
    }
    var new_date = this.add_days_date(program_start_date, days_to_sum);
    return this.formatDate(new_date);
  }

  period_start_date = (program_start_date, periods_array, period_index) => {
    var days_to_sum = 0;
    //console.log("PERIOD INDEX: "+ period_index + "SES SD: " + session_start_date)
    for(var j = 0; j < period_index; j++){
      days_to_sum = days_to_sum + 1 + parseInt(periods_array[j].nb_days);
    }
    var new_date = this.add_days_date(this.session_start_date(program_start_date), days_to_sum);
    console.log("----TOTAL: "+ days_to_sum);
    return this.formatDate(new_date);
  }


  renderPeriod = (period, index, start_date, periods_array) => (
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
                <strong>Length:</strong> {period.nb_days}
              </p>
            </Col>
            <Col span={6}>
              <p className="margin0">
                <strong>Start Date: </strong>
                {this.period_start_date(start_date, periods_array, index)}
              </p>
            </Col>
            <Col span={6}>
              <p className="margin0">
                <strong>End Date:</strong>
                {this.period_end_date(period.nb_days, this.period_start_date(start_date, periods_array, index))}
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

  renderSession = (session, index, program_start_date, sessions_array) => (
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
                <strong>Start Date:</strong> {this.session_start_date(program_start_date, sessions_array, index)}
              </p>
            </Col>
            <Col span={6}>
              <p className="margin0">
                <strong>End Date:</strong> {this.session_end_date(session, this.session_start_date(program_start_date, sessions_array, index))}
              </p>
            </Col>
          </Row>
        </div>
      }
      key={index}
    >
      <Collapse>
        {session.periods.map((period, pindex) =>
          this.renderPeriod(period, pindex, this.session_start_date(program_start_date, sessions_array, index), session.periods)
        )}
      </Collapse>
    </Panel>
  );

  renderProgram = (program) => (
    <div>

      <h1>{program.program.name}</h1>


      <Collapse>
        {program.sessions.map((session, index) =>
          this.renderSession(session, index, program.creation_date, program.sessions)
        )}
      </Collapse>
    </div>
  );

  render() {
    const { program, editable } = this.props;

    return <div>{program ? this.renderProgram(program) : <Spinner />}</div>;
  }
}

export default DisplayProgram;
