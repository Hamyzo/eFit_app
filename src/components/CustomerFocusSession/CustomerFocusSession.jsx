import React from "react";
import { Row, Col, Typography, Button, Steps, Icon, InputNumber } from "antd";

/**
 * <Focus session>
 * Only the customer, customer_program, weight_unit, exercises and due_date are there at the beginning
 *
 {
  "customer": "id111111111111111111111111",
  "customer_program": "id111111111111111111111111",
  "age": 30,
  "weight": 50,
  "weight_unit": "kg",
  "rest_heart_rate": 80,
  "target_heart_rate": 130,
  "five_min_rest_hr": 77,
  "thirty_deflections_hr": 88,
  "one_min_elongated_hr": 80,
  "dickson_index": 2.4,
  "exercises": [
    "id111111111111111111111111"
  ],
  "results": [
    {
      "time": 120,
      "reps": 35
    }
  ],
  "due_date": "2019-10-15T20:20:20.000Z",
  "validation_date": "2019-10-15T20:20:20.000Z"
}
 */

import "./CustomerFocusSession.css";
import * as apiServices from "../../apiServices";
import RepetitionDone from "../Repetition/RepetitionDone";

const { Title } = Typography;
const { Step } = Steps;

class CustomerFocusSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPart: 1,
      currentStep: 0,
      currentExerciseStep: 0,
      focusExercises: [],
      focusSession: {},
      customerProgram: {},
      results: [],
      prevId: 0
    };
  }

  componentDidMount() {
    this.getFocusSession();
    this.getCustomerProgram();
    this.getPart3Exs();

    this.bindOnfocusEvent();
  }

  async getFocusSession() {
    await this.setState({ focusSession: this.props.focusSession });
    this.bindChangeEvent();
  }

  async getCustomerProgram() {
    await this.setState({ customerProgram: this.props.customerProgram });
  }

  // get focusExercises
  async getPart3Exs() {
    const exercises = await apiServices.get("focusExercises", "");
    this.setState({
      focusExercises: exercises
    });
  }

  showPart2() {
    this.bindChangeEvent();

    this.setState({
      showPart: 2
    });
  }

  showPart3() {
    this.setState({
      showPart: 3
    });
  }

  bindChangeEvent() {
    const { focusSession } = this.state;

    const part1Div = document.getElementById("part1Div");
    //const part2Input = document.getElementById("partInput");
    let that = this;

    part1Div.addEventListener(
      "change",
      function(event) {
        let id = event.target["id"];
        let val = event.target["value"];
        if (isNaN(id)) {
          focusSession[id] = val;
        }
      },
      false
    );
  }

  bindOnfocusEvent() {
    const part1Div = document.getElementById("part1Div");
    part1Div.addEventListener("focusin", function(event) {
      if (event.target.type == "input" || event.target.type == "text") {
        event.target.select();
        document.oncontextmenu = function(e) {
          e.preventDefault();
        };
      }
    });
  }

  nextFC() {
    const currentStep = this.state.currentStep + 1;
    this.setState({ currentStep });
  }

  nextFocusExercise() {
    const { results, currentExerciseStep, focusSession } = this.state;
    const preValue = document.getElementById(currentExerciseStep).value;
    if (currentExerciseStep == 0) {
      results.push({ timed: preValue });
    } else {
      results.push({ reps: preValue });
    }

    this.setState({
      currentExerciseStep: currentExerciseStep + 1,
      results: results
    });

    console.log(focusSession);
  }

  async finish() {
    try {
      const {
        focusSession,
        results,
        currentExerciseStep,
        customerProgram
      } = this.state;

      const preValue = document.getElementById(currentExerciseStep).value;
      results.push({ reps: preValue });

      focusSession.results = results;
      focusSession["validation_date"] = new Date();
      //focusSession.results = results;
      const { _id, ...rest } = focusSession;

      const customer = customerProgram.customer._id;
      const { coach } = customerProgram.program;

      const data = {
        customer,
        coach,
        sender: "CUSTOMER",
        type: "FOCUS_SESSION",
        content: "The current focus session has been completed"
      };

      await apiServices.patchOne("focusSessions", _id, rest);
      await apiServices.postOne("notifications", data);
    } catch (e) {
      console.log(e);
    }
  }

  renderPart1() {
    const labelAge = "Age",
      labelWeight = "Weight",
      labelRestHR = "Rest Heart Rate",
      labelTargetHR = "Target Heart Rate";
    const title = "Basic Info";
    return (
      <div>
        <Row justify={"center"}>
          <Col span={8} className={"basic-icon"}>
            <Icon type="smile" theme="twoTone" twoToneColor={"#43978d"} />
          </Col>
          <Col span={15}>
            <Title level={2} className={"title"}>
              {title}{" "}
            </Title>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div id={"part1Div"} className={"wrapper-fs"}>
              {/*<AutoComplete placeholder={labelAge} onChange={(val) => {focusSession.age = val}}/><br /><br />*/}
              {/*<AutoComplete placeholder={labelWeight} onChange={(val) => {focusSession.weight = val}}/><br /><br />*/}
              {/*<AutoComplete placeholder={labelRestHR} onChange={(val) => {focusSession["rest_heart_rate"] = val}}/><br/><br />*/}
              {/*<AutoComplete placeholder={labelTargetHR} onChange={(val) => {focusSession["target_heart_rate"] = val}}/>*/}
              <div className={"part-one-input"}>
                <InputNumber
                  id={"age"}
                  min={0}
                  max={200}
                  className={"input-number"}
                  placeholder={labelAge}
                  autoFocus={true}
                />
              </div>
              <div className={"part-one-input"}>
                <InputNumber
                  id={"weight"}
                  min={0}
                  max={500}
                  className={"input-number"}
                  placeholder={labelWeight}
                />
              </div>
              <div className={"part-one-input"}>
                <InputNumber
                  id={"rest_heart_rate"}
                  min={0}
                  max={500}
                  className={"input-number"}
                  placeholder={labelRestHR}
                />
              </div>
              <div className={"part-one-input"}>
                <InputNumber
                  id={"target_heart_rate"}
                  min={0}
                  max={500}
                  className={"input-number"}
                  placeholder={labelTargetHR}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Button
          type="primary"
          style={{ float: "right", marginTop: "10px" }}
          onClick={() => this.showPart2()}
        >
          Next Part
        </Button>
      </div>
    );
  }

  renderPart2() {
    const title = "Cardiac Rate";
    const { currentStep } = this.state;

    const stepsFC = [
      {
        title: "First",
        content: (
          <div>
            <img alt={"Loading"} src={"/assets/images/lyDown.png"} />
            <div>
              <h3 className={"des-font"}>After lying calmly for 5 mins </h3>
              <h3>
                The Cardiac Rate:{" "}
                <InputNumber
                  id={"five_min_rest_hr"}
                  min={0}
                  max={500}
                  className={"input-number"}
                />
              </h3>
            </div>
          </div>
        )
      },
      {
        title: "Second",
        content: (
          <div>
            <img alt={"Loading"} src={"/assets/images/flexion.jpg"} />
            <div>
              <h3 className={"des-font"}>
                After 30 complete flexions in 45 sec{" "}
              </h3>
              <h3>
                The Cardiac Rate:{" "}
                <InputNumber
                  id={"thirty_deflections_hr"}
                  min={0}
                  max={500}
                  className={"input-number"}
                />
              </h3>
            </div>
          </div>
        )
      },
      {
        title: "Last",
        content: (
          <div>
            <img alt={"Loading"} src={"/assets/images/evalu-exercise.jpg"} />
            <div>
              <h3 className={"des-font"}>
                After lying for 1 min after the exercise
              </h3>
              <h3>
                The Cardiac Rate:{" "}
                <InputNumber
                  id={"one_min_elongated_hr"}
                  min={0}
                  max={500}
                  className={"input-number"}
                />
              </h3>
            </div>
          </div>
        )
      }
    ];
    return (
      <div>
        <Row justify={"center"}>
          <Col span={8} style={{ textAlign: "right" }}>
            <img className="heart-icon" src="/assets/images/pulse.svg" />
          </Col>
          <Col span={15}>
            <Title level={2} className={"title"}>
              {title}{" "}
            </Title>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <div className="wrapper" id={"part2Input"}>
              <Steps current={currentStep}>
                {stepsFC.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <Row>
                <div className="steps-content">
                  {stepsFC[currentStep].content}
                </div>
                <div>{/*countDown Timer*/}</div>
                <div className="steps-action">
                  {currentStep < stepsFC.length - 1 && (
                    <Button type="primary" onClick={() => this.nextFC()}>
                      Next
                    </Button>
                  )}

                  {currentStep == stepsFC.length - 1 && (
                    <Button type={"primary"} onClick={() => this.showPart3()}>
                      Next Part
                    </Button>
                  )}
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  renderPart3() {
    const title = "Performance";
    const { currentExerciseStep, focusExercises } = this.state;
    const { windowWidth } = this.props;

    return (
      <div>
        <Row justify={"center"}>
          <Col span={8} style={{ textAlign: "right" }}>
            <Icon type="rocket" className="rocket-icon" />
          </Col>
          <Col span={15}>
            <Title level={2} className={"title"}>
              {title}{" "}
            </Title>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <div className="wrapper">
              <Col span={24}>
                <Steps
                  current={currentExerciseStep}
                  size={"small"}
                  className={"focusStepHead"}
                >
                  {focusExercises.map(item => (
                    <Step key={item.name} title={""} />
                  ))}
                </Steps>
              </Col>

              <Row>
                <h2>{focusExercises[currentExerciseStep].name}</h2>
                <div>
                  <img
                    alt="focus exercise"
                    height={windowWidth < 576 ? "150px" : "200px"}
                    width="100%"
                    src={focusExercises[currentExerciseStep].img}
                  />
                </div>
                <div className="steps-content">
                  {focusExercises[currentExerciseStep].description}
                </div>
                <div>
                  {focusExercises[currentExerciseStep].timed == true && (
                    <h3>
                      Max Time:{" "}
                      <InputNumber
                        id={currentExerciseStep}
                        className={"input-number"}
                      />
                    </h3>
                  )}
                  {!focusExercises[currentExerciseStep].timed && (
                    <h3>
                      Max Repetitions:{" "}
                      <InputNumber
                        id={currentExerciseStep}
                        className={"input-number"}
                      />
                    </h3>
                  )}
                </div>
                <div>{/*countDown Timer*/}</div>
                <div className="steps-action">
                  {currentExerciseStep < focusExercises.length - 1 && (
                    <Button
                      type="primary"
                      onClick={() => this.nextFocusExercise()}
                    >
                      Next
                    </Button>
                  )}

                  {currentExerciseStep == focusExercises.length - 1 && (
                    <Button type={"primary"} onClick={() => this.finish()}>
                      Done
                    </Button>
                  )}
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { showPart } = this.state;
    if (showPart == 1) {
      return this.renderPart1();
    } else if (showPart == 2) {
      return this.renderPart2();
    } else if (showPart == 3) {
      return this.renderPart3();
    } else if (showPart == 0) {
      return <RepetitionDone />;
    }
  }
}

export default CustomerFocusSession;
