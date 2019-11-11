import React from "react";
import { Card, Button, Steps, Modal, Icon, Result, Col, Row } from "antd";
import "./Repetition.css";

import RepetitionDone from "./RepetitionDone";
import * as apiServices from "../../apiServices";
import Spinner from "../Global/Spinner";

const { Meta } = Card;

const { Step } = Steps;

const steps = [
  {
    title: "Run for 45 minutes",
    content: (
      <img
        className="step-img"
        alt="Loading"
        src="/assets/images/running.jpg"
      />
    )
  },
  {
    title: "Crunches",
    content: (
      <img
        className="step-img"
        alt="Loading"
        src="http://www.mariadicroce.com/wp-content/uploads/2015/02/workout-at-home.jpg"
      />
    )
  },
  {
    title: "Weird Abs Workout",
    content: (
      <img
        className="step-img"
        alt="Loading"
        src="https://d50b62f6164e0c4a0279-11570554cb5edae3285603e6ab25c978.ssl.cf5.rackcdn.com/html_body_blocks/images/000/005/515/original/working_out_at_home_1024x1024_enf0625e2c742e37a36e857417ca769d0f.jpg?1508904721"
      />
    )
  },
  {
    title: "Yoga",
    content: (
      <img
        className="step-img"
        alt="Loading"
        src="http://www.yaduki.com/ss/wp-content/uploads/2018/01/Yoga-Indoors-Downward-Facing-Dog-Pose-532343318_1258x838.jpeg"
      />
    )
  },
  {
    title: "More Yoga",
    description: "",
    content: (
      <img
        className="step-img"
        alt="Loading"
        src="https://s3-ap-northeast-1.amazonaws.com/bhive-jp/media/yogaroom/article/4821/shutterstock_713195971.jpg"
      />
    )
  }
];

class Repetition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      program: null,
      startCardShow: 1,
      currentStep: 0,

      modalVisible: false,
      btnEasyLoading: false,
      btnProperLoading: false,
      btnDiffiLoading: false
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
        "5dbee421ec899a4934917bf7",
        "populate=program,customer,focus_sessions"
      );
      console.log("Program", program);
      this.setState({ program });
    } catch (e) {}
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

  handleEasyBtn = () => {
    this.setState({ btnEasyLoading: true });
    this.handleBtn();
  };

  handleProperBtn = () => {
    this.setState({ btnProperLoading: true });
    this.handleBtn();
  };

  handleDiffiBtn = () => {
    this.setState({ btnDiffiLoading: true });
    this.handleBtn();
  };

  prevStep = () => {
    const current = this.state.currentStep - 1;
    this.setState({ currentStep: current });
  };

  handleDoneBtn = () => {
    this.setState({ startCardShow: 0 });
  };

  completedReps = results => {
    if (results == null) {
      return 0;
    } else {
      return results.length;
    }
  };

  sessionStatus = periods => {
    var totalReps = 0;
    var completedRep = 0;
    for (var i = 0; i < periods.length; i++) {
      totalReps = totalReps + periods[i].nb_repetitions;
      completedRep = completedRep + this.completedReps(periods[i].results);
    }
    return this.status(completedRep, totalReps);
  };

  status = (completedReps, numReps) => {
    if (completedReps == numReps) {
      return "Completed";
    } else if (completedReps == 0) {
      return "Not Started";
    } else {
      return "In progress";
    }
  };

  render = () => {
    const { startCardShow, program } = this.state;
    console.log(program);

    const startCard = (
      <Row className="top-row">
        {program ? (
          program.sessions.map((session, index) =>
            this.sessionStatus(session.periods) === "In progress" ? (
              <Col key={index} span={24}>
                <Card
                  className="wrapper"
                  id="card"
                  style={{}}
                  cover={<img alt="run" src="/assets/images/run.jpg" />}
                >
                  <Meta
                    title={session.name}
                    description={session.description}
                    style={{ marginTop: "2%" }}
                  />
                  <Button
                    block
                    className="btn-start"
                    onClick={() => this.startOnClick()}
                  >
                    START
                  </Button>
                </Card>
              </Col>
            ) : null
          )
        ) : (
          <Spinner />
        )}
      </Row>
    );

    const { modalVisible } = this.state;
    // const modalWidth = "300px";
    const modalTitle = "How was this exercise?";

    const stepDiv = (
      <div className="wrapper" id="stepDiv">
        <Modal
          className="feedback-modal"
          title={modalTitle}
          visible={modalVisible}
          closable={false}
          maskClosable={false}
          footer={null}
        >
          <div className="modal-content">
            <Row>
              <Col span={8} align="center">
                <Button
                  onClick={() => this.handleEasyBtn()}
                  className="feedbackBtn"
                  loading={this.state.btnEasyLoading}
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
                  onClick={() => this.handleProperBtn()}
                  className="feedbackBtn"
                  loading={this.state.btnProperLoading}
                >
                  <Icon type="heart" theme="twoTone" twoToneColor="#F199CB" />{" "}
                  Proper
                </Button>
              </Col>
              <Col span={8} align="center">
                <Button
                  onClick={() => this.handleDiffiBtn()}
                  className="feedbackBtn"
                  loading={this.state.btnDiffiLoading}
                >
                  <Icon type="rocket" theme="twoTone" twoToneColor="#8E2E37" />
                  Hard
                </Button>
              </Col>
            </Row>
          </div>
        </Modal>

        <Steps current={this.state.currentStep}>
          {steps.map(item => (
            <Step key={item.title} title="" />
          ))}
        </Steps>

        <Row className="top-row" style={{ marginTop: "-4%" }}>
          <Col>
            <div>
              <div className="steps-content">
                {steps[this.state.currentStep].content}
                <br />
                <br />
                <h1>{steps[this.state.currentStep].title}</h1>
                <hr />
                <p>
                  Just let these leaves jump off the brush All kinds of happy
                  little splashes. Isn't that fantastic?
                </p>
              </div>

              <div className="steps-action">
                {this.state.currentStep > 0 && (
                  <Button
                    style={{ marginLeft: 8 }}
                    onClick={() => this.prevStep()}
                  >
                    Previous
                  </Button>
                )}
                {this.state.currentStep < steps.length - 1 && (
                  <Button type="primary" onClick={() => this.showResultModal()}>
                    Done, Next!
                  </Button>
                )}
                {this.state.currentStep === steps.length - 1 && (
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

    const repetitionDone = <RepetitionDone />;

    if (startCardShow === 1) {
      return startCard;
    }
    if (startCardShow === -1) {
      // else ： hide startCard
      return stepDiv;
    }
    if (startCardShow === 0) {
      return repetitionDone;
    }
    return null;
  };
}

export default Repetition;
