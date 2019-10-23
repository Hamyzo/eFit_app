import React from "react";
import { Row, Col, Progress, Timeline, Button, Card, Icon } from 'antd';
import "./Dashboard.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="plant">
        <a href=""><img className={"img-responsive"} typeof="foaf:Image"
                                                                  src="https://making-the-web.com/sites/default/files/clipart/131252/cartoon-plant-131252-4910920.jpg"
                                                                  width="50%" height="50%" alt="Cartoon Plant 6 - 540 X 554"
                                                                title="Cartoon Plant 6 - 540 X 554"/></a>

        </div>
        <div className="progress">
        <Row>
          <Col span={8} ><Progress className="prg_circle" type="circle" percent={100} width={80} /></Col>
          <Col span={10}> <h2 className="daysSLW">Days since last workout</h2> </Col>
          <Col span={6}>
              <Row className="plantwater">
                <Col span={8}>
                  <img className="add" src="/assets/add.svg" /></Col>
                <Col span={8}><h3>3</h3></Col>
                <Col span={8}><img className="water" src="/assets/raindrop.svg" /></Col>
              </Row>
          </Col>

        </Row>
        </div>
        <div className="progress">
          <Row>
            <Col span={8}>
                <img className="icon" src="/assets/pulse.svg" />
            </Col>
            <Col span={10}>
              <h2 className="cardio">Cardio Fitness</h2>
              <p> Your current score: 50 </p>
            </Col>
            <Col span={6}></Col>
          </Row>
        </div>
        <br />
          <Card className="program" title="Currently on: Session 1" extra={<a href="#">See Program</a>} >
            <Timeline className="timeline">
              <Timeline.Item color="green">
                <Row>
                  <Col span={6}><h3>Period 1 </h3></Col>
                  <Col span={6} offset={12}> <p>3/3 Reps Completed</p></Col>
                </Row>
              </Timeline.Item>
              <Timeline.Item color="green">
                <Row>
                  <Col span={6}><h3>Period 2 </h3></Col>
                  <Col span={6} offset={12}> <p>4/4 Reps Completed</p></Col>
               </Row>
              </Timeline.Item>
              <Timeline.Item color="gray"> <Row>
                <Col span={6}><h3>Period 3</h3></Col>
                <Col span={6} offset={12}> <p>1/3 Reps Completed</p></Col>
              </Row>
              </Timeline.Item>
            </Timeline>
            <Button className="rep_button"  block>
              Start Next Repetition
            </Button>
          </Card>



      </div>
    );
  }
}

export default Dashboard;
