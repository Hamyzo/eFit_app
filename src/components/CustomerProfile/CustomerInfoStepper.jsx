import React from "react";
import { Steps, Button, message, Icon } from "antd";
import "./CustomerProfile.css";

import PersonalInfo from "./Steps/PersonalInfo";
import CustomerPhoto from "./Steps/CustomerPhoto";
import FitnessGoals from "./Steps/FitnessGoals";
import CustomerInfoFinish from "./Steps/CustomerInfoFinish";

const { Step } = Steps;

const steps = [
  {
    title: "Step 01",
    content: <PersonalInfo />,
    icon: "idcard"
  },
  {
    title: "Step 02",
    content: <FitnessGoals />,
    icon: "trophy"
  },
  {
    title: "Step 03",
    content: <CustomerPhoto />,
    icon: "camera"
  }
];

class CustomerInfoStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      finish: false
    };
  }

  next() {
    const { current } = this.state;
    this.setState({ current: current + 1 });
  }

  prev() {
    const { current } = this.state;
    this.setState({ current: current - 1 });
  }

  handleDoneBtn = () => {
    this.setState({ finish: true });
  };

  render = () => {
    const { current, finish } = this.state;

    const customerInfoDone = <CustomerInfoFinish />;

    const stepDiv = (
      <div>
        <Steps className="steps" size="small" current={current}>
          {steps.map(item => (
            <Step
              key={item.title}
              title={item.title}
              /*icon={<Icon type={item.icon} />}*/
            />
          ))}
        </Steps>
        <div className="wrapper">
          <div className="steps-pers-content">{steps[current].content}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button
                type="primary"
                style={{ float: "right" }}
                onClick={() => this.next()}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                style={{ float: "right" }}
                // onClick={() => message.success("Processing complete!")}
                onClick={() => this.handleDoneBtn()}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button
                style={{ float: "right", marginRight: "10px" }}
                onClick={() => this.prev()}
              >
                Previous
              </Button>
            )}
          </div>
        </div>
      </div>
    );

    if (finish === true) {
      return customerInfoDone;
    }

    return stepDiv;
  };
}

export default CustomerInfoStepper;
