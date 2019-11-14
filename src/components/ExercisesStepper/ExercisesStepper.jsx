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
  Collapse
} from "antd";
import { Icon as FaIcon } from "react-fa";
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
        "5dbedf3ebc5fad3463b3e019",
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
        if (sessionStatus.status === "In progress") {
          currentSession = session;
          sessionIndex = index + 1;
          currentPeriod = sessionStatus.latestPeriod;
          currentPeriodInfo = sessionStatus.currentPeriodInfo;
          currentRepetition = sessionStatus.latestRepetition;
        } else if (
          sessionStatus.status === "Not Started" &&
          previousStatus === "Completed"
        ) {
          currentSession = session;
          currentPeriod = 1;
          currentRepetition = 1;
        }
      });
      this.setState({
        program,
        currentSession,
        currentPeriod,
        currentPeriodInfo,
        sessionIndex,
        currentRepetition,
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
      ].results.push(results);
      console.log(program);
      await apiServices.patchOne(
        "customerPrograms",
        "5dbedf3ebc5fad3463b3e019",
        { sessions: program.sessions }
      );
    } catch (e) {
      console.log(e);
    }
  };

  render() {
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
                              <span className="sectionTitle">Steps</span>
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
  }
}

export default Repetition;
