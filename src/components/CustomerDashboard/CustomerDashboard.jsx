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

const CUSTOMER_PROGRAM = "5da1f67ccf53670572677651";

class CustomerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      program: null,
      currentSession: null,
      currentFocusSession: null,
      sessionIndex: null,
      currentPeriod: null,
      previousPeriod: null,
      currentRepetition: null,
      currentPeriodInfo: null,
      watering: false,
      waterProgress: 20
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
        CUSTOMER_PROGRAM,
        "populate=program,customer,focus_sessions"
      );
      let currentSession = null;
      let currentPeriod = null;
      let previousPeriod = null;
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
          previousPeriod = sessionStatus.previousPeriod;
          currentPeriodInfo = sessionStatus.currentPeriodInfo;
          currentRepetition = sessionStatus.latestRepetition;
          previousStatus = sessionStatus.status;
        }
      });

      const currentFocusSession = programScripts.focusSessionStatus(
        program.focus_sessions
      );
      this.setState({
        program,
        currentSession,
        currentFocusSession,
        currentPeriod,
        previousPeriod,
        currentPeriodInfo,
        sessionIndex,
        currentRepetition
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleWaterPlant = () => {
    const { program, waterProgress } = this.state;
    this.setState({
      watering: true,
      waterProgress: waterProgress + 10,
      program: {
        ...program,
        customer: { ...program.customer, water: program.customer.water - 1 }
      }
    });
    setTimeout(() => this.setState({ watering: false }), 5000);
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
      previousPeriod,
      sessionIndex,
      currentFocusSession,
      currentPeriodInfo,
      watering,
      waterProgress
    } = this.state;

    console.log(program);

    return (
      <div>
        {program ? (
          <div>
            <div style={{ marginTop: "20px" }}>
              <div className="clouds">
                <div className="cloud x1" />
                <div className="cloud x2" />
                <div className="cloud x3" />
                <div className="cloud x4" />
                <div className="cloud x5" />
              </div>

              <div className="background">
                <img
                  src="/assets/images/gamification/background.jpg"
                  width="100%"
                  height="270"
                />
              </div>

              <div className="tree">
                <img
                  src={`/assets/images/gamification/tree_${program.customer.level}.PNG`}
                  width="200"
                  height="200"
                  style={{ position: "center" }}
                />
              </div>
              <div className="sun-plant">
                <img
                  src="/assets/images/gamification/sun.jpg"
                  width="100"
                  height="100"
                />
              </div>
              {watering ? (
                <div className="water-plant">
                  <img
                    src="/assets/images/gamification/water.PNG"
                    width="120"
                    height="120"
                  />
                </div>
              ) : null}
            </div>
            <Row>
              <Col span={10} className="plant_progress_container">
                <div className="plant_progress">
                  <h1> My plant </h1>
                  <div className="progress_bars">
                    <Progress
                      percent={waterProgress}
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
                      backgroundColor: "#FFFFFF",
                      verticalAlign: "middle"
                    }}
                    size="large"
                    className="oneAvatar"
                  >
                    <img className="water" src="/assets/images/raindrop.svg" />
                  </Avatar>
                </Col>
                <Col span={6}>
                  <h2
                    style={{
                      marginTop: "30%",
                      marginLeft: "-35%",
                      fontSize: "120%"
                    }}
                  >
                    {program.customer.water} Points
                  </h2>
                </Col>
                <Col span={10}>
                  <Button
                    style={{
                      marginTop: "15%"
                    }}
                    onClick={this.handleWaterPlant}
                  >
                    Water My Plant
                  </Button>
                </Col>
              </Row>
            </div>
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
                    {dateScripts.getNbDaysSinceLastResult(
                      currentPeriodInfo,
                      currentSession.periods[previousPeriod]
                    )}
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
