import React from "react";
import { Steps, Button, message, Icon } from "antd";
import "./Customer.css";

import PersonalInfo from "../../components/Customer/PersonalInfo";
import CustomerPhoto from "../../components/Customer/CustomerPhoto";
import FitnessGoals from "../../components/Customer/FitnessGoals";

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

class InfoStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div >
        <Steps className="steps" size= "small" current={current}>
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
              onClick={() => message.success("Processing complete!")}
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
  }
}

export default InfoStepper;
