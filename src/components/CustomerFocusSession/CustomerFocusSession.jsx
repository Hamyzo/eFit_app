import React from "react";
import {
  Row,
  Col,
  Typography,
  Button,
  Steps,
  Icon,
  InputNumber,
  Avatar,
  Statistic,
  Collapse,
  Timeline
} from "antd";

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
import * as dateScripts from "../../utils/dateScripts";
import Timer from "../Repetition/Timer";
import { Player } from "video-react";

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

    this.setState({ showPart: 0 });
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
          <div className="customer_focus_session_banner">
            <Row>
              <Col span={6} className={"basic-icon"}>
                <Icon type="solution" />
              </Col>
              <Col span={18}>
                <h1 className="title">{title}</h1>
              </Col>
            </Row>
          </div>
        </Row>
        <Row>
          <Col span={24}>
            <div id={"part1Div"} className={"wrapper-fs"}>
              {/*<AutoComplete placeholder={labelAge} onChange={(val) => {focusSession.age = val}}/><br /><br />*/}
              {/*<AutoComplete placeholder={labelWeight} onChange={(val) => {focusSession.weight = val}}/><br /><br />*/}
              {/*<AutoComplete placeholder={labelRestHR} onChange={(val) => {focusSession["rest_heart_rate"] = val}}/><br/><br />*/}
              {/*<AutoComplete placeholder={labelTargetHR} onChange={(val) => {focusSession["target_heart_rate"] = val}}/>*/}
              <Row className={"part-one-input"}>
                <Col span={11}>
                  <label
                    htmlFor="dynamic_rule_username"
                    className="ant-form-item-required"
                    title="labelAge"
                    style={{ paddingLeft: "80px" }}
                  >
                    {labelAge} :
                  </label>
                </Col>
                <Col span={13}>
                  <InputNumber
                    id={"age"}
                    min={0}
                    max={200}
                    className={"input-number"}
                    placeholder="e.g. 24 "
                    autoFocus={true}
                  />
                </Col>
              </Row>
              <Row className={"part-one-input"}>
                <Col span={11}>
                  <label
                    htmlFor="dynamic_rule_username"
                    className="ant-form-item-required"
                    title="labelWeight"
                    style={{ paddingLeft: "62px" }}
                  >
                    {labelWeight} :
                  </label>
                </Col>
                <Col span={13}>
                  <InputNumber
                    id={"weight"}
                    min={0}
                    max={500}
                    className={"input-number"}
                    placeholder="e.g. 75 "
                  />
                </Col>
              </Row>
              <Row className={"part-one-input"}>
                <Col span={11}>
                  <label
                    htmlFor="dynamic_rule_username"
                    className="ant-form-item-required"
                    title="labelRestHR"
                    style={{ paddingLeft: "10px" }}
                  >
                    {labelRestHR} :
                  </label>
                </Col>
                <Col span={13}>
                  <InputNumber
                    id={"rest_heart_rate"}
                    min={0}
                    max={500}
                    className={"input-number"}
                    placeholder="e.g. 90 "
                  />
                </Col>
              </Row>
              <Row className={"part-one-input"}>
                <Col span={11}>
                  <label
                    htmlFor="dynamic_rule_username"
                    className="ant-form-item-required"
                    title="labelRestHR"
                  >
                    {labelTargetHR} :
                  </label>
                </Col>
                <Col span={13}>
                  <InputNumber
                    id={"target_heart_rate"}
                    min={0}
                    max={500}
                    className={"input-number"}
                    placeholder="e.g. 170 "
                  />
                </Col>
              </Row>
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
    const title = "Heart Rates";
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
                <label
                  htmlFor="dynamic_rule_username"
                  className="ant-form-item-required"
                >
                  Measured heart Rate :{" "}
                </label>
                <InputNumber
                  id={"five_min_rest_hr"}
                  min={0}
                  max={500}
                  className={"input-number input_focus_session"}
                  placeholder="e.g. 80 "
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
                <label
                  htmlFor="dynamic_rule_username"
                  className="ant-form-item-required"
                >
                  Measured heart Rate :{" "}
                </label>
                <InputNumber
                  id={"thirty_deflections_hr"}
                  min={0}
                  max={500}
                  className={"input-number input_focus_session"}
                  placeholder="e.g. 120 "
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
                <label
                  htmlFor="dynamic_rule_username"
                  className="ant-form-item-required "
                >
                  Measured heart Rate :{" "}
                </label>
                <InputNumber
                  id={"one_min_elongated_hr"}
                  min={0}
                  max={500}
                  className={"input-number input_focus_session"}
                  placeholder="e.g. 110 "
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
                  <Step key={item.title} title={""} />
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
    console.log("focusExercises", focusExercises);
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

              <img
                className="step-img"
                alt="Loading"
                src={focusExercises[currentExerciseStep].img}
              />
              <br />
              <br />
              <Row style={{ marginBottom: "20px" }}>
                <Col span={24} align="middle">
                  <h1 style={{ fontSize: "22px" }}>
                    {focusExercises[currentExerciseStep].name}
                  </h1>
                </Col>
              </Row>
              <Row style={{ marginBottom: "20px" }}>
                {focusExercises[currentExerciseStep].steps ? (
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
                      <Timeline style={{ marginTop: "20px" }}>
                        {focusExercises[currentExerciseStep].steps.map(step => (
                          <Timeline.Item key={step}>{step}</Timeline.Item>
                        ))}
                      </Timeline>
                    </Collapse.Panel>
                  </Collapse>
                ) : (
                  <Col>
                    <Collapse bordered={false} defaultActiveKey={["1"]}>
                      <Collapse.Panel header="Description">
                        <p>
                          {" "}
                          {focusExercises[currentExerciseStep].description}
                        </p>
                      </Collapse.Panel>
                    </Collapse>
                  </Col>
                )}
              </Row>
              <Row>
                <div>
                  {focusExercises[currentExerciseStep].timed == true && (
                    <h3>
                      <label
                        htmlFor="dynamic_rule_username"
                        className="ant-form-item-required"
                      >
                        Total Time:{" "}
                      </label>

                      <InputNumber
                        id={currentExerciseStep}
                        className={"input-number input_focus_session"}
                        placeholder="e.g. 60 "
                      />
                    </h3>
                  )}
                  {!focusExercises[currentExerciseStep].timed && (
                    <h3>
                      <label
                        htmlFor="dynamic_rule_username"
                        className="ant-form-item-required"
                      >
                        Total Repetitions:{" "}
                      </label>

                      <InputNumber
                        id={currentExerciseStep}
                        className={"input-number input_focus_session"}
                        placeholder="e.g. 30 "
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
