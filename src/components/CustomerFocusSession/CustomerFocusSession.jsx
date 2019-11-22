import React from "react";
import {
  AutoComplete,
  Row,
  Col,
  Typography,
  Button,
  Steps,
  Icon,
  Card,
  Avatar,
} from "antd";

import "./CustomerFocusSession.css";
import * as apiServices from "../../apiServices";
import RepetitionDone from "../Repetition/RepetitionDone";


const { Title } = Typography;
const {Step} = Steps;
const { Meta } = Card;

const stepsFC = [
  {
    title: 'First',
    content: <div><img

      alt={"Loading"}
      src={"/assets/images/lyDown.png"}
    />
      <div>
        <h3 className={"des-font"}>After lying calmly for 5 mins </h3>
        <h3>The Cardiac Rate: <AutoComplete/></h3>
      </div>
    </div>,

  },
  {
    title: 'Second',
    content: <div><img

      alt={"Loading"}
      src={"/assets/images/flexion.jpg"}
    />
      <div>
        <h3 className={"des-font"}>After 30 complete flexions in 45 sec </h3>
        <h3>The Cardiac Rate: <AutoComplete/></h3>
      </div>
    </div>,
  },
  {
    title: 'Last',
    content: <div><img

      alt={"Loading"}
      src={"/assets/images/evalu-exercise.jpg"}
    />
      <div>
        <h3 className={"des-font"}>After doing exercise for 1 min </h3>
        <h3>The Cardiac Rate: <AutoComplete/></h3>
      </div>
    </div>,
  },
];

class CustomerFocusSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPart: 1,
      currentStep: 0,
      currentExerciseStep: 0,
      focusExercises: []
    };
  }

  componentDidMount() {
    this.getPart3Exs();
  }

  // get focusExercises
  async getPart3Exs() {
    const exercises = await apiServices.get("focusExercises","");
    this.setState({
      focusExercises: exercises
    });
  }

  showPart2() {
    this.setState({
      showPart:2
    })
  }

  showPart3() {
    this.setState({
      showPart:3
    })
  }

  finish() {
    this.setState({
      showPart:0
    })
  }
  nextFC(){
    const currentStep = this.state.currentStep + 1;
    this.setState({currentStep});
  }

  nextFocusExercise() {
    const currentExerciseStep = this.state.currentExerciseStep + 1;
    this.setState({currentExerciseStep});
  }

  renderPart1() {
    const labelAge = "Age",
      labelWeight = "Weight",
      labelRestHR = "Rest Heart Rate",
      labelTargetHR = "Target Heart Rate";
    const title = "Basic Info";
    return <div>
      <Row justify={"center"}>
        <Col span={8} className={"basic-icon"}><Icon type="smile" theme="twoTone" twoToneColor={"#43978d"}/></Col>
        <Col span={15}><Title level={2} className = {"title"}>{title} </Title></Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={"wrapper-fs"}>
            <AutoComplete placeholder={labelAge}/><br /><br />
            <AutoComplete placeholder={labelWeight}/><br /><br />
            <AutoComplete placeholder={labelRestHR}/><br/><br />
            <AutoComplete placeholder={labelTargetHR}/>
          </div>
        </Col>
      </Row>
      <Button
        type="primary"
        style={{ float: "right", "marginTop": "10px"}}
        onClick={() => this.showPart2()}
      >
        Next Part
      </Button>
    </div>
  };

  renderPart2() {
    const title = "Cardiac Rate";
    const {currentStep} = this.state;
    return <div>
      <Row justify={"center"}>
        <Col span={8} style={{"textAlign": "right"}}>
          <img className="heart-icon" src="/assets/images/pulse.svg" />
        </Col>
        <Col span={15}>
          <Title level={2} className = {"title"}>{title} </Title>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <div className="wrapper" >
            <Steps current={currentStep}>
              {stepsFC.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <Row>
              <div className="steps-content">{stepsFC[currentStep].content}</div>
              <div>
                {/*countDown Timer*/}
              </div>
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
                )

                }
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  };

  renderPart3() {
    const title = "Performance";
    const {currentExerciseStep, focusExercises} = this.state;

    return <div>
      <Row justify={"center"}>
        <Col span={8} style={{"textAlign": "right"}}>
          <img className="heart-icon" src="/assets/images/pulse.svg" />
        </Col>
        <Col span={15}>
          <Title level={2} className = {"title"}>{title} </Title>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <div className="wrapper" >
            <Col span={24}>
            <Steps current={currentExerciseStep} size={"small"} className={"focusStepHead"}>
              {focusExercises.map((item) => (
                <Step key={item.name} title={""} />
              ))}
            </Steps></Col>

            <Row>
              <h3>{focusExercises[currentExerciseStep].name}</h3>
              <div className="steps-content">{focusExercises[currentExerciseStep].description}</div>
              <div>
                {/*countDown Timer*/}
              </div>
              <div className="steps-action">
                {currentExerciseStep < focusExercises.length - 1 && (
                  <Button type="primary" onClick={() => this.nextFocusExercise()}>
                    Next
                  </Button>
                )}

                {currentExerciseStep == focusExercises.length - 1 && (
                  <Button type={"primary"} onClick={() => this.finish()}>
                    Done
                  </Button>
                )

                }
              </div>
            </Row>
          </div>
        </Col>
      </Row>

    </div>
  }

  render() {
    const {showPart} = this.state;
    if(showPart == 1) {
      return this.renderPart1();
    } else if(showPart == 2) {
      return this.renderPart2();
    } else if(showPart == 3) {
      return this.renderPart3();
    } else if(showPart == 0) {
      return <RepetitionDone />;
    }
  }
}

export default CustomerFocusSession;