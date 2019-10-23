import React from "react";
import { Steps, Button, message, Icon } from "antd";
import "./Customer.css";
import PersonalInfo from "../../components/Customer/PersonalInfo";
import CustomerPhoto from "../../components/Customer/CustomerPhoto";
import FitnessGoals from "../../components/Customer/FitnessGoals";

const { Step } = Steps;

const steps = [
  {
    title: "Step 1",
    content: <PersonalInfo />
  },
  {
    title: "Step 2",
    content: <FitnessGoals />
  },
  {
    title: "Step 3",
    content: <CustomerPhoto />
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
      <div className="wrapper">
        <Steps current={current}>
          {steps.map(item => (
            <Step
              key={item.title}
              title={item.title}
              icon={<Icon type="user" />}
            />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default InfoStepper;
