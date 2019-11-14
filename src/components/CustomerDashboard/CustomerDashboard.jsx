import React from "react";
import {
  Row,
  Col,
  Progress,
  Timeline,
  Button,
  Card,
  Icon,
  Menu,
  Avatar
} from "antd";
import "./CustomerDashboard.css";
import * as apiServices from "../../apiServices";
import * as programScripts from "../../utils/programScripts";
import Spinner from "../Global/Spinner";
import { NavLink } from "react-router-dom";
import * as dateScripts from "../../utils/dateScripts";

class CustomerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      program: null,
      currentSession: null,
      currentFocusSession: null,
      sessionIndex: null,
      currentPeriod: null,
      currentRepetition: null,
      currentPeriodInfo: null
    };
  }

  componentDidMount = async () => {
    this.getProgram();
  };

  getProgram = async () => {
    try {
      const { match } = this.props;
      const program = await apiServices.getOne(
        "customerPrograms",
        "5da1f67ccf53670572677651",
        "populate=program,customer,focus_sessions"
      );
      console.log("Program", program);
      let currentSession = null;
      let currentPeriod = null;
      let currentRepetition = null;
      let previousStatus = "Completed";
      let currentPeriodInfo = null;
      let sessionIndex = null;
      program.sessions.forEach((session, index) => {
        const sessionStatus = programScripts.sessionStatus(session.periods);
        if (
          sessionStatus.status === "In progress" ||
          (sessionStatus.status === "Not Started" &&
            previousStatus === "Completed")
        ) {
          currentSession = session;
          sessionIndex = index + 1;
          currentPeriod = sessionStatus.latestPeriod;
          currentPeriodInfo = sessionStatus.currentPeriodInfo;
          currentRepetition = sessionStatus.latestRepetition;
          previousStatus = sessionStatus.status;
        }
      });

      const currentFocusSession = programScripts.focusSessionStatus(
        program.focus_sessions
      );
      console.log(currentFocusSession);
      this.setState({
        program,
        currentSession,
        currentFocusSession,
        currentPeriod,
        currentPeriodInfo,
        sessionIndex,
        currentRepetition
      });
    } catch (e) {
      console.log(e);
    }
  };

  renderWaterIcon = () => (
    <Row>
      <Col span={4} style={{ height: "18px", width: "18px" }}>
        <img className="water_progress" src="/assets/images/raindrop.svg" />
      </Col>
      <Col span={4}>
        <p className="progress_tags">Water</p>
      </Col>
    </Row>
  );

  renderSunIcon = () => (
    <Row>
      <Col span={4} style={{ height: "18px", width: "18px" }}>
        <img className="water_progress" src="/assets/images/contrast.svg" />
      </Col>
      <Col span={4}>
        <p className="progress_tags">Sunlight</p>
      </Col>
    </Row>
  );

  renderLevelIcon = () => (
    <Row>
      <Col span={4} style={{ height: "18px", width: "18px" }}>
        <img className="water_progress" src="/assets/images/objective.svg" />
      </Col>
      <Col span={4}>
        <p className="progress_tags">Level</p>
      </Col>
    </Row>
  );

  render() {
    const {
      program,
      currentSession,
      sessionIndex,
      currentFocusSession,
      currentPeriodInfo
    } = this.state;
    return (
      <div>
        {program ? (
          <div>
            <Row>
              <Col span={10}>
                <div className="plant">
                  <img
                    className="img-responsive"
                    typeof="foaf:Image"
                    src="https://making-the-web.com/sites/default/files/clipart/131252/cartoon-plant-131252-4910920.jpg"
                    width="50%"
                    height="50%"
                    alt="Cartoon Plant 6 - 540 X 554"
                    title="Cartoon Plant 6 - 540 X 554"
                  />
                </div>
              </Col>
              <Col span={10}>
                <div className="plant_progress">
                  <h1> My plant </h1>
                  <div className="progress_bars">
                    <Progress
                      percent={30}
                      strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068"
                      }}
                      format={this.renderWaterIcon}
                      size="small"
                      status="active"
                    />
                    <Progress
                      percent={50}
                      strokeColor={{
                        "0%": "#cf3e3c",
                        "100%": "#ffff29"
                      }}
                      format={this.renderSunIcon}
                      size="small"
                      status="active"
                    />
                    <Progress
                      percent={70}
                      strokeColor={{
                        "0%": "#994dd6",
                        "100%": "#4f7bdb"
                      }}
                      format={this.renderLevelIcon}
                      size="small"
                      status="active"
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <div className="progress">
              <Row>
                <Col span={8}>
                  <Avatar
                    style={{
                      backgroundColor: "#56B48C",
                      verticalAlign: "middle"
                    }}
                    size="large"
                    className="oneAvatar"
                  >
                    {dateScripts.getNbDaysSinceLastResult(currentPeriodInfo)}
                  </Avatar>
                </Col>
                <Col span={10}>
                  <h3 className="daysSLW" style={{ fontSize: "105%" }}>
                    Days since last workout
                  </h3>
                  <p className="daysSLWmessage" style={{ fontSize: "90%" }}>
                    No more than 3 days!
                  </p>
                </Col>
                <Col span={6}>
                  <Row className="plantwater">
                    <Col span={8}>
                      <img className="add" src="/assets/images/add.svg" />
                    </Col>
                    <Col span={8}>
                      <h4>3</h4>
                    </Col>
                    <Col span={8}>
                      <img
                        className="water"
                        src="/assets/images/raindrop.svg"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className="progress2">
              <Row>
                <Col span={8}>
                  <img className="one" src="/assets/images/pulse.svg" />
                </Col>
                <Col span={10}>
                  <h3 className="daysSLW" style={{ fontSize: "105%" }}>
                    Cardio Fitness
                  </h3>
                  <p className="daysSLWmessage" style={{ fontSize: "90%" }}>
                    {" "}
                    Your current score:{" "}
                    {currentFocusSession
                      ? currentFocusSession.rest_heart_rate
                      : "-"}
                  </p>
                </Col>
                <Col span={6}>
                  <Row className="plantwater">
                    <Col span={8}>
                      <img className="add" src="/assets/images/add.svg" />
                    </Col>
                    <Col span={8}>
                      <h4>2</h4>
                    </Col>
                    <Col span={8}>
                      <img
                        className="water"
                        src="/assets/images/contrast.svg"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <br />
            <Card
              className="program"
              title={`Currently on: Session ${sessionIndex}`}
              extra={<NavLink to={"/myProgram"}>See Program</NavLink>}
            >
              <Timeline className="timeline">
                {currentSession.periods.map((period, pindex) => (
                  <Timeline.Item
                    color={programScripts.periodStatus(period).color}
                    dot={
                      <Icon
                        type={programScripts.periodStatus(period).iconType}
                        style={{ fontSize: "20px" }}
                      />
                    }
                  >
                    <Row>
                      <Col span={6}>
                        <h3 style={{ fontSize: "110%" }}>
                          Period {pindex + 1}
                        </h3>
                      </Col>
                      <Col span={6} offset={12}>
                        <p>
                          {programScripts.completedReps(period.repetitions)}/
                          {period.nb_repetitions} Reps Completed
                        </p>
                      </Col>
                    </Row>
                  </Timeline.Item>
                ))}
              </Timeline>
              <NavLink to="/myProgram?start=true">
                <Button block className="rep_button">
                  START NEXT REPETITION
                </Button>
              </NavLink>
            </Card>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default CustomerDashboard;
