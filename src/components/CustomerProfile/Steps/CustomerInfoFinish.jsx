import React from "react";
import { Result, Icon, Button } from "antd";

class CustomerInfoFinish extends React.Component {
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

export default CustomerInfoFinish;
