import React from "react";
import {
  Card,
  Button,
  Steps,
  Modal,
  Result,
  Col,
  Row,
  Avatar,
  Tabs,
  Icon,
  Timeline,
  Layout,
  Alert,
  Collapse
} from "antd";
import { Icon as FaIcon } from "react-fa";
import moment from "moment";
import "./Repetition.css";
import windowSize from "react-window-size";
import ReactPlayer from "react-player";
import { Player } from "video-react";

import RepetitionDone from "./RepetitionDone";
import * as apiServices from "../../apiServices";
import * as programScripts from "../../utils/programScripts";
import * as dateScripts from "../../utils/dateScripts";
import Spinner from "../Global/Spinner";
import CustomerFocusSession from "../CustomerFocusSession/CustomerFocusSession";
import Timer from "./Timer";
import CustomerProgress from "../CoachProgram/CustomerProgress";
import { ResponsiveLine } from "@nivo/line";

const { Meta } = Card;
const { TabPane } = Tabs;
const { Step } = Steps;

const CUSTOMER_PROGRAM = "5da1fff308104816e1bae7b7";

class Repetition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      program: null,
      startCardShow: 1,
      currentStep: 0,
      focusSession: null,
      currentSession: null,
      sessionIndex: null,
      currentPeriod: null,
      currentRepetition: null,
      currentPeriodInfo: null,
      modalVisible: false,
      btnEasyLoading: false,
      btnProperLoading: false,
      btnDiffiLoading: false,
      results: [],
      exercises: []
    };
    // this.startOnClick = this.startOnClick.bind(this);
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
        "populate=program,customer,focus_sessions,exercises.exercise,focus_sessions.exercises"
      );
      console.log("Program", program);
      let currentSession = null;
      let currentPeriod = null;
      let currentRepetition = null;
      let previousStatus = "Completed";
      let currentPeriodInfo = null;
      let sessionIndex = null;
      let focusSession = null;
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
          focusSession = programScripts.focusSessionDisplayButton(
            sessionStatus.status,
            previousStatus,
            index,
            program.focus_sessions
          );
        }
      });
      let startCardShow = 1;
      const { search } = this.props.location;
      if (search && search.split("=")[1] === "true") {
        startCardShow = -1;
      }
      this.setState({
        program,
        currentSession,
        focusSession,
        currentPeriod,
        currentPeriodInfo,
        sessionIndex,
        currentRepetition,
        exercises: currentSession.exercises,
        startCardShow
      });
    } catch (e) {
      console.log(e);
    }
  };

  startOnClick = () => {
    this.setState({ startCardShow: -1 });
  };

  evaluationOnClick = () => {
    this.setState({ startCardShow: 2 });
  };

  nextStep = () => {
    const current = this.state.currentStep + 1;
    this.setState({
      currentStep: current,
      btnEasyLoading: false,
      btnProperLoading: false,
      btnDiffiLoading: false
    });
    this.setState({ btnEasyLoading: false });
  };

  showResultModal = () => {
    this.setState({ modalVisible: true });
  };

  handleBtn = () => {
    setTimeout(() => {
      this.setState({ modalVisible: false });
      Modal.destroyAll();
      this.nextStep();
    }, 500);
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
    return `${day}-${monthNames[monthIndex]}`;
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

  timeOrReps = n => {
    if (n != null) {
      var num = n.reps || n.time;
    }
    if (num != null) {
      return parseInt(num);
    } else return 0;
  };

  removeFocusSessionsNotDone = focusSessions => {
    for (var i = 0; i < focusSessions.length; i++) {
      if (focusSessions[i].results.length == 0) {
        focusSessions.splice(i, 1);
      }
    }
    return focusSessions;
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

  renderProgressChart = program => {
    if (program.focus_sessions.length > 2) {
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

  handleResultsBtn = (resultLoading, value) => {
    const { results, currentSession, currentStep } = this.state;
    const newResult = {};
    console.log(currentStep);
    results.push({
      ...newResult,
      exercise: currentSession.exercises[currentStep].exercise,
      performance: value
    });
    this.setState({ [resultLoading]: true, results });
    if (currentStep === currentSession.exercises.length - 1) {
      this.handleRepititionEnd();
      this.setState({ startCardShow: 0 });
    } else {
      this.handleBtn();
    }
  };

  handleRepititionEnd = async () => {
    try {
      const { results, program, currentSession, currentPeriod } = this.state;
      console.log("results: ", results);
      program.sessions[program.sessions.indexOf(currentSession)].periods[
        currentPeriod - 1
      ].repetitions.push({ results, date: new Date() });
      console.log(program);
      await apiServices.patchOne("customerPrograms", CUSTOMER_PROGRAM, {
        sessions: program.sessions
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleCompleteTimer = () => {
    this.showResultModal();
  };

  renderStartCard = () => {
    const {
      program,
      currentSession,
      sessionIndex,
      focusSession,
      currentPeriod,
      currentRepetition,
      currentPeriodInfo,
      exercises
    } = this.state;
    const { windowWidth } = this.props;
    console.log(focusSession);
    console.log("focusSession", focusSession);
    return (
      <div>
        <Row className="top-row">
          {program ? (
            <Col span={24}>
              <div className="repetitionWrapper">
                <img
                  alt="run"
                  height={windowWidth < 576 ? "150px" : "200px"}
                  width="100%"
                  src="https://www.heart.org/-/media/images/healthy-living/fitness/strengthexercise.jpg"
                />
                <h1
                  className={
                    windowWidth < 576 ? "bottomLeftMobile" : "bottomLeft"
                  }
                >
                  {currentSession.name}
                </h1>

                <Tabs defaultActiveKey="1">
                  <TabPane tab="DETAILS" key="1">
                    <Row>
                      <Col span={12} align="center">
                        <Col span={2} align="left" offset={2}>
                          <FaIcon
                            style={{ fontSize: "24px", color: "#43978d" }}
                            name="clock-o"
                          />
                        </Col>
                        <Col span={14}>
                          <h4>
                            {dateScripts.getRemainingDays(currentPeriodInfo)}{" "}
                            days left
                          </h4>
                        </Col>
                      </Col>
                      <Col span={12} align="center">
                        <Col span={2} align="left" offset={2}>
                          <FaIcon
                            style={{ fontSize: "24px", color: "#43978d" }}
                            name="signal"
                          />
                        </Col>
                        <Col span={10} offset={2}>
                          <h4>Beginner</h4>
                        </Col>
                      </Col>
                    </Row>
                    <Row className="container mtRepetition">
                      <h4>Description</h4>
                      <p>{currentSession.description}</p>
                    </Row>
                    <Row className="container mtRepetition">
                      <h4>Goal</h4>
                      <p>Loss weight</p>
                    </Row>
                    <Row className="container mtRepetition">
                      <h4>Equipment</h4>
                      <p>Dumbbell, Cardio, Pulley</p>
                    </Row>{" "}
                    <Row className="container mbRepetition">
                      <Button
                        block
                        className="btn-start"
                        onClick={() => this.startOnClick()}
                        style={{
                          display: focusSession.showButton ? "none" : "block"
                        }}
                      >
                        START REPETITION {currentRepetition} /{" "}
                        {currentPeriodInfo.nb_repetitions}
                      </Button>
                    </Row>
                    <Row className="container mbRepetition">
                      <Button
                        block
                        className="btn-start"
                        onClick={() => this.evaluationOnClick()}
                        style={{
                          display: focusSession.showButton ? "block" : "none"
                        }}
                      >
                        START EVALUATION
                      </Button>
                    </Row>
                  </TabPane>
                  <TabPane tab="PERFORMANCE" key="2">
                    <Row className="container">
                      <h4>Current Status</h4>
                      <Col span={8} align="center">
                        Session {sessionIndex}
                      </Col>
                      <Col span={8} align="center">
                        Period {currentPeriod}
                      </Col>
                      <Col span={8} align="center">
                        Repetition {currentRepetition}
                      </Col>
                    </Row>
                    <Row className="container mbRepetition">
                      <Button
                        block
                        className="btn-start"
                        onClick={() => this.startOnClick()}
                        style={{
                          display: focusSession.showButton ? "none" : "block"
                        }}
                      >
                        START REPETITION {currentRepetition} /{" "}
                        {currentPeriodInfo.nb_repetitions}
                      </Button>
                    </Row>
                    <Row className="container mbRepetition">
                      <Button
                        block
                        className="btn-start"
                        onClick={() => this.evaluationOnClick()}
                        style={{
                          display: focusSession.showButton ? "block" : "none"
                        }}
                      >
                        START EVALUATION
                      </Button>
                    </Row>
                    {!(
                      program.focus_sessions == null ||
                      program.focus_sessions.length === 0 ||
                      program.focus_sessions[0].results == null ||
                      this.removeFocusSessionsNotDone(program.focus_sessions)
                        .length < 1
                    ) ? (
                      <Row>{this.renderProgressChart(program)}</Row>
                    ) : null}
                  </TabPane>
                </Tabs>
              </div>
              {focusSession.showReminderBanner &&
              focusSession.nextFocusSession ? (
                <div className="infoBanner marginTopRepetition">
                  <Alert
                    message={`Your next evaluation is to be completed before the : ${moment(
                      focusSession.nextFocusSession.due_date
                    ).format("DD-MM-YYYY")}`}
                  />
                </div>
              ) : null}
              <div
                className="exerciseList marginTopRepetition"
                id="exerciseList"
              >
                {exercises.map(exercise => (
                  <Card bordered={false}>
                    <Meta
                      avatar={<Avatar size={55} src={exercise.exercise.img} />}
                      title={
                        <h4 style={{ fontSize: "15px", marginTop: "5px" }}>
                          {exercise.exercise.name}{" "}
                        </h4>
                      }
                      description={
                        <p style={{ marginTop: "-10px" }}>
                          {exercise.exercise.timed
                            ? dateScripts.getTimeMMSSFormat(exercise.time)
                            : `${exercise.sets} X ${exercise.reps}`}{" "}
                        </p>
                      }
                    />
                  </Card>
                ))}
              </div>
            </Col>
          ) : (
            <Spinner />
          )}
        </Row>
      </div>
    );
  };

  renderStepDiv = () => {
    const {
      modalVisible,
      btnEasyLoading,
      btnProperLoading,
      btnDiffiLoading,
      currentStep,
      exercises
    } = this.state;
    return (
      <div className="wrapper" id="stepDiv">
        <Modal
          className="feedback-modal"
          title="How was this exercise?"
          visible={modalVisible}
          closable={false}
          maskClosable={false}
          footer={null}
        >
          <Row className="modal-content">
            <Col span={8} align="center">
              <Button
                onClick={() => this.handleResultsBtn("btnEasyLoading", 1)}
                className="feedbackBtn"
                loading={btnEasyLoading}
              >
                <Icon
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#81E5D9"
                />
                Easy
              </Button>
            </Col>
            <Col span={8} align="center">
              <Button
                onClick={() => this.handleResultsBtn("btnProperLoading", 0)}
                className="feedbackBtn"
                loading={btnProperLoading}
              >
                <Icon type="heart" theme="twoTone" twoToneColor="#F199CB" />{" "}
                Proper
              </Button>
            </Col>
            <Col span={8} align="center">
              <Button
                onClick={() => this.handleResultsBtn("btnDiffiLoading", -1)}
                className="feedbackBtn"
                loading={btnDiffiLoading}
              >
                <Icon type="rocket" theme="twoTone" twoToneColor="#8E2E37" />
                Hard
              </Button>
            </Col>
          </Row>
        </Modal>
        <Steps current={currentStep}>
          {exercises.map((exercise, i) => (
            <Step key={exercise.exercise._id} title={""} />
          ))}
        </Steps>
        <Row className="top-row" style={{ marginTop: "-4%" }}>
          <Col span={24}>
            <div>
              <Col span={24}>
                <img
                  className="step-img"
                  alt="Loading"
                  src={exercises[currentStep].exercise.img}
                />
                <br />
                <br />
                <Row style={{ marginBottom: "20px" }}>
                  <Col span={24} align="middle">
                    <h1 style={{ fontSize: "22px" }}>
                      {exercises[currentStep].exercise.name +
                        (exercises[currentStep].exercise.timed
                          ? ` for ${dateScripts.getTimeMMSSFormat(
                              exercises[currentStep].time
                            )}`
                          : "")}
                    </h1>
                  </Col>
                </Row>
                {exercises[currentStep].exercise.timed ? (
                  <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Timer
                      time={exercises[currentStep].time}
                      onComplete={this.handleCompleteTimer}
                    />
                  </Row>
                ) : (
                  <Row style={{ marginBottom: "20px" }}>
                    <Col span={9} align="right">
                      <p>{exercises[currentStep].reps} Reps</p>
                    </Col>
                    <Col span={6} align="middle">
                      <h1>X</h1>
                    </Col>
                    <Col span={9} align="left">
                      <p>{exercises[currentStep].sets} Sets</p>
                    </Col>
                  </Row>
                )}
                <Row>
                  {exercises[currentStep].exercise.steps ? (
                    <Collapse defaultActiveKey={["1"]}>
                      <Collapse.Panel
                        header={
                          <Row>
                            <Col span={22} align="center">
                              <span className="sectionTitle">HOW TO</span>
                            </Col>
                          </Row>
                        }
                      >
                        <Player src={exercises[currentStep].exercise.vid} />
                        <Timeline style={{ marginTop: "20px" }}>
                          {exercises[currentStep].exercise.steps.map(step => (
                            <Timeline.Item key={step}>{step}</Timeline.Item>
                          ))}
                        </Timeline>
                      </Collapse.Panel>
                    </Collapse>
                  ) : (
                    <Col>
                      <Collapse bordered={false} defaultActiveKey={["1"]}>
                        <Collapse.Panel header="Description">
                          <p>{exercises[currentStep].exercise.description}</p>
                        </Collapse.Panel>
                      </Collapse>
                    </Col>
                  )}
                </Row>
              </Col>
              {!exercises[currentStep].exercise.timed && (
                <div className="steps-action">
                  {currentStep < exercises.length - 1 && (
                    <Button
                      type="primary"
                      onClick={() => this.showResultModal()}
                    >
                      Done, Next!
                    </Button>
                  )}
                  {currentStep === exercises.length - 1 && (
                    <Button
                      type="primary"
                      // onClick={() => message.success("Processing complete!")}
                      onClick={() => this.showResultModal()}
                    >
                      Done
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  render = () => {
    const { startCardShow, focusSession, program } = this.state;
    // const modalWidth = "300px";

    if (startCardShow === 1) {
      return this.renderStartCard();
    }
    // start focus session (evaluation)
    if (startCardShow === 2) {
      return (
        <CustomerFocusSession
          focusSession={focusSession.nextFocusSession}
          customerProgram={program}
        />
      );
    }
    if (startCardShow === -1) {
      // else ： hide startCard
      return this.renderStepDiv();
    }
    if (startCardShow === 0) {
      return <RepetitionDone />;
    }
    return null;
  };
}

export default windowSize(Repetition);
