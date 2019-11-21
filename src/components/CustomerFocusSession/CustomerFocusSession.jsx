import React from "react";
import {
  AutoComplete,
  Row,
  Col,
  Typography,
  Button,
  Steps,
  Icon
} from "antd";

import "./CustomerFocusSession.css";

const { Title } = Typography;
const {Step} = Steps;

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
      currentStep: 0
    };
  }

  componentDidMount() {

  }

  showPart2() {
    this.setState({
      showPart:2
    })
  }

  nextFC(){
    const currentStep = this.state.currentStep + 1;
    this.setState({currentStep});
  }

  renderPart1() {
    const labelAge = "Age",
      labelWeight = "Weight",
      labelRestHR = "Rest Heart Rate",
      labelTargetHR = "Target Heart Rate";
    return <div>
      <Row>
        <Col span={24}>
          <div>
            <div className={"wrapper-fs"}>
              <AutoComplete placeholder={labelAge}/>
              <AutoComplete placeholder={labelWeight}/>
              <AutoComplete placeholder={labelRestHR}/>
              <AutoComplete placeholder={labelTargetHR}/>
          </div>
          </div>
        </Col>
      </Row>
      <Row></Row>
      <Row></Row>
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
    }
  }
}

export default CustomerFocusSession;