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
  Tabs
} from "antd";
import { Icon } from "react-fa";
import "./Repetition.css";

import RepetitionDone from "./RepetitionDone";
import * as apiServices from "../../apiServices";
import * as programScripts from "../../utils/programScripts";
import Spinner from "../Global/Spinner";

const { Meta } = Card;
const { TabPane } = Tabs;
const { Step } = Steps;

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
        "5dbedf3ebc5fad3463b3e019",
        "populate=program,customer,focus_sessions"
      );
      console.log("Program", program);
      let currentSession = null;
      let currentPeriod = null;
      let currentPeriodInfo = null;
      let sessionIndex = null;
      program.sessions.forEach((session, index) => {
        const sessionStatus = programScripts.sessionStatus(session.periods);
        if (sessionStatus.status === "In progress") {
          currentSession = session;
          sessionIndex = index + 1;
          currentPeriod = sessionStatus.currentPeriod;
          currentPeriodInfo = sessionStatus.currentPeriodInfo;
        }
      });
      this.setState({
        program,
        currentSession,
        currentPeriod,
        currentPeriodInfo,
        sessionIndex,
        exercises: currentSession.exercises
      });
    } catch (e) {
      console.log(e);
    }
  };

  startOnClick = () => {
    this.setState({ startCardShow: -1 });
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
    const { results, currentPeriod, currentSession, currentStep } = this.state;
    let newResult = {};
    console.log(currentStep);
    if (!currentSession.exercises[currentStep].reps) {
      newResult.time = 111;
    }
    results.push({
      ...newResult,
      exercise: currentSession.exercises[currentStep],
      peformance: value
    });
    this.setState({ [resultLoading]: true, results });
    this.handleBtn();
  };

  prevStep = () => {
    const current = this.state.currentStep - 1;
    this.setState({ currentStep: current });
  };

  handleDoneBtn = () => {
    console.log(this.state.results);
    this.setState({ startCardShow: 0 });
  };

  renderStartCard = () => {
    const {
      program,
      currentSession,
      sessionIndex,
      currentPeriod,
      currentPeriodInfo,
      exercises
    } = this.state;
    console.log(currentSession);
    return (
      <div>
        <Row className="top-row">
          {program ? (
            <Col span={24}>
              <div className="repetitionWrapper">
                <img
                  alt="run"
                  height="150px"
                  width="100%"
                  src="https://www.heart.org/-/media/images/healthy-living/fitness/strengthexercise.jpg"
                />
                <h1 className="centered">{currentPeriodInfo.nb_days} days</h1>
                <h1 className="bottom-left">{currentSession.name}</h1>

                <Tabs defaultActiveKey="1">
                  <TabPane tab="DETAILS" key="1">
                    <Row>
                      <Col span={12} align="center">
                        <Col span={2} align="left" offset={2}>
                          <Icon
                            style={{ fontSize: "24px", color: "#43978d" }}
                            name="clock-o"
                          />
                        </Col>
                        <Col span={10}>
                          <h4>{currentPeriodInfo.nb_days} days</h4>
                        </Col>
                      </Col>
                      <Col span={12} align="center">
                        <Col span={2} align="left" offset={2}>
                          <Icon
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
                        START REPETITION {currentPeriod}
                      </Button>
                    </Row>
                  </TabPane>
                  <TabPane tab="STATISTICS" key="2">
                    <Row className="container mbRepetition">
                      <h4>Current Status</h4>
                      <Col span={8} align="center">
                        Session {sessionIndex}
                      </Col>
                      <Col span={8} align="center">
                        Period {currentPeriod}
                      </Col>
                      <Col span={8} align="center">
                        {programScripts.completedReps(
                          currentPeriodInfo.results
                        )}
                      </Col>
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
          <div className="modal-content">
            <Row>
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
          </div>
        </Modal>
        <Steps current={currentStep}>
          {exercises.map(exercise => (
            <Step key={exercise.exercise._id} title={exercise.exercise.name} />
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
                <h1>{exercises[currentStep].exercise.name}</h1>
                <hr />
                <p>{exercises[currentStep].exercise.description}</p>
              </div>
              <div className="steps-action">
                {currentStep > 0 && (
                  <Button
                    style={{ marginLeft: 8 }}
                    onClick={() => this.prevStep()}
                  >
                    Previous
                  </Button>
                )}
                {currentStep < exercises.length - 1 && (
                  <Button type="primary" onClick={() => this.showResultModal()}>
                    Done, Next!
                  </Button>
                )}
                {currentStep === exercises.length - 1 && (
                  <Button
                    type="primary"
                    // onClick={() => message.success("Processing complete!")}
                    onClick={() => this.handleDoneBtn()}
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
    if (startCardShow === -1) {
      // else ： hide startCard
      return this.renderStepDiv();
      // return this.renderRepetitionExerciseList();
    }
    if (startCardShow === 0) {
      return <RepetitionDone />;
    }
    return null;
  };
}

export default Repetition;
