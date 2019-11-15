import React from "react";
import {
  Row,
  Col,
  Table
} from "antd";
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
    render: text => {if (parseFloat(text) < 0.0){
      return(
        <div>
          <img
            alt=""
            className="down-up"
            src="/assets/images/sort-down.svg"
          />
          {parseFloat(text)}%
        </div>)
    }
    else if (parseFloat(text) == 0.0 || text == "--"){
      return("")
    }
    else{
      return(
        <div>
        <img
          alt=""
          className="down-up"
          src="/assets/images/sort-up.svg"
        />
          {parseFloat(text)}%
        </div>
      )
    }}
  }
];


class CustomerProgress extends React.Component {
  constructor(props) {
    super(props);
  }

  lastMeasure = (focusSessions, measure) => {
    var i = focusSessions.length - 1;
    return focusSessions[i][measure];
  };


  measureProgress = (focusSessions, measure) => {
    if (focusSessions.length == 0 || focusSessions.length == 1 || focusSessions == null){
      return "--";
    }
    else {
      return this.progressCalculator(focusSessions, measure);
    }
  }

  removeFocusSessionsNotDone = focusSessions => {
    for(var i = 0; i < focusSessions.length; i++){
      if (focusSessions[i].results.length == 0){
        focusSessions.splice(i, 1);
      }
    }
    return focusSessions;
  }

  percentageDifference = (n1, n2) => {
    return ((n1 - n2)/((n1 + n2)/2)*100);
  }

  progressArrow = progress => {
    if (parseFloat(progress) < 0.0){
      return(
        <div>
          <img
            alt=""
            className="down-up"
            src="/assets/images/sort-down.svg"
          />
          {parseFloat(progress)}%
        </div>)
    }
    else if (parseFloat(progress) == 0.0 || progress == "--"){
    return(" ")
    }
    else{
      return(
        <div>
          <img
            alt=""
            className="down-up"
            src="/assets/images/sort-up.svg"
          />
          {parseFloat(progress)}%
        </div>
      )
    }
  }




  progressCalculator = (focusSessions, measure) => {
    var focusSessionsWithResults = this.removeFocusSessionsNotDone(focusSessions);
    var x = focusSessionsWithResults.length - 2;
    var y = focusSessionsWithResults.length - 1;
    var changePercentage = this.percentageDifference(parseFloat(focusSessionsWithResults[y][measure]), parseFloat(focusSessionsWithResults[x][measure]));
    if(focusSessions[0].results[0].reps == null){console.log("TRUE")};
    return (changePercentage.toFixed(1));

  }


    resultsRow = (result, previous_res, exercise, i) => {
      return(
        {
          key: i,
          exercise: exercise.name,
          reps: (result.reps || result.time),
          progress: this.percentageDifference(this.timeOrReps(result), this.timeOrReps(previous_res)).toFixed(1)
       }
      )
    }

    resultsFirstFocusSessionRow = (result, exercise, i) => {
      return(
        {
          key: i,
          exercise: exercise.name,
          reps: (result.reps || result.time),
          progress: "--"
        }

      )
    }


    timeOrReps = n => {
      var num = (n.reps || n.time);
      return parseInt(num);
    }


    resultsTable = focusSessions => {
    if(focusSessions == null || (focusSessions.length == 1 && focusSessions[0].results == null)){
      return("No Results Available")
    }
    else if (focusSessions.length == 1 && focusSessions[0].results != null){
      return(focusSessions[0].results.map((result, i) => this.resultsFirstFocusSessionRow(result, focusSessions[0].exercises[i], i)));
    }
      var focusSessionsWithResults = this.removeFocusSessionsNotDone(focusSessions);
      var y = focusSessionsWithResults.length - 1;
      var x = focusSessionsWithResults.length - 2;
      return (focusSessionsWithResults[y].results.map((result, i) =>
        this.resultsRow(result, focusSessionsWithResults[x].results[i], focusSessionsWithResults[y].exercises[i], i)));
    }




  render() {
    const { program } = this.props;
    //const {    } = this.state;

    return (
      <div>
      <div className="progressColumn">
        <h3 className="progressTitle">Last Focus Session Results</h3>

        <Row>
          <Col span={10} offset={1}>
            <div className="dicksonDiv">
              <img
                alt=""
                className="heartAndDickson"
                src="/assets/images/muscle (2).svg"
              />

              {program ? (
                <div>
                  <div className="circle">{this.lastMeasure(program.focus_sessions, "dickson_index")}</div>
                  <h3>Dickson Index</h3>
                  {this.progressArrow(this.measureProgress(program.focus_sessions, "dickson_index"))}
                </div>

              ) : (
                <div>...</div>
              )}

            </div>
          </Col>
          <Col span={10} offset={1}>
              <div className="heartDiv">
                <img
                  alt=""
                  className="heartAndDickson"
                src="/assets/images/heartbeat.svg"
              />

                {program ? (
                  <div>
                    <div className="circle">{this.lastMeasure(program.focus_sessions, "rest_heart_rate")}</div>
                    <h3>Resting Heart Rate</h3>
                    <Row>{this.progressArrow(this.measureProgress(program.focus_sessions, "rest_heart_rate"))}</Row>
                  </div>
                ) : (
                  <div>...</div>
                )}

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

      </div>

    );
  }
}

export default CustomerProgress;
