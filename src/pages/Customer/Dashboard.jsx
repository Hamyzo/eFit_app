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
          <Col span={8}><Progress className="prg_circle" type="circle" percent={100} width={80} /></Col>
          <Col className="days"> <h2>Days since last workout</h2> </Col>
        </Row>
        </div>
        <div className="progress">
          <Row>
            <Col span={8}>
                <img className="icon" src="/assets/pulse.svg" />
            </Col>
            <Col >
              <h2 className="cardio">Cardio Fitness</h2>
              <p> Your current score: 50 </p>
            </Col>
          </Row>
        </div>
        <br />
          <Card className="program" title="Currently on: Session 1, Period 2" extra={<a href="#">See Program</a>} >
            <Timeline className="timeline">
              <Timeline.Item color="green"><h3>Repetition 1</h3></Timeline.Item>
              <Timeline.Item color="green"><h3>Repetition 2</h3></Timeline.Item>
              <Timeline.Item color="gray"><h3>Repetition 3</h3></Timeline.Item>
              <Timeline.Item color="gray"><h3>Repetition 4</h3></Timeline.Item>
              <Timeline.Item color="gray"><h3>Repetition 5</h3></Timeline.Item>
            </Timeline>
            <Button className="rep_button"  block>
              Start Repetition 3
            </Button>
          </Card>



      </div>
    );
  }
}

export default Dashboard;
