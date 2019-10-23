import React from "react";
import { Form, Card, Col, Row } from "antd";
import InfoStepper from "../../pages/Customer/InfoStepper";

class FitnessGoals extends React.Component {
  render() {
    const { Meta } = Card;

    return (
      <div className="container" style={{ padding: "20px" }}>
        <h3>What do you want to achieve:</h3>
        <div className="clearfix"></div>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="example" src="/img/weight-loss.jpg" />}
            >
              <Meta title="Weight loss" />
            </Card>
            ,
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="example" src="/img/muscle-building.jpg" />}
            >
              <Meta title="Muscle Building" />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="example" src="/img/body-toning.jpg" />}
            >
              <Meta title="Body Toning" />
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="example" src="/img/general-fitness.jpg" />}
            >
              <Meta title="General fitness" />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="example" src="/img/athletic.jpg" />}
            >
              <Meta title="Athletic" />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="example" src="/img/rehab-fit.jpg" />}
            >
              <Meta title="Rehab fit" />
            </Card>
          </Col>
        </Row>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default FitnessGoals;
