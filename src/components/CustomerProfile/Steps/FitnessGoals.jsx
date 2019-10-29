import React from "react";
import { Form, Card, Col, Row } from "antd";
import CustomerInfoStepper from "../CustomerInfoStepper";

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
              cover={<img alt="example" src="/assets/images/weight-loss.jpg" />}
            >
              <Meta title="Weight loss" />
            </Card>
            ,
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={
                <img alt="example" src="/assets/images/muscle-building.jpg" />
              }
            >
              <Meta title="Muscle Building" />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="example" src="/assets/images/body-toning.jpg" />}
            >
              <Meta title="Body Toning" />
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              cover={
                <img alt="example" src="/assets/images/general-fitness.jpg" />
              }
            >
              <Meta title="General fitness" />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="example" src="/assets/images/athletic.jpg" />}
            >
              <Meta title="Athletic" />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="example" src="/assets/images/rehab-fit.jpg" />}
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
