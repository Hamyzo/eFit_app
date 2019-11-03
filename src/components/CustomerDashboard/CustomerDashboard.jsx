import React from "react";
import { Row, Col, Progress, Timeline, Button, Card, Icon } from "antd";
import "./CustomerDashboard.css";

class CustomerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderWaterIcon = () => (
    <Row>
      <Col span={4} style={{ height: "18px", width: "18px" }}>
        <img className="water_progress" src="/assets/images/raindrop.svg" />
      </Col>
      <Col span={4}>
        <p className="progress_tags">Water</p>
      </Col>
    </Row>
  );

  renderSunIcon = () => (
    <Row>
      <Col span={4} style={{ height: "18px", width: "18px" }}>
        <img className="water_progress" src="/assets/images/contrast.svg" />
      </Col>
      <Col span={4}>
        <p className="progress_tags">Sunlight</p>
      </Col>
    </Row>
  );

  renderLevelIcon = () => (
    <Row>
      <Col span={4} style={{ height: "18px", width: "18px" }}>
        <img className="water_progress" src="/assets/images/objective.svg" />
      </Col>
      <Col span={4}>
        <p className="progress_tags">Level</p>
      </Col>
    </Row>
  );

  render() {
    return (
      <div>
        <Row>
          <Col span={10}>
            <div className="plant">
              <img
                className="img-responsive"
                typeof="foaf:Image"
                src="https://making-the-web.com/sites/default/files/clipart/131252/cartoon-plant-131252-4910920.jpg"
                width="50%"
                height="50%"
                alt="Cartoon Plant 6 - 540 X 554"
                title="Cartoon Plant 6 - 540 X 554"
              />
            </div>
          </Col>
          <Col span={10}>
            <div className="plant_progress">
              <h1> My plant </h1>
              <div className="progress_bars">
                <Progress
                  percent={30}
                  strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068"
                  }}
                  format={this.renderWaterIcon}
                  size="small"
                  status="active"
                />
                <Progress
                  percent={50}
                  strokeColor={{
                    "0%": "#cf3e3c",
                    "100%": "#ffff29"
                  }}
                  format={this.renderSunIcon}
                  size="small"
                  status="active"
                />
                <Progress
                  percent={70}
                  strokeColor={{
                    "0%": "#994dd6",
                    "100%": "#4f7bdb"
                  }}
                  format={this.renderLevelIcon}
                  size="small"
                  status="active"
                />
              </div>
            </div>
          </Col>
        </Row>
        <div className="progress">
          <Row>
            <Col span={8}>
              <img className="one" src="/assets/images/one.svg" />
            </Col>
            <Col span={10}>
              <h3 className="daysSLW" style={{ fontSize: "105%" }}>
                Days since last workout
              </h3>
              <p className="daysSLWmessage" style={{ fontSize: "90%" }}>
                No more than 3 days!
              </p>
            </Col>
            <Col span={6}>
              <Row className="plantwater">
                <Col span={8}>
                  <img className="add" src="/assets/images/add.svg" />
                </Col>
                <Col span={8}>
                  <h4>3</h4>
                </Col>
                <Col span={8}>
                  <img className="water" src="/assets/images/raindrop.svg" />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="progress2">
          <Row>
            <Col span={8}>
              <img className="one" src="/assets/images/pulse.svg" />
            </Col>
            <Col span={10}>
              <h3 className="daysSLW" style={{ fontSize: "105%" }}>
                Cardio Fitness
              </h3>
              <p className="daysSLWmessage" style={{ fontSize: "90%" }}>
                {" "}
                Your current score: 50{" "}
              </p>
            </Col>
            <Col span={6}>
              <Row className="plantwater">
                <Col span={8}>
                  <img className="add" src="/assets/images/add.svg" />
                </Col>
                <Col span={8}>
                  <h4>2</h4>
                </Col>
                <Col span={8}>
                  <img className="water" src="/assets/images/contrast.svg" />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <br />
        <Card
          className="program"
          title="Currently on: Session 1"
          extra={<a href="#">See Program</a>}
        >
          <Timeline className="timeline">
            <Timeline.Item color="green">
              <Row>
                <Col span={6}>
                  <h3 style={{ fontSize: "110%" }}>Period 1 </h3>
                </Col>
                <Col span={6} offset={12}>
                  {" "}
                  <p>3/3 Reps Completed</p>
                </Col>
              </Row>
            </Timeline.Item>
            <Timeline.Item color="green">
              <Row>
                <Col span={6}>
                  <h3 style={{ fontSize: "110%" }}>Period 2 </h3>
                </Col>
                <Col span={6} offset={12}>
                  {" "}
                  <p>4/4 Reps Completed</p>
                </Col>
              </Row>
            </Timeline.Item>
            <Timeline.Item color="gray">
              {" "}
              <Row>
                <Col span={6}>
                  <h3 style={{ fontSize: "110%" }}>Period 3</h3>
                </Col>
                <Col span={6} offset={12}>
                  {" "}
                  <p>1/3 Reps Completed</p>
                </Col>
              </Row>
            </Timeline.Item>
          </Timeline>
          <Button className="rep_button" block>
            Start Next Repetition
          </Button>
        </Card>
      </div>
    );
  }
}

export default CustomerDashboard;