import React from "react";
import { Row, Spin } from "antd";

function Spinner() {
  return (
    <Row type="flex" justify="center">
      <Spin className="pageSpinner" size="large" />
    </Row>
  );
}

export default Spinner;
