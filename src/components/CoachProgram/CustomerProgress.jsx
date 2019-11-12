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
    dataIndex: "exercise.name"
  },
  {
    title: "Sets",
    dataIndex: "sets"
  },
  {
    title: "% Progress",
    dataIndex: "reps"
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
        <Row>
          <Col span={8}>{exercise.name}</Col>
          <Col span={8}>{result.reps || result.time} / {previous_res.reps || previous_res.time}</Col>
          <Col>{this.percentageDifference(this.timeOrReps(result), this.timeOrReps(previous_res)).toFixed(1)}</Col>
        </Row>
      )
    }

    resultsFirstFocusSessionRow = (result, exercise) => {
      return(
        <Row>
          <Col span={8}>{exercise.name}</Col>
          <Col span={8}>{result.reps || result.time}</Col>
          <Col> -- </Col>
        </Row>
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
        <h1 className="progressTitle"> Progress </h1>
      <div className="progressColumn">
        <Row>
          <Col span={10} offset={1}>
            <div className="dicksonDiv">
              <img
                alt=""
                className="heartAndDickson"
                src="/assets/images/muscle (2).svg"
              />
              <h3>Dickson Index</h3>
              {program ? (
                <div>
                  <Row>{this.lastMeasure(program.focus_sessions, "dickson_index")}</Row>
                  <Row>{this.measureProgress(program.focus_sessions, "dickson_index")}%</Row>
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
              <h3>Resting Heart Rate</h3>
                {program ? (
                  <div>
                    <Row>{this.lastMeasure(program.focus_sessions, "rest_heart_rate")}</Row>
                    <Row>{this.measureProgress(program.focus_sessions, "rest_heart_rate")}%</Row>
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
              <h3>Last Session Results</h3>
              <Row>
                <Col span={8}><strong>Exercise</strong></Col>
                <Col span={8}><strong>Time/Reps</strong></Col>
                <Col></Col>
              </Row>
              {this.resultsTable(program.focus_sessions)}
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
