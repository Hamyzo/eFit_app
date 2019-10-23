import React from "react";
//import WeightLoss from "./img/weight-loss.jpg";
//import MuscleBuilding from "./img/muscle-building.jpg";
//import BodyToning from "./img/body-toning.jpg";
//import GeneralFitness from "./img/general-fitness.jpg";
//import Athletic from "./img/athletic.jpg";
//import RehabFit from "./img/rehab-fit.jpg";
//import MetabolicFit from "./img/metabolic-fit.jpg";
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
              style={{ width: 240 }}
             // cover={<img alt="example" src={WeightLoss} />}
            >
              <Meta title="Weight loss" />
            </Card>
            ,
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ width: 240 }}
             // cover={<img alt="example" src={MuscleBuilding} />}
            >
              <Meta title="Muscle Building" />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ width: 240 }}
              //cover={<img alt="example" src={BodyToning} />}
            >
              <Meta title="Body Toning" />
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              style={{ width: 240 }}
             // cover={<img alt="example" src={GeneralFitness} />}
            >
              <Meta title="General fitness" />
            </Card>
            ,
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ width: 240 }}
            //  cover={<img alt="example" src={Athletic} />}
            >
              <Meta title="Athletic" />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ width: 240 }}
            //  cover={<img alt="example" src={RehabFit} />}
            >
              <Meta title="Rehab fit" />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FitnessGoals;
