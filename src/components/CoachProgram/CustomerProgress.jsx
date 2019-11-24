import React from "react";
import { Row, Col, Table, Tabs, Modal, Button, Icon, Statistic } from "antd";
import { ResponsiveLine } from "@nivo/line";
import "./CoachProgram.css";
import Spinner from "../Global/Spinner";

const columns = [
  {
    title: "Exercise",
    dataIndex: "exercise"
  },
  {
    title: "Reps/Time",
    dataIndex: "reps"
  },
  {
    title: "% Progress",
    dataIndex: "progress",
    render: text => {
      if (parseFloat(text) < 0.0) {
        return (
          <div>
            <img
              alt=""
              className="down-up"
              src="/assets/images/sort-down.svg"
            />
            {parseFloat(text)}%
          </div>
        );
      } else if (parseFloat(text) == 0.0 || text == "--") {
        return "";
      } else {
        return (
          <div>
            <img alt="" className="down-up" src="/assets/images/sort-up.svg" />
            {parseFloat(text)}%
          </div>
        );
      }
    }
  }
];

class CustomerProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

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
    return `${day}-${monthNames[monthIndex]}`;
  };
  showResultsModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  exerciseChartData = focusSessions => {
    var focusSessionsWithResults = this.removeFocusSessionsNotDone(
      focusSessions
    );
    var colors = [
      "hsl(186, 70%, 50%)",
      "hsl(187, 70%, 50%)",
      "hsl(31, 70%, 50%)",
      "hsl(187, 70%, 50%)",
      "hsl(98, 70%, 50%)",
      "hsl(187, 70%, 50%)",
      "hsl(98, 70%, 50%)"
    ];
    var data = [];
    for (var i = 0; i < focusSessionsWithResults[0].exercises.length; i++) {
      var exercise = focusSessionsWithResults[0].exercises[i];
      data.push({
        id: exercise.name,
        color: colors[i],
        data: this.exerciseData(i, focusSessionsWithResults)
      });
    }
    console.log("data ", data);
    return data;
  };

  exerciseData = (i, focusSessions) => {
    var data = [];
    for (var x = 0; x < focusSessions.length; x++) {
      data.push({
        x: this.formatDate(focusSessions[x].due_date),
        y: this.timeOrReps(focusSessions[x].results[i])
      });
    }
    return data;
  };

  lastMeasure = (focusSessions, measure) => {
    var i = focusSessions.length - 1;
    return focusSessions[i][measure];
  };

  measureProgress = (focusSessions, measure) => {
    if (
      focusSessions.length == 0 ||
      focusSessions.length == 1 ||
      focusSessions == null
    ) {
      return "--";
    } else {
      return this.progressCalculator(focusSessions, measure);
    }
  };

  removeFocusSessionsNotDone = focusSessions => {
    for (var i = 0; i < focusSessions.length; i++) {
      if (focusSessions[i].results.length == 0) {
        focusSessions.splice(i, 1);
      }
    }
    return focusSessions;
  };

  percentageDifference = (n1, n2) => {
    return ((n1 - n2) / ((n1 + n2) / 2)) * 100;
  };

  progressArrow = progress => {
    if (parseFloat(progress) < 0.0) {
      return (
        <div>
          (<img alt="" className="down-up" src="/assets/images/sort-down.svg" />
          {parseFloat(progress)}%)
        </div>
      );
    } else if (parseFloat(progress) == 0.0 || progress == "--") {
      return "--";
    } else {
      return (
        <div>
          (<img alt="" className="down-up" src="/assets/images/sort-up.svg" />
          {parseFloat(progress)}%)
        </div>
      );
    }
  };

  progressCalculator = (focusSessions, measure) => {
    var focusSessionsWithResults = this.removeFocusSessionsNotDone(
      focusSessions
    );
    var x = focusSessionsWithResults.length - 2;
    var y = focusSessionsWithResults.length - 1;
    var changePercentage = this.percentageDifference(
      parseFloat(focusSessionsWithResults[y][measure]),
      parseFloat(focusSessionsWithResults[x][measure])
    );

    return changePercentage.toFixed(1);
  };

  resultsRow = (result, previous_res, exercise, i) => {
    return {
      key: i,
      exercise: exercise.name,
      reps: result.reps || result.time,
      progress: this.percentageDifference(
        this.timeOrReps(result),
        this.timeOrReps(previous_res)
      ).toFixed(1)
    };
  };

  resultsFirstFocusSessionRow = (result, exercise, i) => {
    return {
      key: i,
      exercise: exercise.name,
      reps: result.reps || result.time,
      progress: "--"
    };
  };

  timeOrReps = n => {
    if (n != null) {
      var num = n.reps || n.time;
    }
    if (num != null) {
      return parseInt(num);
    } else return 0;
  };

  resultsTable = focusSessions => {
    if (
      focusSessions == null ||
      (focusSessions.length == 1 && focusSessions[0].results == null)
    ) {
      return "No Results Available";
    } else if (focusSessions.length == 1 && focusSessions[0].results != null) {
      return focusSessions[0].results.map((result, i) =>
        this.resultsFirstFocusSessionRow(
          result,
          focusSessions[0].exercises[i],
          i
        )
      );
    }
    var focusSessionsWithResults = this.removeFocusSessionsNotDone(
      focusSessions
    );
    var y = focusSessionsWithResults.length - 1;
    var x = focusSessionsWithResults.length - 2;
    return focusSessionsWithResults[y].results.map((result, i) =>
      this.resultsRow(
        result,
        focusSessionsWithResults[x].results[i],
        focusSessionsWithResults[y].exercises[i],
        i
      )
    );
  };

  renderProgressChart = program => {
    if (program.focus_sessions.length > 0) {
      return (
        <div className="progressChart">
          <h1 className="focusSessionsTitle">Focus Sessions Progress</h1>
          <ResponsiveLine
            data={this.exerciseChartData(program.focus_sessions)}
            margin={{ top: 15, right: 110, bottom: 20, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              stacked: false,
              min: "auto",
              max: "auto"
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "focus session date",
              legendOffset: 36,
              legendPosition: "middle"
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "count",
              legendOffset: -40,
              legendPosition: "middle"
            }}
            colors={{ scheme: "nivo" }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />
        </div>
      );
    } else {
      return "";
    }
  };

  render() {
    const { program } = this.props;

    return (
      <div>
        {program ? this.renderProgressChart(program) : <Spinner />}
        <div className="progressColumn">
          <h3 className="lastFocusSessionsTitle">Last Focus Session Results</h3>
          <Row className="dickAndHeartRow">
            <Col className="dickCol" span={10} offset={1}>
              <div className="dicksonDiv">
                <Statistic
                  title="Dickson Index"
                  value={this.lastMeasure(
                    program.focus_sessions,
                    "dickson_index"
                  )}
                  prefix={
                    <img
                      alt=""
                      className="heartAndDickson"
                      src="/assets/images/muscle (2).svg"
                    />
                  }
                />
                <Row className="HeartRow">
                  {program ? (
                    <div>
                      {this.progressArrow(
                        this.measureProgress(
                          program.focus_sessions,
                          "dickson_index"
                        )
                      )}
                    </div>
                  ) : (
                    <div>...</div>
                  )}
                </Row>
              </div>
            </Col>
            <Col className="HeartCol" span={10} offset={1}>
              <div className="heartDiv">
                <Statistic
                  title="Resting Heart Rate"
                  value={this.lastMeasure(
                    program.focus_sessions,
                    "rest_heart_rate"
                  )}
                  prefix={
                    <img
                      alt=""
                      className="heartAndDickson"
                      src="/assets/images/heartbeat.svg"
                    />
                  }
                />
                <Row className="HeartRow">
                  {program ? (
                    <div>
                      {this.progressArrow(
                        this.measureProgress(
                          program.focus_sessions,
                          "rest_heart_rate"
                        )
                      )}
                    </div>
                  ) : (
                    <div>...</div>
                  )}
                </Row>
              </div>
            </Col>
          </Row>
          <Row>
            {program ? (
              <div>
                <Table
                  className="resultsTable"
                  pagination={false}
                  columns={columns}
                  dataSource={this.resultsTable(program.focus_sessions)}
                  size="small"
                  bordered={false}
                />
              </div>
            ) : (
              <Spinner />
            )}
          </Row>
        </div>

        <Modal
          title="Progress Chart"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        ></Modal>
      </div>
    );
  }
}

export default CustomerProgress;
