import React from "react";
import {
  Collapse,
  Table,
  Row,
  Col,
  Button,
  Icon,
  Popover,
  Spin,
  Modal,
  Input,
  Form,
  Select
} from "antd";
import "./CoachProgram.css";

class NewSessionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSession: {
        periods: [{}]
      },
      index: this.props.sessions.length
    };
  }

  handleChangeSession = (name, value) => {
    this.setState({
      newSession: {
        ...this.state.newSession,
        [name]: value
      }
    });
  };

  handleChangeSessionProgram = (index, name, value) => {
    console.log(index);
    const { periods } = this.state.newSession;
    periods[index] = {
      ...this.state.newSession.periods[index],
      name: value
    };
    this.setState({
      newSession: {
        ...this.state.newSession,
        periods
      }
    });
  };

  addPeriod = () => {
    let { periods } = this.state.newSession;
    if (periods) {
      periods.push({});
    } else {
      periods = [{}];
    }
    console.log(periods);
    this.setState({
      newSession: {
        ...this.state.newSession,
        periods
      }
    });
  };

  deletePeriod = i => {
    const { periods } = this.state.newSession;
    periods.splice(i, 1);

    console.log(i, periods);
    this.setState({
      newSession: {
        ...this.state.newSession,
        periods
      }
    });
  };

  render() {
    const { displayAddSession, form, sessions } = this.props;
    const { newSession, index } = this.state;
    return (
      <div>
        <Modal
          visible={displayAddSession}
          onOk={() => this.props.onSubmitNewSession(newSession)}
          onCancel={this.props.onCancel}
          title="Add a new session"
          footer={[
            <Button key="back" onClick={this.props.onCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => this.props.onSubmitNewSession(newSession)}
            >
              Add session
            </Button>
          ]}
        >
          <Form>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Name">
                  {form.getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter the session name"
                      }
                    ]
                  })(
                    <Input
                      name="name"
                      onChange={e =>
                        this.handleChangeSession(e.target.name, e.target.value)
                      }
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Position">
                  {form.getFieldDecorator("position", {
                    rules: [
                      {
                        required: true,
                        message:
                          "Please choose a position in which to insert the session"
                      }
                    ]
                  })(
                    <Select
                      name="position"
                      onChange={value => this.setState({ index: value })}
                    >
                      {sessions.map((session, i) => (
                        <Select.Option value={i}>{i + 1}</Select.Option>
                      ))}
                      <Select.Option value={sessions.length}>
                        last
                      </Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              {newSession.periods
                ? newSession.periods.map((period, i) => (
                    <div>
                      <Col span={10}>
                        <Form.Item label="Number of days" key={i}>
                          {form.getFieldDecorator("nb_days" + i, {
                            rules: [
                              {
                                required: true,
                                message: "This field is required"
                              }
                            ]
                          })(
                            <Input
                              name={"nb_days" + i}
                              onChange={e =>
                                this.handleChangeSessionProgram(
                                  i,
                                  "nb_days",
                                  e.target.value
                                )
                              }
                            />
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item label="Number of repetitions" key={i}>
                          {form.getFieldDecorator("nb_repetitions" + i, {
                            rules: [
                              {
                                required: true,
                                message: "This field is required"
                              }
                            ]
                          })(
                            <Input
                              name={"nb_repetitions" + i}
                              onChange={e =>
                                this.handleChangeSessionProgram(
                                  i,
                                  "nb_repetitions",
                                  e.target.value
                                )
                              }
                            />
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Row type="flex" align="middle">
                          <Button
                            shape="circle"
                            icon="delete"
                            type="danger"
                            ghost
                            onClick={() => this.deletePeriod(i)}
                          />
                        </Row>
                      </Col>
                    </div>
                  ))
                : null}
              <Button icon="plus" onClick={this.addPeriod}>
                Add period
              </Button>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(NewSessionModal);
