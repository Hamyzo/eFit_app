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
  Collapse
} from "antd";
import { Icon as FaIcon } from "react-fa";
import "./Repetition.css";
import windowSize from "react-window-size";

import RepetitionDone from "./RepetitionDone";
import * as apiServices from "../../apiServices";
import * as programScripts from "../../utils/programScripts";
import * as dateScripts from "../../utils/dateScripts";
import Spinner from "../Global/Spinner";
import CustomerFocusSession from "../CustomerFocusSession/CustomerFocusSession";

const { Meta } = Card;
const { TabPane } = Tabs;
const { Step } = Steps;

const CUSTOMER_PROGRAM = "5da1f67ccf53670572677651";

class Repetition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      program: null,
      startCardShow: 1,
      currentStep: 0,
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
      let startCardShow = 1;
      const { search } = this.props.location;
      if (search && search.split("=")[1] === "true") {
        startCardShow = -1;
      }
      this.setState({
        program,
        currentSession,
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

  handleResultsBtn = (resultLoading, value) => {
    const { results, currentSession, currentStep } = this.state;
    const newResult = {};
    console.log(currentStep);
    if (!currentSession.exercises[currentStep].reps) {
      newResult.time = 111;
    }
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

  renderStartCard = () => {
    const {
      program,
      currentSession,
      sessionIndex,
      currentPeriod,
      currentRepetition,
      currentPeriodInfo,
      exercises
    } = this.state;
    const { windowWidth } = this.props;
    console.log(currentSession);
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
                  className={windowWidth < 576 ? "centeredMobile" : "centered"}
                >
                  {dateScripts.getRemainingDays(currentPeriodInfo)} days left
                </h1>
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
                      >
                        START REPETITION {currentRepetition} /{" "}
                        {currentPeriodInfo.nb_repetitions}
                      </Button>
                    </Row>
                  </TabPane>
                </Tabs>
              </div>
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
                          {exercise.sets + " X " + exercise.reps}{" "}
                        </p>
                      }
                    />
                  </Card>
                ))}
              </div>

              {/*}  <Card
                className="wrapper"
                id="card"
                style={{}}
                cover={<img alt="run" src="/assets/images/run.jpg" />}
              >
                <Meta
                  title={currentSession.name}
                  description={currentSession.description}
                  style={{ marginTop: "2%" }}
                />
                <Button
                  block
                  className="btn-start"
                  onClick={() => this.startOnClick()}
                >
                  START REPETITION {currentPeriod}
                </Button>
              </Card> */}
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
          title={"How was this exercise?"}
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
            <Step
              key={exercise.exercise._id}
              title={i === currentStep ? exercise.exercise.name : ""}
            />
          ))}
        </Steps>
        <Row className="top-row" style={{ marginTop: "-4%" }}>
          <Col>
            <div>
              <div className="steps-content">
                <img
                  className="step-img"
                  alt="Loading"
                  src={exercises[currentStep].exercise.img}
                />
                <br />
                <br />
                <Row style={{ marginBottom: "20px" }}>
                  <Col span={12} align="left">
                    <h1>{exercises[currentStep].exercise.name}</h1>
                  </Col>
                  <Col span={12} align="right">
                    <h1>
                      {exercises[currentStep].reps} X{" "}
                      {exercises[currentStep].sets}
                    </h1>
                  </Col>
                </Row>
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
                        <Timeline>
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
              </div>
              <div className="steps-action">
                {currentStep < exercises.length - 1 && (
                  <Button type="primary" onClick={() => this.showResultModal()}>
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
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  render = () => {
    const { startCardShow } = this.state;
    // const modalWidth = "300px";

    if (startCardShow === 1) {
      return this.renderStartCard();
    }
    // start focus session (evaluation)
    if (startCardShow === 2) {
      return <CustomerFocusSession />;
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
