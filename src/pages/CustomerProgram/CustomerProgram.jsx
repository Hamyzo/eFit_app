import React from "react";
import { Collapse, Table, Row, Col } from "antd";
import "./CustomerProgram.css";

class CustomerProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  callback = key => {
    console.log(key);
  };

  render() {
    const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
   `;

    const { Panel } = Collapse;

    const columns = [
      {
        title: "Exercise",
        dataIndex: "exercise"
      },
      {
        title: "Weight (kg)",
        dataIndex: "weight"
      },
      {
        title: "Sets X Repetitions",
        dataIndex: "setsXrepetitions"
      }
    ];
    const data = [
      {
        key: "1",
        exercise: "Push ups",
        weight: "N/A",
        setsXrepetitions: "3 x 12"
      },
      {
        key: "2",
        exercise: "Squats",
        weight: 42,
        setsXrepetitions: "3 x 12"
      },
      {
        key: "3",
        exercise: "Deadlift",
        weight: 30,
        setsXrepetitions: "4x6"
      }
    ];

    return (
      <div>
        <h1 className="title">Program Title</h1>
        <p className="description">
          The secret to doing anything is believing that you can do it. Anything
          that you believe you can do strong enough, you can do. Anything. As
          long as you believe. We can fix anything. You are only limited by your
          imagination. That's the way I look when I get home late; black and
          blue. Every highlight needs it's own personal shadow.
        </p>
        <Collapse onChange={this.callback}>
          <Panel
            header={
              <div className="periodDiv">
                <Row>
                  <Col span={6}>
                    <p className="period2">
                      <strong>Session 1</strong>
                    </p>
                  </Col>
                  <Col span={6}>
                    <p className="period2">Status: In Progress</p>
                  </Col>
                  <Col span={6}>
                    <p className="period2">Start Date: </p>
                  </Col>
                  <Col span={6}>
                    <p className="period2">End Date: </p>
                  </Col>
                </Row>
              </div>
            }
            key="1"
          >
            <Collapse defaultActiveKey="1">
              <Panel
                header={
                  <div className="periodDiv">
                    <Row>
                      <Col span={6}>
                        <p className="period2">
                          <strong>Period 1</strong>
                        </p>
                      </Col>
                      <Col span={6}>
                        <p className="period2">Completed: 2 out of 6 </p>
                      </Col>
                      <Col span={6}>
                        <p className="period2">Start Date: </p>
                      </Col>
                      <Col span={6}>
                        <p className="period2">End Date: </p>
                      </Col>
                    </Row>
                  </div>
                }
                key="1"
              >
                <Table
                  bordered={false}
                  pagination={false}
                  columns={columns}
                  dataSource={data}
                  size="middle"
                />
              </Panel>
              <Panel header="Period 2" key="2">
                <p>{text}</p>
              </Panel>
            </Collapse>
          </Panel>
          <Panel header="Session 2" key="2">
            <p>{text}</p>
          </Panel>
          <Panel header="Session 3" key="3">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default CustomerProgram;
