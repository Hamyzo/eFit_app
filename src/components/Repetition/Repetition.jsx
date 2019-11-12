import React from "react";
import { Card, Button, Steps, Modal, Icon, Result, Col, Row } from "antd";
import "./Repetition.css";

import RepetitionDone from "./RepetitionDone";
import * as apiServices from "../../apiServices";
import * as programScripts from "../../utils/programScripts";
import Spinner from "../Global/Spinner";

const { Meta } = Card;

const { Step } = Steps;

class Repetition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      program: null,
      startCardShow: 1,
      currentStep: 0,
      currentSession: null,
      currentPeriod: null,
      currentRepetition: null,
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
      program.sessions.forEach(session => {
        const sessionStatus = programScripts.sessionStatus(session.periods);
        if (sessionStatus.status === "In progress") {
          currentSession = session;
          currentPeriod = sessionStatus.latestPeriod;
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

  renderStartCard = () => {
    const {
      program,
      currentSession,
      currentPeriod,
      currentRepetition
    } = this.state;
    return (
      <Row className="top-row">
        {program ? (
          <Col span={24}>
            <Card
              className="wrapper"
              id="card"
              style={{}}
              cover={<img alt="run" src="/assets/images/run.jpg" />}
            >
              <Meta
                title={
                  <div>
                    <h2>
                      {currentSession.name} (Session{" "}
                      {program.sessions.indexOf(currentSession) + 1})
                    </h2>
                  </div>
                }
                description={
                  <div>
                    {currentSession.description}
                    <br />
                    <br />
                    <p>
                      <Icon
                        type="info-circle"
                        theme="twoTone"
                        twoToneColor="#52c41a"
                      />{" "}
                      You are currently on period {currentPeriod}
                    </p>
                  </div>
                }
                style={{ marginTop: "2%", fontSize: "medium" }}
              />
              <Button
                block
                className="btn-start"
                onClick={() => this.startOnClick()}
              >
                START REPETITION {currentRepetition}/
                {currentSession.periods[currentPeriod - 1].nb_repetitions}
              </Button>
            </Card>
          </Col>
        ) : (
          <Spinner />
        )}
      </Row>
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
                {/* currentStep > 0 && (
                  <Button
                    style={{ marginLeft: 8 }}
                    onClick={() => this.prevStep()}
                  >
                    Previous
                  </Button>
                ) */}
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

export default Repetition;
