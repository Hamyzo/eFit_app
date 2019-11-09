import React from "react";
import { Result, Icon, Button } from "antd";
import InfoStepper from "../../pages/Customer/InfoStepper";

class ResultFinshed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Result
        icon={<Icon type="smile" theme="twoTone" />}
        title="Great, we have done all the operations!"
        extra={<Button type="primary">Next</Button>}
      />
    );
  }
}

export default ResultFinshed;
